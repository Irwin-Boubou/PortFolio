-- CreateTable
CREATE TABLE "Value" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Value_pkey" PRIMARY KEY ("id")
);
