-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "subgoals" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "completed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Preferences" ALTER COLUMN "theme" SET DEFAULT 'Dark',
ALTER COLUMN "emailNotifications" SET DEFAULT false;
