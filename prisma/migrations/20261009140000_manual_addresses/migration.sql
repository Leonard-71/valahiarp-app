-- AlterTable
ALTER TABLE "users" ADD COLUMN "phone" TEXT;

-- CreateTable
CREATE TABLE "adrese_manuale" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "street" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adrese_manuale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adrese_manuale_userId_key" ON "adrese_manuale"("userId");

-- AddForeignKey
ALTER TABLE "adrese_manuale" ADD CONSTRAINT "adrese_manuale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
