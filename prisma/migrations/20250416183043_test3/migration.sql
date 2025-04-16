/*
  Warnings:

  - Made the column `name` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ratting` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `owner_id` on table `company` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_owner_id_fkey";

-- AlterTable
ALTER TABLE "company" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "ratting" SET NOT NULL,
ALTER COLUMN "ratting" SET DEFAULT 0,
ALTER COLUMN "owner_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
