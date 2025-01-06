-- CreateTable
create extension if not exists "uuid-ossp";

CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "has_admin_privileges" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
