/*
  Warnings:

  - A unique constraint covering the columns `[financeProfileId,type,name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "categories_financeProfileId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "categories_financeProfileId_type_name_key" ON "categories"("financeProfileId", "type", "name");
