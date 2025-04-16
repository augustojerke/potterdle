"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { History } from "@prisma/client";

interface HistoryListProps {
  history: History[];
}

export function HistoryList(props: HistoryListProps) {
  if (!props.history || props.history.length === 0) {
    return <h1>No Histories Registred...</h1>;
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>Points</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.history.map((history) => {
            const isPositive = history.points >= 0;

            return (
              <TableRow
                key={history.id}
                className={isPositive ? "bg-green-100" : "bg-red-100"}
              >
                <TableCell className="flex gap-1 font-semibold">
                  {isPositive ? (
                    <span className="text-green-600">+{history.points}</span>
                  ) : (
                    <span className="text-red-600">{history.points}</span>
                  )}
                </TableCell>
                <TableCell className="text-black">
                  {history.description}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
