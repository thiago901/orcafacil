/*
  Warnings:

  - You are about to drop the column `files_id` on the `post_files` table. All the data in the column will be lost.
  - Added the required column `url` to the `post_files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_files" DROP CONSTRAINT "post_files_files_id_fkey";

-- AlterTable
ALTER TABLE "post_files" DROP COLUMN "files_id",
ADD COLUMN     "before_url" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "company_reviews" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT,
    "company_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_reviews_files" (
    "id" TEXT NOT NULL,
    "company_review_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_reviews_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_reviews_company_id_user_id_key" ON "company_reviews"("company_id", "user_id");

-- AddForeignKey
ALTER TABLE "company_reviews" ADD CONSTRAINT "company_reviews_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_reviews" ADD CONSTRAINT "company_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_reviews_files" ADD CONSTRAINT "company_reviews_files_company_review_id_fkey" FOREIGN KEY ("company_review_id") REFERENCES "company_reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
