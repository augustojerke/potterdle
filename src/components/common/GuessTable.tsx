import { motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const MotionTableRow = motion(TableRow as any); // força compatibilidade
const MotionTableCell = motion(TableCell as any);

export function GuessTable({
  guesses,
  randomCharacter,
  attributes,
  formatValue,
}: any) {
  return (
    <div className="mt-10 overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="text-center w-32">Character</TableHead>
            {attributes.map(({ label }: any) => (
              <TableHead key={label} className="text-center w-32">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {guesses.map((guess: any, index: number) => {
            const isCorrectGuess = attributes.every(
              ({ key }: any) =>
                guess[key as keyof Character] ===
                randomCharacter?.[key as keyof Character]
            );

            const isFirstRow = index === 0;

            const rowKey = guess.id || guess.timestamp || index;

            const TableRowComponent = isFirstRow ? MotionTableRow : TableRow;
            const TableCellComponent = isFirstRow ? MotionTableCell : TableCell;

            return (
              <TableRowComponent
                key={rowKey}
                {...(isFirstRow
                  ? {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.8 },
                    }
                  : {})}
                className={
                  isCorrectGuess ? "border-4 border-yellow-400 rounded-xl" : ""
                }
              >
                <TableCellComponent
                  className="text-center"
                  {...(isFirstRow
                    ? {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: { delay: 0.4 },
                      }
                    : {})}
                >
                  <img
                    src={guess.image}
                    alt={guess.name}
                    className="w-20 h-20 rounded-full mx-auto border shadow"
                  />
                </TableCellComponent>
                {attributes.map(({ key }: any, i: number) => {
                  const isCorrect =
                    guess[key as keyof Character] ===
                    randomCharacter?.[key as keyof Character];

                  return (
                    <TableCellComponent
                      key={key}
                      className={`text-center font-medium ${
                        isCorrect
                          ? "bg-green-200 text-green-700"
                          : "bg-red-300 text-red-700"
                      }`}
                      {...(isFirstRow
                        ? {
                            initial: { opacity: 0, y: 10 },
                            animate: { opacity: 1, y: 0 },
                            transition: { delay: 0.1 + i * 0.2 },
                          }
                        : {})}
                    >
                      {formatValue(guess[key as keyof Character])}
                    </TableCellComponent>
                  );
                })}
              </TableRowComponent>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
