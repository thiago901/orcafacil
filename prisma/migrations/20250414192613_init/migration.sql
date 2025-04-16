-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate_request" (
    "id" INTEGER NOT NULL,
    "footage" INTEGER,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "description" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "estimate_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate_request_files" (
    "id" INTEGER NOT NULL,
    "estimate_request_id" INTEGER,
    "files_id" INTEGER,
    "reason" TEXT,

    CONSTRAINT "estimate_request_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "created_at" TIMESTAMP(3),

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" INTEGER NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "user_id" INTEGER NOT NULL,
    "status" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_files" (
    "id" INTEGER NOT NULL,
    "post_id" INTEGER,
    "files_id" INTEGER,

    CONSTRAINT "post_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposals" (
    "id" INTEGER NOT NULL,
    "amount" INTEGER,
    "description" TEXT,
    "estimate_request_id" INTEGER,
    "company_id" INTEGER,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "aproved_at" TIMESTAMP(3),

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "post_id" INTEGER,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "ratting" INTEGER,
    "owner_id" INTEGER,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" INTEGER NOT NULL,
    "company_id" INTEGER,
    "proposal_id" INTEGER,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_owner_id_key" ON "company"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_proposal_id_key" ON "jobs"("proposal_id");

-- AddForeignKey
ALTER TABLE "estimate_request" ADD CONSTRAINT "estimate_request_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate_request_files" ADD CONSTRAINT "estimate_request_files_estimate_request_id_fkey" FOREIGN KEY ("estimate_request_id") REFERENCES "estimate_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate_request_files" ADD CONSTRAINT "estimate_request_files_files_id_fkey" FOREIGN KEY ("files_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_files" ADD CONSTRAINT "post_files_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_files" ADD CONSTRAINT "post_files_files_id_fkey" FOREIGN KEY ("files_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_estimate_request_id_fkey" FOREIGN KEY ("estimate_request_id") REFERENCES "estimate_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
