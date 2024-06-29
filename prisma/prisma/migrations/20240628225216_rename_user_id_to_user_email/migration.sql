/*
  Warnings:

  - You are about to drop the column `userId` on the `Watchlist` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

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
    "userEmail" TEXT NOT NULL
);
INSERT INTO "new_Watchlist" ("id", "movieId", "movieName", "moviePosterImage", "movieReleaseDate") SELECT "id", "movieId", "movieName", "moviePosterImage", "movieReleaseDate" FROM "Watchlist";
DROP TABLE "Watchlist";
ALTER TABLE "new_Watchlist" RENAME TO "Watchlist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
