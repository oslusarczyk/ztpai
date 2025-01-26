/*
  Warnings:

  - The `reservation_status` column on the `reservations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('pending', 'cancelled', 'confirmed');

-- AlterTable
ALTER TABLE "reservations" ALTER COLUMN "reservation_price" DROP NOT NULL,
DROP COLUMN "reservation_status",
ADD COLUMN     "reservation_status" "ReservationStatus" NOT NULL DEFAULT 'pending';
