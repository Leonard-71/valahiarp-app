"use client";

// --- Specific field configurations ---
import type {
  GenericSelectDataDto,
  PaginatedResponseDto,
  RequestInput,
  ResponseDto,
} from "@/types";

import {
  forwardRef,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  DefaultValues,
  FormProvider,
  Resolver,
  useForm,
  useFormContext,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  any,
  array,
  boolean,
  coerce,
  custom,
  date,
  number,
  object,
  string,
  union,
  ZodTypeAny,
} from "zod";

import { ColorPicker, Input } from "@/components/custom/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { LEAFLET_DEFAULT_CENTER } from "@/constants/subscription/leaflet";
import { cn } from "@/lib/utils";

import { AsyncMultiSelect } from "../async-multi-select";
import { AsyncSelect } from "../async-select";
import { DateTimePicker } from "../date-time-picker";
import { FileInput } from "../file-input";
import { LeafletInput } from "../leaflet-input";
import { MultiSelect } from "../multiselect/multiselect";
import { RichTextEditor } from "../rich-text-editor";
import { Select } from "../select";

// --- Type definitions ---
type SelectOption = { value: string | number; label: string };

type AsyncSelectValue = { value: string | number; label: string } | null;
type AsyncMultiSelectValue = { value: string | number; label: string }[] | null;
type FileValue = File | null;
type LeafletValue = { xCoordinate: number; yCoordinate: number };

export type Dependency = {
  name: string;
  validator?: ZodTypeAny;
};

export enum FieldType {
  Text = "text",
  Email = "email",
  Password = "password",
  Number = "number",
  Textarea = "textarea",
  Select = "select",
  Checkbox = "checkbox",
  AsyncSelect = "async-select",
  DatePicker = "datepicker",
  MultiSelect = "multiselect",
  AsyncMultiSelect = "async-multiselect",
  File = "file",
  RichTextEditor = "rich-text-editor",
  ColorPicker = "color-picker",
  Leaflet = "leaflet",
}

type BaseFieldConfig = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string | React.ReactNode;
  validation?: ZodTypeAny;
  dependsOn?: Dependency[];
  receivesPropsFrom?: Array<{
    name: string;
    getProps: (value: any) => Record<string, any>;
  }>;
};

type TextFieldConfig = BaseFieldConfig & {
  type: FieldType.Text | FieldType.Email | FieldType.Password;
  defaultValue?: string;
};

type NumberFieldConfig = BaseFieldConfig & {
  type: FieldType.Number;
  defaultValue?: number;
};

type TextareaFieldConfig = BaseFieldConfig & {
  type: FieldType.Textarea;
  defaultValue?: string;
};

type SelectFieldConfig = BaseFieldConfig & {
  type: FieldType.Select;
  options: SelectOption[];
  defaultValue?: string | number;
};

type CheckboxFieldConfig = BaseFieldConfig & {
  type: FieldType.Checkbox;
  defaultValue?: boolean;
};

type AsyncSelectFieldConfig = BaseFieldConfig & {
  type: FieldType.AsyncSelect;
  getData: (
    input: RequestInput,
  ) => Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>>;
  defaultValue?: AsyncSelectValue;
  minQueryLength?: number;
  debounceTimeout?: number;
};

type AsyncMultiSelectFieldConfig = BaseFieldConfig & {
  type: FieldType.AsyncMultiSelect;
  getData: (
    input: RequestInput,
  ) => Promise<ResponseDto<PaginatedResponseDto<GenericSelectDataDto>>>;
  defaultValue?: AsyncMultiSelectValue;
  minQueryLength?: number;
  debounceTimeout?: number;
};

type DatePickerFieldConfig = BaseFieldConfig & {
  type: FieldType.DatePicker;
  defaultValue?: Date | null;
};

type MultiSelectFieldConfig = BaseFieldConfig & {
  type: FieldType.MultiSelect;
  options: SelectOption[];
  defaultValue?: (string | number)[];
};

type FileFieldConfig = BaseFieldConfig & {
  type: FieldType.File;
  defaultValue?: FileValue | FileValue[];
  accept?: string;
  multiple?: boolean;
};

type RichTextEditorFieldConfig = BaseFieldConfig & {
  type: FieldType.RichTextEditor;
  defaultValue?: string;
};

type ColorPickerFieldConfig = BaseFieldConfig & {
  type: FieldType.ColorPicker;
  defaultValue?: string;
};

type LeafletFieldConfig = BaseFieldConfig & {
  type: FieldType.Leaflet;
  defaultValue?: LeafletValue;
};

// --- Union type for all field configurations ---
export type FormFieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | AsyncSelectFieldConfig
  | DatePickerFieldConfig
  | MultiSelectFieldConfig
  | AsyncMultiSelectFieldConfig
  | FileFieldConfig
  | RichTextEditorFieldConfig
  | ColorPickerFieldConfig
  | LeafletFieldConfig;

type InferFormData<T extends readonly FormFieldConfig[]> = {
  [K in T[number]["name"]]: T[number] extends { name: K; type: infer U }
  ? U extends
  | FieldType.Text
  | FieldType.Email
  | FieldType.Password
  | FieldType.Textarea
  | FieldType.RichTextEditor
  ? string
  : U extends FieldType.Number
  ? number
  : U extends FieldType.Select
  ? string | number
  : U extends FieldType.Checkbox
  ? boolean
  : U extends FieldType.AsyncSelect
  ? AsyncSelectValue
  : U extends FieldType.DatePicker
  ? Date | null
  : U extends FieldType.MultiSelect
  ? (string | number)[]
  : U extends FieldType.AsyncMultiSelect
  ? AsyncMultiSelectValue
  : U extends FieldType.File
  ? FileValue | FileValue[]
  : U extends FieldType.ColorPicker
  ? string
  : never
  : never;
};

// --- Schema creation function ---
export const createZodSchema = <T extends readonly FormFieldConfig[]>(
  config: T,
) => {
  const shape: { [key: string]: ZodTypeAny } = {};

  config.forEach((field) => {
    let fieldSchema = field.validation;
    if (!fieldSchema) {
      switch (field.type) {
        case FieldType.Text:
        case FieldType.Textarea:
        case FieldType.RichTextEditor:
          fieldSchema = string();
          break;
        case FieldType.Email:
          fieldSchema = string().email(`Format de email invalid.`);
          break;
        case FieldType.Password:
          fieldSchema = string().min(
            8,
            `Trebuie să conțină cel puțin 8 caractere.`,
          );
          break;
        case FieldType.Number:
          fieldSchema = coerce.number({
            invalid_type_error: "Valoarea trebuie să fie un număr valid",
          });
          break;
        case FieldType.Select:
          fieldSchema = union([string(), number()], {
            errorMap: () => ({ message: "Selectați o opțiune validă" }),
          });
          break;
        case FieldType.Checkbox:
          fieldSchema = boolean({
            errorMap: () => ({ message: "Selectați o opțiune" }),
          });
          break;
        case FieldType.AsyncSelect:
          fieldSchema = object(
            {
              value: union([string(), number()]),
              label: string(),
            },
            { required_error: "Selectați o opțiune" },
          );
          break;
        case FieldType.DatePicker:
          fieldSchema = date({ required_error: "Data este obligatorie" });
          break;
        case FieldType.MultiSelect:
          fieldSchema = array(union([string(), number()]), {
            required_error: "Selectați cel puțin o opțiune",
          });
          break;
        case FieldType.AsyncMultiSelect:
          fieldSchema = array(
            object({
              value: union([string(), number()]),
              label: string(),
            }),
            { required_error: "Selectați cel puțin o opțiune" },
          );
          break;
        case FieldType.File:
          if (field.multiple) {
            fieldSchema = array(
              custom<File>((file) => file instanceof File),
              {
                invalid_type_error: "Selectați cel puțin un fișier",
                required_error: "Selectați cel puțin un fișier",
              },
            ).refine((files) => {
              if (!files) return false;
              return (
                files.reduce((acc, file) => acc + file.size, 0) <=
                10 * 1024 * 1024
              );
            }, "Dimensiunea totală a fișierelor nu trebuie să depășească 10MB.");
          } else {
            fieldSchema = custom<File | null>((file) => {
              if (file === null || file === undefined) return false;
              return file instanceof File && file.size <= 10 * 1024 * 1024; // 10MB
            }, "Selectați un fișier valid");
          }
          break;
        case FieldType.Leaflet:
          fieldSchema = object({
            xCoordinate: number({
              invalid_type_error: "Coordonata X trebuie să fie un număr valid",
            }),
            yCoordinate: number({
              invalid_type_error: "Coordonata Y trebuie să fie un număr valid",
            }),
          });
          break;
        default:
          fieldSchema = any({ invalid_type_error: "Valoarea nu este validă" });
      }
    }

    if (field.dependsOn) {
      fieldSchema = fieldSchema.optional().nullable();
    }

    shape[field.name] = fieldSchema;
  });

  const baseSchema = object(shape);

  return baseSchema.superRefine((data, ctx) => {
    config.forEach((field) => {
      let isDependencyConditionMet = true;

      if (field.dependsOn && field.dependsOn.length > 0) {
        isDependencyConditionMet = field.dependsOn.every((dep) => {
          const dependencyValue = data[dep.name];
          if (dep.validator) {
            return dep.validator.safeParse(dependencyValue).success;
          }
          return (
            dependencyValue !== undefined &&
            dependencyValue !== null &&
            dependencyValue !== ""
          );
        });
      }

      // Skip validation entirely for fields whose dependencies are not met
      if (!isDependencyConditionMet) {
        return;
      }

      const fieldValue = data[field.name];
      const fieldSchema = shape[field.name];
      const result = fieldSchema.safeParse(fieldValue);

      if ((fieldValue === undefined || fieldValue === "") && field.dependsOn) {
        ctx.addIssue({
          code: "custom",
          path: [field.name],
          message: `${field.label || field.name} este obligatoriu.`,
        });
      } else if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({ ...issue, path: [field.name] });
        });
      }
    });
  });
};

const DynamicField = <T extends readonly FormFieldConfig[]>({
  fieldConfig,
  showLabels,
  showErrorMessages,
}: {
  fieldConfig: T[number];
  showLabels: boolean;
  showErrorMessages: boolean;
}) => {
  const {
    control,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext<InferFormData<T>>();

  const isInvalid = !!errors[fieldConfig.name as keyof InferFormData<T>];

  const visibleDependencyNames = useMemo(
    () => fieldConfig.dependsOn?.map((dep) => dep.name) || [],
    [fieldConfig.dependsOn],
  );

  const propsDependencyConfigs = useMemo(
    () => fieldConfig.receivesPropsFrom || [],
    [fieldConfig.receivesPropsFrom],
  );

  const allDependencyNames = useMemo(
    () => [
      ...new Set([
        ...visibleDependencyNames,
        ...propsDependencyConfigs.map((d) => d.name),
      ]),
    ],
    [visibleDependencyNames, propsDependencyConfigs],
  );

  const allDependencyValues = watch(allDependencyNames as any) as any[];

  const areDependenciesMet = useMemo(() => {
    if (!fieldConfig.dependsOn || visibleDependencyNames.length === 0) {
      return true;
    }

    return fieldConfig.dependsOn.every((dep) => {
      const depIndex = allDependencyNames.indexOf(dep.name);
      const value = allDependencyValues?.[depIndex];
      if (dep.validator) {
        return dep.validator.safeParse(value).success;
      }
      return value !== undefined && value !== null && value !== "";
    });
  }, [
    fieldConfig.dependsOn,
    visibleDependencyNames,
    allDependencyNames,
    allDependencyValues,
  ]);

  const dynamicProps = useMemo(() => {
    if (propsDependencyConfigs.length === 0) {
      return {};
    }

    return propsDependencyConfigs.reduce((acc, conf) => {
      const depIndex = allDependencyNames.indexOf(conf.name);
      const value = allDependencyValues?.[depIndex];
      return { ...acc, ...conf.getProps(value) };
    }, {});
  }, [propsDependencyConfigs, allDependencyNames, allDependencyValues]);

  useEffect(() => {
    if (!areDependenciesMet) {
      resetField(fieldConfig.name as any);
    }
  }, [areDependenciesMet, fieldConfig.name, resetField]);

  if (!areDependenciesMet) {
    return null;
  }

  return (
    <FormField
      control={control}
      name={fieldConfig.name as any}
      render={({ field }) => {
        return (
          <FormItem className="w-full">
            {showLabels && fieldConfig.type !== FieldType.Checkbox && (
              <FormLabel>{fieldConfig.label}</FormLabel>
            )}

            <FormControl>
              {(() => {
                switch (fieldConfig.type) {
                  case FieldType.Text:
                  case FieldType.Email:
                  case FieldType.Password:
                  case FieldType.Number:
                    return (
                      <Input
                        type={fieldConfig.type}
                        value={
                          (field.value !== undefined && field.value !== null
                            ? (field.value as string | number)
                            : "") as string | number
                        }
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder={fieldConfig.placeholder}
                        name={field.name}
                        ref={field.ref}
                      />
                    );

                  case FieldType.Textarea:
                    return (
                      <Textarea
                        value={(field.value as string) ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder={fieldConfig.placeholder}
                        name={field.name}
                        ref={field.ref}
                      />
                    );

                  case FieldType.Checkbox:
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          isInvalid={isInvalid}
                          checked={Boolean(field.value)}
                          onCheckedChange={field.onChange}
                          id={field.name}
                        />
                        <FormLabel htmlFor={field.name}>
                          {fieldConfig.label || ""}
                        </FormLabel>
                      </div>
                    );

                  case FieldType.Select:
                    return (
                      <Select
                        isInvalid={isInvalid}
                        options={fieldConfig.options}
                        value={field.value as string | number}
                        onChange={field.onChange}
                        placeholder={fieldConfig.placeholder}
                      />
                    );

                  case FieldType.AsyncSelect:
                    return (
                      <AsyncSelect
                        isInvalid={isInvalid}
                        instanceId={fieldConfig.name}
                        value={field.value as AsyncSelectValue}
                        onValueChange={field.onChange}
                        getData={fieldConfig.getData}
                        placeholder={fieldConfig.placeholder}
                        isClearable
                        minQueryLength={fieldConfig.minQueryLength}
                        debounceTimeout={fieldConfig.debounceTimeout}
                        {...dynamicProps}
                      />
                    );

                  case FieldType.DatePicker:
                    return (
                      <DateTimePicker
                        isInvalid={isInvalid}
                        key={field.name}
                        value={field.value as Date | null}
                        onChange={field.onChange}
                        placeholder={fieldConfig.placeholder}
                      />
                    );

                  case FieldType.MultiSelect:
                    return (
                      <MultiSelect
                        isInvalid={isInvalid}
                        options={fieldConfig.options}
                        value={
                          field.value as (string | number)[] &
                          (string | number | readonly string[] | undefined)
                        }
                        onChange={field.onChange}
                        placeholder={fieldConfig.placeholder}
                      />
                    );

                  case FieldType.AsyncMultiSelect:
                    return (
                      <AsyncMultiSelect
                        isInvalid={isInvalid}
                        instanceId={fieldConfig.name}
                        value={field.value as AsyncMultiSelectValue}
                        onValueChange={field.onChange}
                        getData={fieldConfig.getData}
                        placeholder={fieldConfig.placeholder}
                        isClearable
                        minQueryLength={fieldConfig.minQueryLength}
                        debounceTimeout={fieldConfig.debounceTimeout}
                      />
                    );

                  case FieldType.File:
                    return (
                      <FileInput
                        isInvalid={isInvalid}
                        accept={fieldConfig.accept}
                        multiple={fieldConfig.multiple}
                        value={field.value as File | File[] | undefined}
                        onChange={(files) => field.onChange(files)}
                      />
                    );

                  case FieldType.RichTextEditor:
                    return (
                      <RichTextEditor
                        value={field.value as string}
                        onChange={field.onChange}
                        isInvalid={isInvalid}
                        className="md:max-w-lg"
                      />
                    );

                  case FieldType.ColorPicker:
                    return (
                      <ColorPicker
                        value={field.value as string}
                        onChange={field.onChange}
                        name={field.name}
                        disabled={field.disabled}
                      />
                    );

                  case FieldType.Leaflet:
                    return (
                      <LeafletInput
                        value={field.value as LeafletValue}
                        onChange={field.onChange}
                        {...dynamicProps}
                      />
                    );

                  default:
                    return null;
                }
              })()}
            </FormControl>
            {fieldConfig.description && (
              <FormDescription className="w-0 min-w-full">
                {fieldConfig.description}
              </FormDescription>
            )}
            {showErrorMessages && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
};

interface FormBuilderProps<T extends readonly FormFieldConfig[]> {
  config: T;
  schema: ReturnType<typeof createZodSchema<T>>;
  onSubmit?: (data: InferFormData<T>) => void | Promise<void>;
  formTitle?: string;
  className?: string;
  submitButton?: (props: { isSubmitting: boolean }) => ReactNode;
  showErrorMessages?: boolean;
  showLabels?: boolean;
}

const FormBuilderComponent = <T extends readonly FormFieldConfig[]>(
  {
    config,
    schema,
    onSubmit,
    formTitle,
    className,
    submitButton,
    showErrorMessages = true,
    showLabels = true,
  }: FormBuilderProps<T>,
  ref: Ref<{ submit: () => Promise<InferFormData<T>> }>,
) => {
  type FormDataType = InferFormData<T>;
  const defaultValues = ((): Partial<FormDataType> => {
    const result: Record<string, unknown> = {};
    config.forEach((field) => {
      let value: unknown = field.defaultValue;

      if (value === undefined) {
        if (field.dependsOn) {
          value = undefined;
        } else {
          switch (field.type) {
            case FieldType.Number:
              value = undefined;
              break;
            case FieldType.Checkbox:
              value = false;
              break;
            case FieldType.AsyncSelect:
            case FieldType.DatePicker:
            case FieldType.AsyncMultiSelect:
            case FieldType.File:
              value = null;
              break;
            case FieldType.MultiSelect:
              value = [];
              break;
            case FieldType.Leaflet:
              value = LEAFLET_DEFAULT_CENTER;
              break;
            default:
              value = "";
          }
        }
      }

      result[field.name] = value;
    });

    return result as Partial<FormDataType>;
  })();

  const methods = useForm<FormDataType>({
    resolver: zodResolver(schema) as unknown as Resolver<FormDataType>,
    defaultValues: defaultValues as DefaultValues<FormDataType>,
    mode: "onChange",
  });

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isValid = await methods.trigger();
      if (isValid) {
        return methods.getValues();
      }
      throw new Error("Form validation failed");
    },
    reset: () => {
      methods.reset();
    },
  }));

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit ?? (() => { }))}
          className={cn(
            "bg-card text-card-foreground space-y-6 rounded-lg p-6 shadow-lg",
            className,
          )}
        >
          {formTitle && <h2 className="text-2xl font-bold">{formTitle}</h2>}
          {config.map((field) => {
            return (
              <DynamicField<T>
                key={field.name}
                fieldConfig={field}
                showLabels={showLabels}
                showErrorMessages={showErrorMessages}
              />
            );
          })}
          {submitButton && submitButton({ isSubmitting })}
        </form>
      </Form>
    </FormProvider>
  );
};

export const FormBuilder = forwardRef(FormBuilderComponent);
