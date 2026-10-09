import { NextResponse } from "next/server";

import { notificationPackageExpirationUser } from "@/controller/email/email.controller";
import {
  findExpiring,
  markExpirationEmailSent,
} from "@/service/order/order.service";
import { SingleOrderResponseDto } from "@/types";

export async function GET() {
  const { data, error } = await findExpiring();

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  if (data.length === 0) {
    return new NextResponse("No expiring orders to notify.");
  }

  const usersMap = new Map<string, SingleOrderResponseDto[]>();

  for (const order of data) {
    if (!usersMap.has(order.userId)) {
      usersMap.set(order.userId, []);
    }

    usersMap.get(order.userId)!.push(order);
  }

  const notifications = Array.from(usersMap.values()).map(
    async (userOrders) => {
      const emailResult = await notificationPackageExpirationUser({
        name: userOrders[0].user.name ?? "",
        to: userOrders[0].user.email,
        packageNames: userOrders.map((o) => o.subscription.name),
      });

      if (emailResult.error) {
        throw new Error(
          `Failed to send email to ${userOrders[0].user.email}: ${emailResult.error.message}`,
        );
      }

      return userOrders.map((o) => o.id);
    },
  );

  const results = await Promise.allSettled(notifications);
  const successfullyNotifiedOrderIds: number[] = [];

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      successfullyNotifiedOrderIds.push(...result.value);
    } else if (result.status === "rejected") {
      console.error("A notification promise was rejected:", result.reason);
    }
  });

  if (successfullyNotifiedOrderIds.length > 0) {
    const { error } = await markExpirationEmailSent(
      successfullyNotifiedOrderIds,
    );

    if (error) {
      throw new Error(`Failed to mark orders as notified: ${error.message}`);
    }
  }

  return new NextResponse("Notifications sent successfully.");
}
