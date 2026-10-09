"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableWrapper } from "@/components/custom/table";
import { findAllHouses } from "@/controller/house";
import { SingleHouseResponseDto } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { houseFilterSpec } from "@/lib/filters/specs/house-filter-spec";

interface HousesTableProps {
    onEdit: (house: SingleHouseResponseDto) => void;
    onArchive: (house: SingleHouseResponseDto) => void;
    onRecover: (house: SingleHouseResponseDto) => void;
    refreshTrigger: number;
}

export function HousesTable({
    onEdit,
    onArchive,
    onRecover,
    refreshTrigger,
}: HousesTableProps) {
    const columns: ColumnDef<SingleHouseResponseDto>[] = [
        {
            accessorKey: "name",
            header: () => <div className="text-center font-semibold">Nume</div>,
            cell: ({ row }) => (
                <div className="font-medium text-center">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "inventory",
            header: () => <div className="text-center font-semibold">Inventar</div>,
            cell: ({ row }) => (
                <div className="text-center">{row.getValue("inventory")}</div>
            ),
        },
        {
            accessorKey: "taxPrice",
            header: () => <div className="text-center font-semibold">Impozit</div>,
            cell: ({ row }) => (
                <div className="text-center font-medium">
                    {row.getValue("taxPrice")} %
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: () => <div className="text-center font-semibold">Preț</div>,
            cell: ({ row }) => (
                <div className="text-center font-medium">
                    {row.getValue("price")} $
                </div>
            ),
        },
        {
            accessorKey: "sortOrder",
            header: () => <div className="text-center font-semibold">Ordinea</div>,
            cell: ({ row }) => (
                <div className="text-center">
                    {row.getValue("sortOrder")}
                </div>
            ),
        },
        {
            accessorKey: "isOccupied",
            header: () => <div className="text-center font-semibold">Status</div>,
            cell: ({ row }) => {
                const isOccupied = row.getValue("isOccupied") as boolean;
                return (
                    <div className="flex justify-center">
                        <Badge
                            variant={isOccupied ? "destructive" : "default"}
                            className={isOccupied ? "hover:bg-red-600" : "bg-green-500 hover:bg-green-600 text-white"}
                        >
                            {isOccupied ? "Ocupată" : "Liberă"}
                        </Badge>
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center font-semibold">Acțiuni</div>,
            cell: ({ row }) => {
                const house = row.original;
                const isArchived = house.isArchived;

                return (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(house)}
                        >
                            Editează
                        </Button>
                        {isArchived ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onRecover(house)}
                            >
                                Recuperează
                            </Button>
                        ) : (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onArchive(house)}
                            >
                                Arhivează
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <TableWrapper
            columns={columns}
            getData={findAllHouses}
            filterSpec={houseFilterSpec}
            refreshTrigger={refreshTrigger}
        />
    );
}
