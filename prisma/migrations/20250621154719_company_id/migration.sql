/*
  Warnings:

  - Added the required column `company_id` to the `estimates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estimates" ADD COLUMN     "company_id" TEXT NOT NULL;
