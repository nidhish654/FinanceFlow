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

-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "animationsEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "compactMode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateFormat" "DateFormat" NOT NULL DEFAULT 'DD_MM_YYYY',
ADD COLUMN     "defaultAccountId" UUID,
ADD COLUMN     "defaultExpenseCategoryId" UUID,
ADD COLUMN     "defaultIncomeCategoryId" UUID,
ADD COLUMN     "defaultTransactionType" "TransactionType",
ADD COLUMN     "fiscalYear" "Month" NOT NULL DEFAULT 'JANUARY',
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'ENGLISH',
ADD COLUMN     "monthStart" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "negativeNumberFormat" "NegativeNumberFormat" NOT NULL DEFAULT 'MINUS',
ADD COLUMN     "numberFormat" "NumberFormat" NOT NULL DEFAULT 'INDIAN',
ADD COLUMN     "reduceMotion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showDecimals" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "timeFormat" "TimeFormat" NOT NULL DEFAULT 'H24',
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';
