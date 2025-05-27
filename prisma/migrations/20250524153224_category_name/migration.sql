/*
  Warnings:

  - Made the column `category_name` on table `company_services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "company_services" ALTER COLUMN "category_name" SET NOT NULL;
