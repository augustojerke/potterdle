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
            return (
              <TableRow key={history.id}>
                <TableCell className="flex gap-1">{history.points}</TableCell>
                <TableCell>{history.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
