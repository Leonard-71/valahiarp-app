"use server";

import { loadHtmlTemplate } from "@/lib/loadHtmlTemplate";
import { sendEmail } from "@/service/email";
import { getAdminEmails } from "@/service/user";
import {
  NotifyAdminInput,
  Reason,
  ResponseDto,
  SendPackageEmailInput,
  SendPackageExpirationInput,
  SendWelcomeInput,
  TemplateFields,
  TemplateFieldType,
} from "@/types";

const notificationWelcome = async ({
  name,
  to,
}: SendWelcomeInput): Promise<ResponseDto<{ messageId: string }>> => {
  const templateFields: TemplateFields = {
    name: { type: TemplateFieldType.REPLACE, value: name },
  };

  const html = loadHtmlTemplate("welcome.html", templateFields);

  const result = await sendEmail({
    to,
    subject: "Bun venit!",
    html,
  });

  if (result.error) {
    return {
      data: null,
      error: {
        message: result.error.message,
        reason: result.error.reason || Reason.EMAIL_SEND_ERROR,
      },
    };
  }

  return {
    data: { messageId: result.data?.messageId || "" },
    error: null,
  };
};

const notificationPackageConfirmation = async ({
  name,
  to,
  packageName,
}: SendPackageEmailInput): Promise<ResponseDto<{ messageId: string }>> => {
  const templateFields: TemplateFields = {
    name: { type: TemplateFieldType.REPLACE, value: name },
    packageName: { type: TemplateFieldType.REPLACE, value: packageName },
  };

  const html = loadHtmlTemplate(
    "purchase-confirmation-email.html",
    templateFields,
  );

  const result = await sendEmail({
    to,
    subject: `Mulțumim pentru achiziție, ${name}!`,
    html,
  });

  if (result.error) {
    return {
      data: null,
      error: {
        message: result.error.message,
        reason: result.error.reason || Reason.EMAIL_SEND_ERROR,
      },
    };
  }

  return {
    data: { messageId: result.data?.messageId || "" },
    error: null,
  };
};

const notificationAdminPurchase = async ({
  name,
  packageName,
}: NotifyAdminInput): Promise<ResponseDto<{ messageId: string }>> => {
  const { data: emails, error } = await getAdminEmails();

  if (error || !emails || emails.length === 0) {
    return {
      data: null,
      error: {
        message: "Niciun administrator nu a fost găsit.",
        reason: Reason.EMAIL_SEND_ERROR,
      },
    };
  }

  const templateFields: TemplateFields = {
    name: { type: TemplateFieldType.REPLACE, value: name },
    packageName: { type: TemplateFieldType.REPLACE, value: packageName },
  };

  const html = loadHtmlTemplate(
    "admin-package-notification.html",
    templateFields,
  );

  const result = await sendEmail({
    to: emails,
    subject: `Achiziție nouă: ${name} - ${packageName}`,
    html,
  });

  if (result.error) {
    return {
      data: null,
      error: {
        message: result.error.message,
        reason: result.error.reason || Reason.EMAIL_SEND_ERROR,
      },
    };
  }

  return {
    data: { messageId: result.data?.messageId || "" },
    error: null,
  };
};

const notificationPackageExpirationUser = async ({
  name,
  to,
  packageNames,
}: SendPackageExpirationInput): Promise<ResponseDto<{ messageId: string }>> => {
  const packageCount = packageNames.length;
  const isMultiple = packageCount > 1;

  const templateFields: TemplateFields = {
    name: { type: TemplateFieldType.REPLACE, value: name },
    packageCount: { type: TemplateFieldType.REPLACE, value: packageCount },
    isMultiple: { type: TemplateFieldType.CONDITION, value: isMultiple },
    packageNames: {
      type: TemplateFieldType.LIST,
      value: packageNames,
    },
  };

  if (!isMultiple) {
    templateFields.packageName = {
      type: TemplateFieldType.REPLACE,
      value: packageNames[0],
    };
  }

  const subject = isMultiple
    ? `Reminder: ${packageCount} pachete expiră în curând`
    : `Reminder: Pachetul "${packageNames[0]}" expiră în curând`;

  const html = loadHtmlTemplate(
    "package-expiration-user-reminder.html",
    templateFields,
  );

  const result = await sendEmail({ to, subject, html });

  if (result.error) {
    return {
      data: null,
      error: { message: result.error.message, reason: Reason.EMAIL_SEND_ERROR },
    };
  }
  return { data: { messageId: result.data?.messageId || "" }, error: null };
};

export {
  notificationWelcome,
  notificationPackageConfirmation,
  notificationAdminPurchase,
  notificationPackageExpirationUser,
};
