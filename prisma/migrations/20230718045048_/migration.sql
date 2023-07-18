/*
  Warnings:

  - You are about to drop the column `masterGoalId` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `masterGoal` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "masterGoalId",
ADD COLUMN     "masterGoal" BOOLEAN NOT NULL;
