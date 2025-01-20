/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "brands" (
    "brand_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "brand_name" TEXT NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("brand_id")
);

-- CreateTable
CREATE TABLE "cars" (
    "car_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "brandss_id" UUID NOT NULL,
    "model" TEXT NOT NULL,
    "price_per_day" INTEGER NOT NULL,
    "seats_available" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "production_year" INTEGER NOT NULL,
    "car_description" TEXT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "CarsLocations" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "car_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,

    CONSTRAINT "CarsLocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "location_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "location_name" UUID NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "reservation_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "car_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "reservation_start_date" TIMESTAMP(3) NOT NULL,
    "reservation_end_date" TIMESTAMP(3) NOT NULL,
    "reservation_price" INTEGER NOT NULL,
    "reservation_status" TEXT DEFAULT 'pending',

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "has_admin_privileges" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_brandss_id_fkey" FOREIGN KEY ("brandss_id") REFERENCES "brands"("brand_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarsLocations" ADD CONSTRAINT "CarsLocations_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("car_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarsLocations" ADD CONSTRAINT "CarsLocations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("car_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE CASCADE ON UPDATE CASCADE;
