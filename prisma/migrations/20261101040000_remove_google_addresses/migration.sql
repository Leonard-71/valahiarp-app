-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_addressId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "addressAttempts",
DROP COLUMN "addressBlockedUntil",
DROP COLUMN "addressId";

-- DropTable
DROP TABLE "addresses";
