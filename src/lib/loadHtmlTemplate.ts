import fs from "fs";
import path from "path";

import { TemplateFields, TemplateFieldType } from "@/types";

export function loadHtmlTemplate(
  fileName: string,
  fields: TemplateFields,
): string {
  const filePath = path.join(
    process.cwd(),
    "src",
    "service",
    "email",
    "templates",
    fileName,
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Template file not found: ${fileName}`);
  }

  let html = fs.readFileSync(filePath, "utf-8");

  html = html.replace(
    /{{#if\s*(\w+)}}(.*?){{\/if}}/gs,
    (match, key, content) => {
      const field = fields[key];
      return field && field.type === TemplateFieldType.CONDITION && field.value
        ? content
        : "";
    },
  );

  html = html.replace(
    /{{#unless\s*(\w+)}}(.*?)({{\/unless}})/gs,
    (match, key, content) => {
      const field = fields[key];
      return field && field.type === TemplateFieldType.CONDITION && !field.value
        ? content
        : "";
    },
  );

  html = html.replace(
    /{{#each\s*(\w+)}}(.*?)({{\/each}})/gs,
    (match, key, content) => {
      const field = fields[key];
      if (field && field.type === TemplateFieldType.LIST) {
        return field.value
          .map((item) => content.replace(/{{this}}/g, item.toString()))
          .join("");
      }
      return "";
    },
  );

  html = html.replace(/{{([\w\d._-]+)}}/g, (match, key) => {
    const field = fields[key];
    if (field && field.type === TemplateFieldType.REPLACE) {
      return field.value.toString();
    }
    return match;
  });

  return html;
}
