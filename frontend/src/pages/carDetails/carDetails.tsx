import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarDetails } from "../../utils/network/cars";
import styles from "../../styles/car_details.module.css";
import basicStyles from "../../styles/basic_styling.module.css";
import { getLocations } from "../../utils/network/utils";
import { getSeatsText } from "../../utils/functions";

interface CarDetailsProps {
  car_id: string;
  model: string;
  price_per_day: number;
  seats_available: number;
  photo: string;
  production_year: number;
  car_description: string;
  brand: string;
  location: string;
}

interface Location {
  location_id: string;
  location_name: string;
}

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarDetailsProps | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [reservationStartDate, setReservationStartDate] = useState("");
  const [reservationEndDate, setReservationEndDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carResponse = await getCarDetails(id!);
        setCar(carResponse);
        const locations = await getLocations();
        setLocations(locations);
      } catch (err: any) {
        setError(err.message || "Nie udało się pobrać danych");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  //   const handleReservation = async (event: React.FormEvent) => {
  //     event.preventDefault();
  //     try {
  //       const response = await fetch("/api/reservations", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           car_id: car?.car_id,
  //           user_id: "USER_ID_PLACEHOLDER", // Zastąp odpowiednim ID użytkownika
  //           reservation_start_date: reservationStartDate,
  //           reservation_end_date: reservationEndDate,
  //           location_id: selectedLocation,
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Rezerwacja nie powiodła się");
  //       }

  //       alert("Rezerwacja zakończona sukcesem!");
  //     } catch (err: any) {
  //       alert(err.message || "Wystąpił błąd podczas rezerwacji");
  //     }
  //   };

  if (loading) return <p>Ładowanie szczegółów samochodu...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <div className={`${basicStyles.wrapper_main}`}>
      {car ? (
        <>
          <div className={`${styles.details_wrapper}`}>
            <div className={`${styles.car_image}`}>
              <img src={require(`../../assets/${car.photo}`)} alt={car.model} />
            </div>

            <div className={`${styles.car_details} ${basicStyles.flexColumn}`}>
              <h3>
                {car.brand} {car.model}{" "}
              </h3>
              <p className={`${styles.carLocations}`}>
                <i className="bx bx-map"></i>
                {locations
                  .map((location) => location.location_name)
                  .join(", ")}{" "}
              </p>
              <p className={`${styles.seats}`}>
                <i className="bx bx-body"></i>
                {car.seats_available} {getSeatsText(car.seats_available)}
              </p>
              <p className={`${styles.production_year}`}>
                <i className="bx bx-calendar"></i>
                {car.production_year}
              </p>
              <p className={`${styles.price}`}>
                <i className="bx bx-money"></i>
                {car.price_per_day} PLN
              </p>
            </div>
          </div>
          {/* <form onSubmit={handleReservation}>
            <label>
              Od:
              <input
                type="date"
                value={reservationStartDate}
                onChange={(e) => setReservationStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </label>
            <label>
              Do:
              <input
                type="date"
                value={reservationEndDate}
                onChange={(e) => setReservationEndDate(e.target.value)}
                min={
                  reservationStartDate || new Date().toISOString().split("T")[0]
                }
                required
              />
            </label>
            <label>
              Miejsce wynajmu:
              <select
                value={selectedLocation || ""}
                onChange={(e) => setSelectedLocation(e.target.value)}
                required
              >
                <option value="">Wybierz lokalizację</option>
                {locations.map((loc) => (
                  <option key={loc.location_id} value={loc.location_id}>
                    {loc.location_name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="buttonClass">
              Zarezerwuj
            </button>
          </form> */}
        </>
      ) : (
        <p>Nie znaleziono szczegółów samochodu.</p>
      )}
    </div>
  );
};

export default CarDetails;
