"use client";

import { FC, ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type ActionItem = {
  label: string;
  action: () => void;
  icon?: ReactNode;
  disabled?: boolean;
};

interface ActionsMenuProps {
  className?: string;
  actions: ActionItem[];
}

export const ActionsMenu: FC<ActionsMenuProps> = ({ actions, className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("relative h-8 w-8 p-0", className)}
        >
          <span className="sr-only">Deschide meniul</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2" side="bottom">
        {actions.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.action}
            disabled={item.disabled}
          >
            {item.icon && (
              <span className="mr-2 h-4 w-4 text-inherit">{item.icon}</span>
            )}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
