-- CreateEnum
CREATE TYPE "AccentColor" AS ENUM ('PURPLE', 'BLUE', 'EMERALD', 'ORANGE', 'RED', 'SLATE');

-- AlterTable
ALTER TABLE "settings" ADD COLUMN     "accentColor" "AccentColor" NOT NULL DEFAULT 'PURPLE';
