/*
  Warnings:

  - Added the required column `active` to the `user_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_tokens" ADD COLUMN     "active" BOOLEAN NOT NULL;
