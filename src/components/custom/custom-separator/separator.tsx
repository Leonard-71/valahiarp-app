export function Separator({ type = "line" }) {
  if (type === "line") {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="bg-foreground h-0.5 w-full max-w-md"></div>
      </div>
    );
  }

  if (type === "star") {
    return (
      <div className="flex w-full items-center justify-center gap-4">
        <div className="bg-foreground h-0.5 flex-1"></div>
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </div>
        <div className="bg-foreground h-0.5 flex-1"></div>
      </div>
    );
  }

  return null;
}
