-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender";
