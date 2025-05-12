/*
  Warnings:

  - Added the required column `created_at` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `estimate_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `post_files` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `created_at` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "estimate_request" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "estimate_request_files" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "post_files" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);
