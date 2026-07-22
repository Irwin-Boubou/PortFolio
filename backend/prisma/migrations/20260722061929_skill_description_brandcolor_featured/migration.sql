-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "brandColor" TEXT,
ADD COLUMN     "description" JSONB,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;
