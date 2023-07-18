/*
  Warnings:

  - You are about to drop the column `masterPostId` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `parentPostId` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `masterGoalId` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "masterPostId",
DROP COLUMN "parentPostId",
ADD COLUMN     "masterGoalId" TEXT NOT NULL,
ADD COLUMN     "parentGoalId" TEXT;
