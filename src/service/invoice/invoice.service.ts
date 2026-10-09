import prisma from "@/lib/prisma";
import { revalidateCodePaths, revalidateOrderPaths } from "@/lib/revalidate";
import { CreateInvoiceInput, SingleInvoiceResponseDto } from "@/types";
import { Reason, ResponseDto } from "@/types/utils";

const create = async (
  data: CreateInvoiceInput,
): Promise<ResponseDto<SingleInvoiceResponseDto>> => {
  try {
    const { order, codeId, ...fields } = data;

    const invoice = await prisma.$transaction(async (tx) => {
      const createdInvoice = await tx.invoice.create({
        data: {
          ...fields,
          order: {
            create: order,
          },
        },
      });

      if (codeId) {
        await tx.code.update({
          where: { id: codeId },
          data: {
            isArchived: true,
            archivedAt: new Date(),
            archivedById: order.userId,
          },
        });
        revalidateCodePaths();
      }

      return createdInvoice;
    });
    revalidateOrderPaths();

    return {
      data: invoice,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Database error",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

export { create };
