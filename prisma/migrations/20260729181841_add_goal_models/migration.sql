-- CreateEnum
CREATE TYPE "GoalHistoryType" AS ENUM ('DEPOSIT', 'WITHDRAWAL');

-- CreateTable
CREATE TABLE "goals" (
    "id" UUID NOT NULL,
    "financeProfileId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "targetAmount" DECIMAL(14,2) NOT NULL,
    "savedAmount" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "targetDate" TIMESTAMP(3),
    "notes" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal_history" (
    "id" UUID NOT NULL,
    "goalId" UUID NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "type" "GoalHistoryType" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "goal_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "goals_financeProfileId_idx" ON "goals"("financeProfileId");

-- CreateIndex
CREATE INDEX "goals_displayOrder_idx" ON "goals"("displayOrder");

-- CreateIndex
CREATE INDEX "goal_history_goalId_idx" ON "goal_history"("goalId");

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_financeProfileId_fkey" FOREIGN KEY ("financeProfileId") REFERENCES "finance_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_history" ADD CONSTRAINT "goal_history_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
