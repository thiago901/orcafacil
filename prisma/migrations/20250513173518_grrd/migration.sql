/*
  Warnings:

  - Made the column `name` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `company_id` to the `post_files` table without a default value. This is not possible if the table is not empty.
  - Made the column `post_id` on table `post_files` required. This step will fail if there are existing NULL values in that column.
  - Made the column `files_id` on table `post_files` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `company_id` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `tags` required. This step will fail if there are existing NULL values in that column.
  - Made the column `post_id` on table `tags` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "post_files" DROP CONSTRAINT "post_files_files_id_fkey";

-- DropForeignKey
ALTER TABLE "post_files" DROP CONSTRAINT "post_files_post_id_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_post_id_fkey";

-- AlterTable
ALTER TABLE "files" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "post_files" ADD COLUMN     "company_id" TEXT NOT NULL,
ALTER COLUMN "post_id" SET NOT NULL,
ALTER COLUMN "files_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "post_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "tag_posts" (
    "id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "tag_posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tag_posts" ADD CONSTRAINT "tag_posts_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_files" ADD CONSTRAINT "post_files_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_files" ADD CONSTRAINT "post_files_files_id_fkey" FOREIGN KEY ("files_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
