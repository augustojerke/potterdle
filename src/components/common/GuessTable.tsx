"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface GuessTableProps {
  guesses: Character[];
  randomCharacter: Character | null;
  attributes: { label: string; key: string }[];
  formatValue: (value: any) => string;
}

export function GuessTable({
  guesses,
  randomCharacter,
  attributes,
  formatValue,
}: GuessTableProps) {
  return (
    <div className="mt-10 overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="text-center w-32">Character</TableHead>
            {attributes.map(({ label }) => (
              <TableHead key={label} className="text-center w-32">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {guesses.map((guess, index) => {
            const isCorrectGuess = attributes.every(
              ({ key }) =>
                guess[key as keyof Character] ===
                randomCharacter?.[key as keyof Character]
            );
            return (
              <TableRow
                key={index}
                className={
                  isCorrectGuess ? "border-4 border-yellow-400 rounded-xl" : ""
                }
              >
                <TableCell className="text-center">
                  <img
                    src={guess.image}
                    alt={guess.name}
                    className="w-20 h-20 rounded-full mx-auto border shadow"
                  />
                </TableCell>
                {attributes.map(({ key }) => {
                  const isCorrect =
                    guess[key as keyof Character] ===
                    randomCharacter?.[key as keyof Character];
                  return (
                    <TableCell
                      key={key}
                      className={`text-center font-medium ${
                        isCorrect
                          ? "bg-green-200 text-green-700"
                          : "bg-red-300 text-red-700"
                      }`}
                    >
                      {formatValue(guess[key as keyof Character])}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
