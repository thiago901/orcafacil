/*
  Warnings:

  - Added the required column `name` to the `proposals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "proposals" ADD COLUMN     "name" TEXT NOT NULL;
