-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
