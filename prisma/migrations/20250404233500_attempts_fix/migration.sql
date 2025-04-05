/*
  Warnings:

  - You are about to drop the column `attempts` on the `UserGame` table. All the data in the column will be lost.
  - Added the required column `attempts` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_1_character_id" TEXT NOT NULL,
    "game_2_character_id" TEXT NOT NULL,
    "game_3_spell_id" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("game_1_character_id", "game_2_character_id", "game_3_spell_id", "id", "userId") SELECT "game_1_character_id", "game_2_character_id", "game_3_spell_id", "id", "userId" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_UserGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    CONSTRAINT "UserGame_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserGame" ("game_id", "id", "user_id") SELECT "game_id", "id", "user_id" FROM "UserGame";
DROP TABLE "UserGame";
ALTER TABLE "new_UserGame" RENAME TO "UserGame";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
