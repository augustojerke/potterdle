/*
  Warnings:

  - You are about to drop the column `game_3_character_id` on the `Game` table. All the data in the column will be lost.
  - Added the required column `game_3_spell_id` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_1_character_id" TEXT NOT NULL,
    "game_2_character_id" TEXT NOT NULL,
    "game_3_spell_id" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("game_1_character_id", "game_2_character_id", "id", "userId") SELECT "game_1_character_id", "game_2_character_id", "id", "userId" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
