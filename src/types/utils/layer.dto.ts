import { ReactElement, ReactNode } from "react";

type ParamsDto = Promise<{ [key: string]: string | string[] | undefined }>;

type PageComponentDto = {
  params: ParamsDto;
  searchParams: ParamsDto;
};

type LayoutComponentDto = {
  children: ReactNode;
  params: ParamsDto;
};

type ServerComponentDto<T = {}> = (
  props: T,
) => Promise<ReactElement> | ReactElement;

export type {
  ParamsDto,
  PageComponentDto,
  LayoutComponentDto,
  ServerComponentDto,
};
