/*
  Warnings:

  - Added the required column `movieName` to the `Watchlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moviePosterImage` to the `Watchlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieReleaseDate` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Watchlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "movieName" TEXT NOT NULL,
    "movieReleaseDate" TEXT NOT NULL,
    "moviePosterImage" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_Watchlist" ("id", "movieId", "userId") SELECT "id", "movieId", "userId" FROM "Watchlist";
DROP TABLE "Watchlist";
ALTER TABLE "new_Watchlist" RENAME TO "Watchlist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
