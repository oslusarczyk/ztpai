/*
  Warnings:

  - You are about to drop the column `brandss_id` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the `CarsLocations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand_id` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CarsLocations" DROP CONSTRAINT "CarsLocations_car_id_fkey";

-- DropForeignKey
ALTER TABLE "CarsLocations" DROP CONSTRAINT "CarsLocations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_brandss_id_fkey";

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "brandss_id",
ADD COLUMN     "brand_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "location_name" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "CarsLocations";

-- CreateTable
CREATE TABLE "cars_locations" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "car_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,

    CONSTRAINT "cars_locations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("brand_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_locations" ADD CONSTRAINT "cars_locations_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("car_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_locations" ADD CONSTRAINT "cars_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE CASCADE ON UPDATE CASCADE;
