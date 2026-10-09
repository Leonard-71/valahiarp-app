import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <h1 className="text-3xl font-bold text-white [text-shadow:2px_3px_6px_rgba(0,0,0,0.5)]">{title}</h1>
      {description && (
        <p className="mt-2 text-white/90 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">{description}</p>
      )}
    </div>
  );
}
