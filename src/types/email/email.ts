type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
};

type SendEmailResponse = {
  messageId?: string;
};

type SendWelcomeInput = {
  name: string;
  to: string;
};

type SendPackageEmailInput = SendWelcomeInput & {
  packageName: string;
};

type NotifyAdminInput = {
  name: string;
  packageName: string;
};

type SendPackageExpirationInput = SendWelcomeInput & {
  packageNames: string[];
};

enum TemplateFieldType {
  REPLACE = "REPLACE",
  CONDITION = "CONDITION",
  LIST = "LIST",
}

type TemplateFieldReplace = {
  type: TemplateFieldType.REPLACE;
  value: string | number;
};

type TemplateFieldCondition = {
  type: TemplateFieldType.CONDITION;
  value: boolean;
};

type TemplateFieldList = {
  type: TemplateFieldType.LIST;
  value: string[] | number[];
};

type TemplateField =
  | TemplateFieldReplace
  | TemplateFieldCondition
  | TemplateFieldList;

type TemplateFields = Record<string, TemplateField>;

export { TemplateFieldType };

export type {
  SendEmailInput,
  SendEmailResponse,
  SendWelcomeInput,
  SendPackageEmailInput,
  NotifyAdminInput,
  SendPackageExpirationInput,
  TemplateFields,
};
