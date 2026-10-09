import type {
  CreateDocumentInput,
  SingleDocumentResponseDto,
  SingleUrlResponseDto,
} from "@/types";

import { Session } from "next-auth";

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  SIGNED_URL_EXPIRATION_TIME,
  SIGNED_URL_EXPIRATION_TIME_FOR_DOWNLOAD,
} from "@/constants";
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { revalidateDocumentPaths } from "@/lib/revalidate";
import { DocumentRelations, Reason, ResponseDto } from "@/types";

const {
  AWS_BUCKET_REGION,
  AWS_PUBLIC_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
} = process.env;

if (
  !AWS_BUCKET_REGION ||
  !AWS_PUBLIC_ACCESS_KEY ||
  !AWS_SECRET_ACCESS_KEY ||
  !AWS_BUCKET_NAME
) {
  throw new Error("Missing AWS S3 credentials in environment variables");
}

const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const create = async (
  session: Session,
  input: CreateDocumentInput,
): Promise<ResponseDto<SingleDocumentResponseDto>> => {
  try {
    const { folder, fileName, fileType, fileSize, checkSum, relations } = input;

    const key = `${AWS_BUCKET_NAME}/${folder}/${crypto.randomUUID()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
      ContentLength: fileSize,
      ChecksumSHA256: checkSum,
      Metadata: {
        createdById: session.user.id!,
      },
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: SIGNED_URL_EXPIRATION_TIME,
    });

    const data: Prisma.DocumentCreateInput = {
      key,
      name: fileName,
      mimeType: fileType,
      size: fileSize,
      createdBy: {
        connect: { id: session.user.id! },
      },
    };

    if (relations) {
      const relationsConnection = relations.reduce(
        (acc, relation) => {
          acc[relation.entityType] = {
            connect: relation.ids.map((id) => ({ id })),
          };

          return acc;
        },
        {} as Record<DocumentRelations, { connect: { id: unknown }[] }>,
      );

      Object.assign(data, relationsConnection);
    }

    const document = await prisma.document.create({
      data,
    });

    revalidateDocumentPaths();
    return {
      data: {
        document,
        signedUrl,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "Could not generate signed url",
        reason: Reason.BUCKET_ERROR,
      },
    };
  }
};

const createSignedUrl = async (
  key: string,
): Promise<ResponseDto<SingleUrlResponseDto>> => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: SIGNED_URL_EXPIRATION_TIME_FOR_DOWNLOAD,
    });

    return {
      data: { signedUrl },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: {
        message: "Could not generate download url",
        reason: Reason.BUCKET_ERROR,
      },
    };
  }
};

const remove = async (key: string): Promise<ResponseDto<null>> => {
  const deleteCommand = new DeleteObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    await s3Client.send(deleteCommand);

    await prisma.document.delete({
      where: { key },
    });

    revalidateDocumentPaths();

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : "Could not delete document",
        reason: Reason.DATABASE_ERROR,
      },
    };
  }
};

export { createSignedUrl, create, remove };
