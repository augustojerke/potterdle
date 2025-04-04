-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challenger_user_id" TEXT NOT NULL,
    "challenged_user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "winner_user_id" TEXT,
    CONSTRAINT "Challenge_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Challenge_challenger_user_id_fkey" FOREIGN KEY ("challenger_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Challenge_challenged_user_id_fkey" FOREIGN KEY ("challenged_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_1_character_id" TEXT NOT NULL,
    "game_2_character_id" TEXT NOT NULL,
    "game_3_character_id" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL,
    CONSTRAINT "UserGame_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
