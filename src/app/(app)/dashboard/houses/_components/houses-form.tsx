"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createHouse, updateHouse } from "@/controller/house";
import { SingleHouseResponseDto, CreateHouseInput, UpdateHouseInput } from "@/types";
import { toast } from "sonner";
import { housesFormSchema, getHousesFormDefaults } from "../_utils/houses-form.config";

interface HousesFormProps {
    house?: SingleHouseResponseDto | null;
    onSuccess: () => void;
    onCancel?: () => void;
}

type FormData = z.infer<typeof housesFormSchema>;

export function HousesForm({ house, onSuccess, onCancel }: HousesFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(housesFormSchema),
        defaultValues: getHousesFormDefaults(house),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const result = house
                ? await updateHouse(house.id, data as UpdateHouseInput)
                : await createHouse(data as CreateHouseInput);

            if (result.error) {
                toast.error(result.error.message);
                return;
            }

            toast.success(
                house
                    ? "Casa a fost actualizată cu succes!"
                    : "Casa a fost creată cu succes!"
            );
            onSuccess();
        } catch {
            toast.error("A apărut o eroare. Te rugăm să încerci din nou.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nume</FormLabel>
                            <FormControl>
                                <Input placeholder="Introdu numele casei" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="inventory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Inventar</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Introdu inventarul"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="taxPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preț Impozit (%)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Introdu prețul impozitului"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preț ($)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Introdu prețul casei"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sortOrder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ordinea de Sortare</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Introdu ordinea de sortare"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isOccupied"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Ocupată</FormLabel>
                                <div className="text-sm text-muted-foreground">
                                    Marchează dacă casa este ocupată
                                </div>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-2">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Anulează
                        </Button>
                    )}
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting
                            ? "Se salvează..."
                            : house
                                ? "Actualizează Casa"
                                : "Creează Casa"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
