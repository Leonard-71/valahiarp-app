import { Session } from "next-auth";

import { ADDRESS_BLOCKED_UNTIL, MAX_ADDRESS_ATTEMPTS } from "@/constants";
import { UserRole } from "@/generated/prisma";
import { findById, update } from "@/service/user/user.service";
import { GooglePrediction } from "@/types";
import {
  GenericSelectDataDto,
  PaginatedResponseDto,
  Reason,
  ResponseDto,
} from "@/types/utils";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_PLACES_URL = process.env.GOOGLE_PLACES_URL;

export const selectAddresses = async (
  session: Session,
  query: string,
): Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>> => {
  if (!GOOGLE_API_KEY || !GOOGLE_PLACES_URL) {
    return {
      data: null,
      error: {
        message: "Missing Google API config",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }

  const user = await findById(session.user.id!);

  if (user.error) {
    return user;
  }

  if (user.data.role !== UserRole.ADMIN && user.data.addressBlockedUntil) {
    const tooManyRequests =
      new Date().getTime() < user.data.addressBlockedUntil.getTime();

    if (tooManyRequests) {
      return {
        data: null,
        error: {
          message: "Too many requests",
          reason: Reason.TOO_MANY_REQUESTS_ERROR,
        },
      };
    }
  }

  const url = `${GOOGLE_PLACES_URL}/autocomplete/json?input=${encodeURIComponent(
    query,
  )}&key=${GOOGLE_API_KEY}&components=country:ro`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!["OK", "ZERO_RESULTS"].includes(data.status)) {
      return {
        data: null,
        error: {
          message: "Google Places API Error",
          reason: Reason.EXTERNAL_API_ERROR,
        },
      };
    }

    const predictions: GooglePrediction[] = data.predictions || [];

    if (user.data.role !== UserRole.ADMIN) {
      const updatedAttempts = user.data.addressAttempts + 1;

      const updatedUser = await update(session.user.id!, {
        addressAttempts:
          updatedAttempts >= MAX_ADDRESS_ATTEMPTS ? 0 : updatedAttempts,
        addressBlockedUntil:
          updatedAttempts >= MAX_ADDRESS_ATTEMPTS
            ? new Date(Date.now() + ADDRESS_BLOCKED_UNTIL)
            : null,
      });

      if (updatedUser.error) {
        return updatedUser;
      }
    }

    const result = {
      data: {
        content: predictions.map((prediction) => ({
          label: prediction.description,
          value: prediction.place_id,
        })),
        totalCount: predictions.length,
        pageCount: 1,
        hasMore: false,
      },
      error: null,
    };

    return result;
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : "Google Places API Error",
        reason: Reason.EXTERNAL_API_ERROR,
      },
    };
  }
};
