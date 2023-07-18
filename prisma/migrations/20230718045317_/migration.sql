-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "masterGoalId" TEXT,
ALTER COLUMN "masterGoal" DROP NOT NULL,
ALTER COLUMN "masterGoal" SET DEFAULT false;
