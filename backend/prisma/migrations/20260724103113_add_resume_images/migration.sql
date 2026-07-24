-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
