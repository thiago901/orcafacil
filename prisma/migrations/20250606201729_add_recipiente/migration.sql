/*
  Warnings:

  - Added the required column `recipient_id` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "recipient_id" TEXT NOT NULL;
