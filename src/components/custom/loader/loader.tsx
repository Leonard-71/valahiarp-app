import { cn } from "@/lib/utils";

export const Loader = ({
  className,
  isSmall,
}: {
  className?: string;
  isSmall?: boolean;
}) => {
  return (
    <div
      className={cn(
        {
          "bg-panelBg text-panelText flex h-28 items-center justify-center rounded-lg":
            !isSmall,
        },
        className,
      )}
    >
      {isSmall ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
      ) : (
        <div className="flex items-center space-x-2 text-current">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-current" />
          <span>Se încarcă...</span>
        </div>
      )}
    </div>
  );
};
