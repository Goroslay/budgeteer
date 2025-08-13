-- CreateEnum
CREATE TYPE "public"."currency_type" AS ENUM ('COP', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "public"."transaction_type" AS ENUM ('income', 'expense');

-- CreateEnum
CREATE TYPE "public"."account_type" AS ENUM ('cash', 'bank', 'card', 'wallet', 'other');

-- CreateEnum
CREATE TYPE "public"."period_type" AS ENUM ('month', 'quarter', 'semester', 'annual');

-- CreateEnum
CREATE TYPE "public"."rate_type" AS ENUM ('monthlyNominal', 'quarterNominal', 'semesterNominal', 'annualNominal', 'monthlyEffective', 'quarterEffective', 'semesterEffective', 'annualEffective');

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "public"."Investment" (
    "investment_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "initial_investment" DECIMAL(14,2) NOT NULL,
    "cash_flow" DECIMAL(14,2) NOT NULL,
    "period_number" INTEGER NOT NULL,
    "period" "public"."period_type" NOT NULL,
    "opportunity_rate" DECIMAL(14,2) NOT NULL,
    "rate" "public"."rate_type" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("investment_id")
);

-- CreateTable
CREATE TABLE "public"."Budget" (
    "budget_id" TEXT NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("budget_id")
);

-- CreateTable
CREATE TABLE "public"."Goal" (
    "goal_id" TEXT NOT NULL,
    "current_amount" DECIMAL(14,2) NOT NULL,
    "name" TEXT NOT NULL,
    "target_amount" DECIMAL(14,2) NOT NULL,
    "initial_date" TIMESTAMP(3) NOT NULL,
    "target_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("goal_id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "account_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."account_type" NOT NULL,
    "balance" DECIMAL(14,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "transaction_id" TEXT NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "currency" "public"."currency_type" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "public"."transaction_type" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE INDEX "Category_user_id_idx" ON "public"."Category"("user_id");

-- CreateIndex
CREATE INDEX "Category_user_id_name_idx" ON "public"."Category"("user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_user_id_name_key" ON "public"."Category"("user_id", "name");

-- CreateIndex
CREATE INDEX "Account_user_id_idx" ON "public"."Account"("user_id");

-- CreateIndex
CREATE INDEX "Account_user_id_name_idx" ON "public"."Account"("user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_id_name_key" ON "public"."Account"("user_id", "name");

-- CreateIndex
CREATE INDEX "Transaction_user_id_date_idx" ON "public"."Transaction"("user_id", "date");

-- CreateIndex
CREATE INDEX "Transaction_account_id_idx" ON "public"."Transaction"("account_id");

-- CreateIndex
CREATE INDEX "Transaction_category_id_idx" ON "public"."Transaction"("category_id");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "public"."Transaction"("type");

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Investment" ADD CONSTRAINT "Investment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Budget" ADD CONSTRAINT "Budget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Budget" ADD CONSTRAINT "Budget_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Goal" ADD CONSTRAINT "Goal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "public"."Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
