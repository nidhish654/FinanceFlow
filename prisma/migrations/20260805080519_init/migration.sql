-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CASH', 'BANK', 'CREDIT_CARD', 'DIGITAL_WALLET', 'SAVINGS', 'INVESTMENT');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('NEED', 'WANT', 'SAVINGS');

-- CreateEnum
CREATE TYPE "BudgetPeriod" AS ENUM ('WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('INR', 'JPY', 'USD', 'EUR', 'GBP');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK', 'SYSTEM');

-- CreateEnum
CREATE TYPE "AccentColor" AS ENUM ('DEFAULT', 'PURPLE', 'BLUE', 'EMERALD', 'ORANGE', 'RED', 'SLATE');

-- CreateEnum
CREATE TYPE "WeekStart" AS ENUM ('SUNDAY', 'MONDAY');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH');

-- CreateEnum
CREATE TYPE "DateFormat" AS ENUM ('DD_MM_YYYY', 'MM_DD_YYYY', 'YYYY_MM_DD');

-- CreateEnum
CREATE TYPE "TimeFormat" AS ENUM ('H12', 'H24');

-- CreateEnum
CREATE TYPE "NumberFormat" AS ENUM ('INDIAN', 'WESTERN', 'EUROPEAN');

-- CreateEnum
CREATE TYPE "NegativeNumberFormat" AS ENUM ('MINUS', 'PARENTHESES');

-- CreateEnum
CREATE TYPE "Month" AS ENUM ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER');

-- CreateEnum
CREATE TYPE "SalaryFrequency" AS ENUM ('WEEKLY', 'BIWEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "BudgetStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "FinanceProfileStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "GoalHistoryType" AS ENUM ('DEPOSIT', 'WITHDRAWAL');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activeFinanceProfileId" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance_profiles" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "baseCurrency" "Currency" NOT NULL,
    "status" "FinanceProfileStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finance_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" UUID NOT NULL,
    "financeProfileId" UUID NOT NULL,
    "theme" "Theme" NOT NULL DEFAULT 'SYSTEM',
    "weekStart" "WeekStart" NOT NULL DEFAULT 'MONDAY',
    "language" "Language" NOT NULL DEFAULT 'ENGLISH',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "dateFormat" "DateFormat" NOT NULL DEFAULT 'DD_MM_YYYY',
    "timeFormat" "TimeFormat" NOT NULL DEFAULT 'H24',
    "numberFormat" "NumberFormat" NOT NULL DEFAULT 'INDIAN',
    "defaultAccountId" UUID,
    "defaultExpenseCategoryId" UUID,
    "defaultIncomeCategoryId" UUID,
    "defaultTransactionType" "TransactionType",
    "monthStart" INTEGER NOT NULL DEFAULT 1,
    "fiscalYear" "Month" NOT NULL DEFAULT 'JANUARY',
    "showDecimals" BOOLEAN NOT NULL DEFAULT true,
    "negativeNumberFormat" "NegativeNumberFormat" NOT NULL DEFAULT 'MINUS',
    "accentColor" "AccentColor" NOT NULL DEFAULT 'DEFAULT',
    "compactMode" BOOLEAN NOT NULL DEFAULT false,
    "reduceMotion" BOOLEAN NOT NULL DEFAULT false,
    "animationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "avatarStyle" TEXT NOT NULL DEFAULT 'adventurerNeutral',
    "avatarSeed" TEXT NOT NULL DEFAULT 'alex',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL,
    "financeProfileId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "AccountType" NOT NULL,
    "currency" "Currency",
    "openingBalance" DECIMAL(12,2) NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "color" TEXT,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "financeProfileId" UUID NOT NULL,
    "parentCategoryId" UUID,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "type" "CategoryType" NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" UUID NOT NULL,
    "financeProfileId" UUID NOT NULL,
    "categoryId" UUID,
    "amount" DECIMAL(12,2) NOT NULL,
    "period" "BudgetPeriod" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "BudgetStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL,
    "financeProfileId" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "transferAccountId" UUID,
    "categoryId" UUID,
    "type" "TransactionType" NOT NULL,
    "priority" "Priority",
    "amount" DECIMAL(12,2) NOT NULL,
    "description" TEXT,
    "merchant" TEXT,
    "notes" TEXT,
    "referenceNumber" TEXT,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salary_plans" (
    "id" UUID NOT NULL,
    "financeProfileId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "frequency" "SalaryFrequency" NOT NULL,
    "grossSalary" DECIMAL(12,2) NOT NULL,
    "expectedTax" DECIMAL(12,2) NOT NULL,
    "expectedInsurance" DECIMAL(12,2) NOT NULL,
    "expectedHousing" DECIMAL(12,2) NOT NULL,
    "expectedUtilities" DECIMAL(12,2) NOT NULL,
    "expectedFood" DECIMAL(12,2) NOT NULL,
    "expectedTransportation" DECIMAL(12,2) NOT NULL,
    "expectedSavings" DECIMAL(12,2) NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "effectiveTo" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "salary_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" UUID NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_activeFinanceProfileId_idx" ON "users"("activeFinanceProfileId");

-- CreateIndex
CREATE INDEX "finance_profiles_userId_idx" ON "finance_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "finance_profiles_userId_name_key" ON "finance_profiles"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "settings_financeProfileId_key" ON "settings"("financeProfileId");

-- CreateIndex
CREATE INDEX "accounts_financeProfileId_idx" ON "accounts"("financeProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_financeProfileId_name_key" ON "accounts"("financeProfileId", "name");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "categories_financeProfileId_idx" ON "categories"("financeProfileId");

-- CreateIndex
CREATE INDEX "categories_parentCategoryId_idx" ON "categories"("parentCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_financeProfileId_type_name_key" ON "categories"("financeProfileId", "type", "name");

-- CreateIndex
CREATE INDEX "budgets_financeProfileId_idx" ON "budgets"("financeProfileId");

-- CreateIndex
CREATE INDEX "budgets_categoryId_idx" ON "budgets"("categoryId");

-- CreateIndex
CREATE INDEX "budgets_financeProfileId_categoryId_idx" ON "budgets"("financeProfileId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_financeProfileId_categoryId_startDate_endDate_key" ON "budgets"("financeProfileId", "categoryId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "transactions_financeProfileId_idx" ON "transactions"("financeProfileId");

-- CreateIndex
CREATE INDEX "transactions_accountId_idx" ON "transactions"("accountId");

-- CreateIndex
CREATE INDEX "transactions_categoryId_idx" ON "transactions"("categoryId");

-- CreateIndex
CREATE INDEX "transactions_transactionDate_idx" ON "transactions"("transactionDate");

-- CreateIndex
CREATE INDEX "transactions_financeProfileId_transactionDate_idx" ON "transactions"("financeProfileId", "transactionDate");

-- CreateIndex
CREATE INDEX "salary_plans_financeProfileId_idx" ON "salary_plans"("financeProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "goals_financeProfileId_idx" ON "goals"("financeProfileId");

-- CreateIndex
CREATE INDEX "goals_displayOrder_idx" ON "goals"("displayOrder");

-- CreateIndex
CREATE INDEX "goal_history_goalId_idx" ON "goal_history"("goalId");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "password_reset_tokens_userId_idx" ON "password_reset_tokens"("userId");

-- CreateIndex
CREATE INDEX "password_reset_tokens_token_idx" ON "password_reset_tokens"("token");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_activeFinanceProfileId_fkey" FOREIGN KEY ("activeFinanceProfileId") REFERENCES "finance_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance_profiles" ADD CONSTRAINT "finance_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_financeProfileId_fkey" FOREIGN KEY ("financeProfileId") REFERENCES "finance_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_financeProfileId_fkey" FOREIGN KEY ("financeProfileId") REFERENCES "finance_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_financeProfileId_fkey" FOREIGN KEY ("financeProfileId") REFERENCES "finance_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_financeProfileId_fkey" FOREIGN KEY ("financeProfileId") REFERENCES "finance_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_financeProfileId_fkey" FOREIGN KEY ("financeProfileId") REFERENCES "finance_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_transferAccountId_fkey" FOREIGN KEY ("transferAccountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salary_plans" ADD CONSTRAINT "salary_plans_financeProfileId_fkey" FOREIGN KEY ("financeProfileId") REFERENCES "finance_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_financeProfileId_fkey" FOREIGN KEY ("financeProfileId") REFERENCES "finance_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal_history" ADD CONSTRAINT "goal_history_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
