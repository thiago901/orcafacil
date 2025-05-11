/*
  Warnings:

  - Added the required column `address_city` to the `estimate_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_neighborhood` to the `estimate_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_number` to the `estimate_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_postal_code` to the `estimate_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_state` to the `estimate_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_street` to the `estimate_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estimate_request" ADD COLUMN     "address_city" TEXT NOT NULL,
ADD COLUMN     "address_neighborhood" TEXT NOT NULL,
ADD COLUMN     "address_number" TEXT NOT NULL,
ADD COLUMN     "address_postal_code" TEXT NOT NULL,
ADD COLUMN     "address_state" TEXT NOT NULL,
ADD COLUMN     "address_street" TEXT NOT NULL;
