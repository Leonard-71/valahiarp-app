import { ClearIndicatorProps, GroupBase } from "react-select";

import { OptionType } from "../model";
import { CustomClearIcon } from "./custom-clear-icon";

export const ClearIndicator = <T extends OptionType>(
  props: ClearIndicatorProps<T, false, GroupBase<T>>,
) => {
  const {
    children = <CustomClearIcon />,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref} className="cursor-pointer">
      <div>{children}</div>
    </div>
  );
};
