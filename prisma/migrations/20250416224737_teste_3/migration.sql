/*
  Warnings:

  - Made the column `footage` on table `estimate_request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `estimate_request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `estimate_request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `estimate_request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `estimate_request` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "estimate_request" ALTER COLUMN "footage" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
