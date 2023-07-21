/*
  Warnings:

  - You are about to drop the column `masterGoal` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `masterGoalId` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `subgoals` on the `Goal` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Goal_subgoals_createdAt_idx";

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "masterGoal",
DROP COLUMN "masterGoalId",
DROP COLUMN "subgoals";
