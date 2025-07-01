-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "user_id" TEXT NOT NULL DEFAULT '9d67b8e1-1447-40e8-8b07-979b9fbb95fb';

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
