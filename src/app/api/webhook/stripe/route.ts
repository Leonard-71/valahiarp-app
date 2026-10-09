import { NextRequest, NextResponse } from "next/server";

import { DAY_IN_MS } from "@/constants";
import { InvoiceStatus } from "@/generated/prisma";
import { sendDiscordNotification } from "@/lib/discord-webhook";
import { getStripe } from "@/lib/stripe";
import { create } from "@/service/invoice";
import { findById as findSubscriptionById } from "@/service/subscription";
import { findById as findUserById } from "@/service/user";

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();

    const event = stripe.webhooks.constructEvent(
      await request.text(),
      request.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );

    switch (event.type) {
      case "checkout.session.completed":
        const {
          payment_intent,
          metadata,
          amount_total,
          customer,
          currency,
          invoice,
        } = event.data.object;

        const {
          userId,
          subscriptionId,
          codeId,
          productsTotal,
          productsCurrency,
          startsAt,
        } = metadata || {};

        if (
          payment_intent === null ||
          amount_total === null ||
          customer === null ||
          currency === null ||
          invoice === null ||
          productsTotal === null ||
          productsCurrency === null
        ) {
          //THIS IF SHOULD NEVER BE REACHED. DEBUG IF IT DOES!

          return new NextResponse(
            "No appropriate payment data has been received when trying to create the invoice and user subscription",
            { status: 500 },
          );
        }

        const retrievedInvoice = await stripe.invoices.retrieve(
          invoice as string,
        );

        if (
          !retrievedInvoice.hosted_invoice_url ||
          !retrievedInvoice.invoice_pdf
        ) {
          //THIS IF SHOULD NEVER BE REACHED. DEBUG IF IT DOES!

          return new NextResponse("Invoice details PDF or URL not available.", {
            status: 500,
          });
        }

        const issuedAt = new Date(retrievedInvoice.created * 1000);
        const expiresAt = startsAt
          ? new Date(new Date(JSON.parse(startsAt)).getTime() + 30 * DAY_IN_MS)
          : undefined;

        const result = await create({
          stripePaymentIntentId: payment_intent as string,
          stripeInvoiceId: invoice as string,
          total: amount_total / 100,
          currency: retrievedInvoice.currency,
          issuedAt,
          status: InvoiceStatus.PAID,
          productsTotal: Number(productsTotal),
          productsCurrency,
          order: {
            userId,
            subscriptionId: Number(subscriptionId),
            expiresAt,
          },
          codeId: codeId ? Number(codeId) : undefined,
        });

        if (result.error) {
          //THIS IF SHOULD NEVER BE REACHED. DEBUG IF IT DOES!

          return new NextResponse(result.error.message, {
            status: 500,
          });
        }

        // Trimite notificare Discord
        try {
          const [userResult, subscriptionResult] = await Promise.all([
            findUserById(userId),
            findSubscriptionById(Number(subscriptionId)),
          ]);

          if (
            !userResult.error &&
            !subscriptionResult.error &&
            userResult.data &&
            subscriptionResult.data
          ) {
            await sendDiscordNotification({
              customerName: userResult.data.name || "Nume nedisponibil",
              customerEmail: userResult.data.email,
              customerUsername: userResult.data.username || undefined,
              subscriptionName: subscriptionResult.data.name,
              price: subscriptionResult.data.price,
              invoiceUrl: retrievedInvoice.hosted_invoice_url,
              date: new Date(
                retrievedInvoice.created * 1000,
              ).toLocaleDateString("ro-RO", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
          }
        } catch (discordError) {
          console.error("Discord notification failed:", discordError);
        }

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }

    return new NextResponse();
  } catch (error) {
    //THIS CATCH SHOULD NEVER BE REACHED. DEBUG IF IT DOES!

    return new NextResponse(
      error instanceof Error
        ? error.message
        : "Something wrong happened when trying to create the user subscriptions! You should never reach this error, but if you did, this situation requires debugging!",
      {
        status: 500,
      },
    );
  }
}
