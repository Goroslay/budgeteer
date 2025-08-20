-- CreateEnum
CREATE TYPE "public"."user_role" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."user_role" NOT NULL DEFAULT 'user';
