/*
  Warnings:

  - You are about to drop the column `Currency` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "Currency",
ADD COLUMN     "currency" "Currency";
