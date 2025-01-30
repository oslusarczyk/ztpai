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

CREATE FUNCTION public.update_reservation_price() RETURNS trigger
    LANGUAGE plpgsql
    AS $$DECLARE
	price INT;
duration INT;

BEGIN
	 IF NEW.reservation_end_date <= NEW.reservation_start_date THEN
        RAISE EXCEPTION 'wrong date';
END IF;

SELECT price_per_day INTO price
FROM cars
WHERE car_id = NEW.car_id;

duration := EXTRACT(DAY FROM NEW.reservation_end_date - NEW.reservation_start_date);
	NEW.reservation_price := price * duration;

RETURN NEW;
END;$$;

CREATE TRIGGER update_price BEFORE INSERT ON public.reservations FOR EACH ROW EXECUTE FUNCTION public.update_reservation_price();

INSERT INTO public.brands (brand_id, brand_name) VALUES ('fd61a120-08dc-4928-b240-41a1ea620028', 'Opel');
INSERT INTO public.brands (brand_id, brand_name) VALUES ('ef7d8ce5-f607-4b4d-a165-af2fef0e23ed', 'Toyota');
INSERT INTO public.brands (brand_id, brand_name) VALUES ('06c20bf3-8602-486b-a151-928a00858f12', 'Auuudi');
INSERT INTO public.brands (brand_id, brand_name) VALUES ('3857db7c-e6fb-4206-9fbe-e73aeeb95370', 'Peugeot');
INSERT INTO public.brands (brand_id, brand_name) VALUES ('db0914a6-5733-4e62-aaf4-d83376b76d23', 'BMW');

INSERT INTO public.locations (location_id, location_name) VALUES ('98e1e623-457d-471c-a699-3e2e03dab143', 'Kraków');
INSERT INTO public.locations (location_id, location_name) VALUES ('9128146a-22f8-4b88-8216-44731477850d', 'Toruń');
INSERT INTO public.locations (location_id, location_name) VALUES ('eeaedb14-a7e2-43f5-acf0-2b6d2ba00365', 'Warszawa');
INSERT INTO public.locations (location_id, location_name) VALUES ('888bb88e-4af2-4c84-8757-05e499f2836c', 'Łodź');
INSERT INTO public.locations (location_id, location_name) VALUES ('e820a613-e748-4f3a-995e-e794218f7ecc', 'Gdańsk');
INSERT INTO public.locations (location_id, location_name) VALUES ('9f8bcb24-d976-4390-8820-a139b562c1ee', 'Katowice');

INSERT INTO public.users (id, email, password, has_admin_privileges) VALUES ('1d45ffc7-ec9e-41ac-b4a2-a0b49a8e1ac4', 'as@test.com', '$2b$10$Di8JijkleveB/eE3AJpa1u8iDnKfz0yUK8EdM4CfKehTggQagwXR6', true);
INSERT INTO public.users (id, email, password, has_admin_privileges) VALUES ('dd27024c-1433-47f6-be75-442c70d3b224', 'test@test.pl', '$2b$10$lZ0yCpmC5YKUJU35dRr/ZecUwW.FKAsrBQUONyfG7GuMt./Tb8E0S', false);

INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('fb520b77-972a-4af2-bfc1-e0c917f2d77c', 'A4', 80, 5, 'car.jpg', 2024, 'Szukasz przyjemności z jazdy? Nasz sportowy hatchback to idealny wybór dla Ciebie. Zwinny, dynamiczny i pełen energii - ten samochód sprawi, że każda podróż stanie się przyjemnością. Dzięki nowoczesnym funkcjom i wyjątkowemu designowi.', '06c20bf3-8602-486b-a151-928a00858f12');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('f534f5a7-58f2-495b-bada-26b93d7c0798', '308', 140, 5, 'car.jpg', 2019, 'Nasze najnowsze SUV to prawdziwy magnat na drodze. Znajdziesz w nim połączenie luksusu i wszechstronności, idealne zarówno na wyprawy miejskie, jak i przygody terenowe. Wyposażony w najnowsze technologie rozrywki i bezpieczeństwa, ten SUV zapewni Ci niezapomniane doświadczenie podróży.', '3857db7c-e6fb-4206-9fbe-e73aeeb95370');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('2b12bdbd-a1b8-4706-abe9-c5898006c8ab', '3 Series', 200, 5, 'car.jpg', 2020, 'Nasze najnowsze dodatkowe udogodnienie to dynamiczny i stylowy sedan. Ten model łączy elegancję z wydajnością, oferując komfortową jazdę i zaawansowane funkcje bezpieczeństwa. Znajdziesz w nim także przestronne wnętrze, idealne zarówno dla rodzin, jak i osób podróżujących służbowo. Nie czekaj dłużej, rezerwuj już dziś!', 'db0914a6-5733-4e62-aaf4-d83376b76d23');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('3eb4b0c8-3cc8-41de-916c-1630fbdf263e', 'Yaris', 55, 4, 'car.jpg', 2021, 'Szukasz przyjemności z jazdy? Nasz sportowy hatchback to idealny wybór dla Ciebie. Zwinny, dynamiczny i pełen energii - ten samochód sprawi, że każda podróż stanie się przyjemnością. Dzięki nowoczesnym funkcjom i wyjątkowemu designowi, ten hatchback z pewnością przyciągnie spojrzenia na drodze.', 'ef7d8ce5-f607-4b4d-a165-af2fef0e23ed');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('edf54234-f9bd-4c8b-9de4-042a3f04c760', 'Astra', 100, 5, 'car.jpg', 2022, 'Nasze najnowsze dodatkowe udogodnienie to dynamiczny i stylowy sedan. Ten model łączy elegancję z wydajnością, oferując komfortową jazdę i zaawansowane funkcje bezpieczeństwa. Znajdziesz w nim także przestronne wnętrze, idealne zarówno dla rodzin, jak i osób podróżujących służbowo. Nie czekaj dłużej, rezerwuj już dziś!', 'fd61a120-08dc-4928-b240-41a1ea620028');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('21f5d664-fd60-4687-bbd1-b8717a3de19e', '3008', 65, 5, 'car.jpg', 2023, 'Szukasz przyjemności z jazdy? Nasz sportowy hatchback to idealny wybór dla Ciebie. Zwinny, dynamiczny i pełen energii - ten samochód sprawi, że każda podróż stanie się przyjemnością. Dzięki nowoczesnym funkcjom i wyjątkowemu designowi, ten hatchback z pewnością przyciągnie spojrzenia na drodze.', '3857db7c-e6fb-4206-9fbe-e73aeeb95370');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('15e4ad25-1f9a-41bb-88dc-f241c1f2aa21', 'A6', 85, 7, 'car.jpg', 2024, 'Nasze najnowsze SUV to prawdziwy magnat na drodze. Znajdziesz w nim połączenie luksusu i wszechstronności, idealne zarówno na wyprawy miejskie, jak i przygody terenowe. Wyposażony w najnowsze technologie rozrywki i bezpieczeństwa, ten SUV zapewni Ci niezapomniane doświadczenie podróży.', '06c20bf3-8602-486b-a151-928a00858f12');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('5fa8bd00-0e68-4f67-9cc8-d13ba5903454', 'Camry', 70, 4, 'car.jpg', 2023, 'Nasze najnowsze SUV to prawdziwy magnat na drodze. Znajdziesz w nim połączenie luksusu i wszechstronności, idealne zarówno na wyprawy miejskie, jak i przygody terenowe. Wyposażony w najnowsze technologie rozrywki i bezpieczeństwa, ten SUV zapewni Ci niezapomniane doświadczenie podróży.', 'ef7d8ce5-f607-4b4d-a165-af2fef0e23ed');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('2532cfde-90a2-4c05-b767-17170aaa8dac', '5 Series', 100, 5, 'car.jpg', 2023, 'Nasze najnowsze SUV to prawdziwy magnat na drodze. Znajdziesz w nim połączenie luksusu i wszechstronności, idealne zarówno na wyprawy miejskie, jak i przygody terenowe. Wyposażony w najnowsze technologie rozrywki i bezpieczeństwa, ten SUV zapewni Ci niezapomniane doświadczenie podróży.', 'db0914a6-5733-4e62-aaf4-d83376b76d23');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('52f55826-e5eb-49e1-a585-d194e1f26740', 'Corsa', 50, 5, 'car.jpg', 2021, 'Nasze najnowsze dodatkowe udogodnienie to dynamiczny i stylowy sedan. Ten model łączy elegancję z wydajnością, oferując komfortową jazdę i zaawansowane funkcje bezpieczeństwa. Znajdziesz w nim także przestronne wnętrze, idealne zarówno dla rodzin, jak i osób podróżujących służbowo. Nie czekaj dłużej, rezerwuj już dziś!', 'fd61a120-08dc-4928-b240-41a1ea620028');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('5b8ac778-bf26-498e-9420-22e4ad9b7f5d', 'test', 120, 5, 'car.jpg', 2020, 'testttss', '3857db7c-e6fb-4206-9fbe-e73aeeb95370');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('b4ab370f-3628-4a72-bdde-8ca84b44f847', 'test', 120, 5, 'car.jpg', 2020, 'testttss', '3857db7c-e6fb-4206-9fbe-e73aeeb95370');
INSERT INTO public.cars (car_id, model, price_per_day, seats_available, photo, production_year, car_description, brand_id) VALUES ('253c005b-415a-4e4a-a6cb-b54662bc52d1', 'test', 120, 5, 'car.jpg', 2020, 'testttss', '3857db7c-e6fb-4206-9fbe-e73aeeb95370');

INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('29fe9241-b602-4463-b5e6-d3fb3b65f4ae', '15e4ad25-1f9a-41bb-88dc-f241c1f2aa21', '888bb88e-4af2-4c84-8757-05e499f2836c');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('2b1a7738-2446-456e-83f6-a222a6c1bb7a', '21f5d664-fd60-4687-bbd1-b8717a3de19e', '9128146a-22f8-4b88-8216-44731477850d');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('03299119-1503-4962-8468-203fbedc62de', '2532cfde-90a2-4c05-b767-17170aaa8dac', '98e1e623-457d-471c-a699-3e2e03dab143');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('b7f6e475-657f-490c-836c-a884fcd3d662', '2b12bdbd-a1b8-4706-abe9-c5898006c8ab', '9f8bcb24-d976-4390-8820-a139b562c1ee');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('3f44c19f-7524-43a0-80d8-ccbe4a758a0c', '3eb4b0c8-3cc8-41de-916c-1630fbdf263e', 'e820a613-e748-4f3a-995e-e794218f7ecc');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('def30696-07a5-4fde-93c8-8ef9691486fa', '52f55826-e5eb-49e1-a585-d194e1f26740', 'eeaedb14-a7e2-43f5-acf0-2b6d2ba00365');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('fecc0b11-02e2-4d97-a9fd-ec70c6ef95a5', '5fa8bd00-0e68-4f67-9cc8-d13ba5903454', '888bb88e-4af2-4c84-8757-05e499f2836c');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('16fcc702-d077-47b4-8fdd-bc46191f950c', 'edf54234-f9bd-4c8b-9de4-042a3f04c760', '9128146a-22f8-4b88-8216-44731477850d');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('290b4eea-ec82-48e5-9dbf-ea48b70b3fa6', 'f534f5a7-58f2-495b-bada-26b93d7c0798', '98e1e623-457d-471c-a699-3e2e03dab143');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('31c088fb-0ee4-4d77-a785-be2b3749b225', 'fb520b77-972a-4af2-bfc1-e0c917f2d77c', '9f8bcb24-d976-4390-8820-a139b562c1ee');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('4ef5cd1d-16b8-4f92-a05b-1faa022b548b', '15e4ad25-1f9a-41bb-88dc-f241c1f2aa21', 'e820a613-e748-4f3a-995e-e794218f7ecc');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('32d60a7d-10ac-40a4-b9fe-5233ae7358b8', '21f5d664-fd60-4687-bbd1-b8717a3de19e', 'eeaedb14-a7e2-43f5-acf0-2b6d2ba00365');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('39797a51-3b9a-43fe-ac75-f1ae7466e5a9', '2532cfde-90a2-4c05-b767-17170aaa8dac', '888bb88e-4af2-4c84-8757-05e499f2836c');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('e85e091a-ebd9-45aa-8780-ad9dd5e0c6cc', '2b12bdbd-a1b8-4706-abe9-c5898006c8ab', '9128146a-22f8-4b88-8216-44731477850d');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('3c2ca8d9-a3e8-41af-8c7e-7fe397c2bf5f', '3eb4b0c8-3cc8-41de-916c-1630fbdf263e', '98e1e623-457d-471c-a699-3e2e03dab143');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('00857507-4b4c-44d4-b957-c781658fa7ff', '52f55826-e5eb-49e1-a585-d194e1f26740', '9f8bcb24-d976-4390-8820-a139b562c1ee');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('df89d6a7-48dc-4ed3-bfc8-38a411668365', '5fa8bd00-0e68-4f67-9cc8-d13ba5903454', 'e820a613-e748-4f3a-995e-e794218f7ecc');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('e3e1a47b-7c55-4ac9-9d9f-910967f41a43', 'edf54234-f9bd-4c8b-9de4-042a3f04c760', 'eeaedb14-a7e2-43f5-acf0-2b6d2ba00365');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('aec21a6c-62e0-4cda-87b3-72787e78af24', 'f534f5a7-58f2-495b-bada-26b93d7c0798', '888bb88e-4af2-4c84-8757-05e499f2836c');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('64defc9d-7bfe-4787-afdb-d1b55c53cd9c', 'fb520b77-972a-4af2-bfc1-e0c917f2d77c', '9128146a-22f8-4b88-8216-44731477850d');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('b66420ac-6b45-4138-a1b5-4975bb53e2d0', '15e4ad25-1f9a-41bb-88dc-f241c1f2aa21', '98e1e623-457d-471c-a699-3e2e03dab143');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('e952d272-1f00-4ab2-8077-caeee70c534a', '21f5d664-fd60-4687-bbd1-b8717a3de19e', '9f8bcb24-d976-4390-8820-a139b562c1ee');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('2934485f-39cf-4b12-9acd-0acb345e0f9d', '2532cfde-90a2-4c05-b767-17170aaa8dac', 'e820a613-e748-4f3a-995e-e794218f7ecc');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('d8b5285a-9ad9-40f3-9fc3-6abd640e2d10', '2b12bdbd-a1b8-4706-abe9-c5898006c8ab', 'eeaedb14-a7e2-43f5-acf0-2b6d2ba00365');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('7f34e994-e8b0-4bff-a64f-7500b0b8b151', '3eb4b0c8-3cc8-41de-916c-1630fbdf263e', '888bb88e-4af2-4c84-8757-05e499f2836c');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('260fcaec-9bf6-46b1-9b34-a2e771aa1b54', '253c005b-415a-4e4a-a6cb-b54662bc52d1', '9f8bcb24-d976-4390-8820-a139b562c1ee');
INSERT INTO public.cars_locations (id, car_id, location_id) VALUES ('16be9383-43d6-48ec-aa0c-704c1fef78d0', '253c005b-415a-4e4a-a6cb-b54662bc52d1', 'eeaedb14-a7e2-43f5-acf0-2b6d2ba00365');

INSERT INTO public.reservations (reservation_id, user_id, car_id, location_id, reservation_start_date, reservation_end_date, reservation_price, reservation_status) VALUES ('bf363018-6b42-4f50-811f-a36667c24011', '1d45ffc7-ec9e-41ac-b4a2-a0b49a8e1ac4', '21f5d664-fd60-4687-bbd1-b8717a3de19e', '9f8bcb24-d976-4390-8820-a139b562c1ee', '2025-01-29 00:00:00', '2025-02-03 00:00:00', 325, 'confirmed');
INSERT INTO public.reservations (reservation_id, user_id, car_id, location_id, reservation_start_date, reservation_end_date, reservation_price, reservation_status) VALUES ('9ff0fd78-3a92-48d4-a968-ff740b946b0d', '1d45ffc7-ec9e-41ac-b4a2-a0b49a8e1ac4', '5fa8bd00-0e68-4f67-9cc8-d13ba5903454', '9128146a-22f8-4b88-8216-44731477850d', '2025-01-23 00:00:00', '2025-01-27 00:00:00', 280, 'confirmed');
INSERT INTO public.reservations (reservation_id, user_id, car_id, location_id, reservation_start_date, reservation_end_date, reservation_price, reservation_status) VALUES ('7c54f569-95f3-48e3-be89-1bab3692c50a', '1d45ffc7-ec9e-41ac-b4a2-a0b49a8e1ac4', '2532cfde-90a2-4c05-b767-17170aaa8dac', 'eeaedb14-a7e2-43f5-acf0-2b6d2ba00365', '2025-01-30 00:00:00', '2025-02-04 00:00:00', 500, 'cancelled');
INSERT INTO public.reservations (reservation_id, user_id, car_id, location_id, reservation_start_date, reservation_end_date, reservation_price, reservation_status) VALUES ('3e6cdb95-8ec1-4568-82eb-643721911e8e', '1d45ffc7-ec9e-41ac-b4a2-a0b49a8e1ac4', 'f534f5a7-58f2-495b-bada-26b93d7c0798', '9128146a-22f8-4b88-8216-44731477850d', '2025-02-01 00:00:00', '2025-02-05 00:00:00', 560, 'cancelled');
INSERT INTO public.reservations (reservation_id, user_id, car_id, location_id, reservation_start_date, reservation_end_date, reservation_price, reservation_status) VALUES ('cb6bc5a2-aac1-4ed7-85d5-5a977a24b822', '1d45ffc7-ec9e-41ac-b4a2-a0b49a8e1ac4', 'fb520b77-972a-4af2-bfc1-e0c917f2d77c', '888bb88e-4af2-4c84-8757-05e499f2836c', '2025-01-31 00:00:00', '2025-02-01 00:00:00', 80, 'confirmed');
INSERT INTO public.reservations (reservation_id, user_id, car_id, location_id, reservation_start_date, reservation_end_date, reservation_price, reservation_status) VALUES ('59d731a0-7c67-442e-83e0-7a3a685aaf8b', '1d45ffc7-ec9e-41ac-b4a2-a0b49a8e1ac4', 'fb520b77-972a-4af2-bfc1-e0c917f2d77c', '888bb88e-4af2-4c84-8757-05e499f2836c', '2025-01-31 00:00:00', '2025-02-01 00:00:00', 80, 'confirmed');