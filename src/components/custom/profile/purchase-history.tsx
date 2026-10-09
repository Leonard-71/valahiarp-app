"use client";

import { History, Package } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PurchaseHistoryProps {
  user: any;
}

export function PurchaseHistory({ user: _user }: PurchaseHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <History className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Istoric achiziții</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Achizițiile tale
          </CardTitle>
          <CardDescription>
            Vezi toate abonamentele și serviciile pe care le-ai achiziționat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <Package className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-medium">Nu ai achiziții încă</h3>
            <p className="text-muted-foreground text-sm">
              Când vei face prima achiziție, aceasta va apărea aici.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
