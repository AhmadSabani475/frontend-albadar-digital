import type { ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

interface PropTypes {
    columns: string[];
    isLoading?: boolean;
    skeletonRows?: number;
    isEmpty?: boolean;
    emptyText?: string;
    children: ReactNode;
    minWidth?: string;
}

const SimpleTable = ({
    columns,
    isLoading = false,
    skeletonRows = 4,
    isEmpty = false,
    emptyText = "Belum ada data",
    children,
    minWidth = "500px"
}: PropTypes) => {
    return (
        <Card className="w-full overflow-hidden border border-border">
            <CardContent className="p-0 overflow-x-auto">
                <Table className={`w-full text-sm`} style={{ minWidth }}>
                    <TableHeader className="bg-muted/50 border-b border-border">
                        <TableRow className="hover:bg-transparent border-b border-border">
                            {columns.map((col, idx) => (
                                <TableHead
                                    key={idx}
                                    className={`px-6 py-4 font-semibold text-foreground ${idx === columns.length - 1 ? 'text-right' : 'text-left'
                                        }`}
                                >
                                    {col}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: skeletonRows }).map((_, i) => (
                                <TableRow key={i} className="border-b border-border">
                                    {columns.map((_, colIdx) => (
                                        <TableCell
                                            key={colIdx}
                                            className={`px-6 py-3.5 ${colIdx === columns.length - 1 ? 'text-right' : ''}`}
                                        >
                                            <Skeleton
                                                className={`h-5 ${colIdx === 0 ? 'w-24' :
                                                        colIdx === columns.length - 1 ? 'w-16 ml-auto' : 'w-20'
                                                    }`}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : isEmpty ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                                    {emptyText}
                                </TableCell>
                            </TableRow>
                        ) : (
                            children
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default SimpleTable;
