import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarDetails } from "../../utils/network/cars";
import styles from "../../styles/car_details.module.css";
import basicStyles from "../../styles/basic_styling.module.css";
import { getLocations } from "../../utils/network/utils";
import { getSeatsText } from "../../utils/functions";
import { useAuth } from "../../context/AuthContext";
import { addReservation } from "../../utils/network/reservations";
import { Locations as Location } from "../../utils/types";
import { toast } from "react-toastify";
import { CarDetailsProps } from "../../utils/types";

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userId } = useAuth();
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

  const handleReservation = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!reservationStartDate || !reservationEndDate || !selectedLocation) {
      toast.error("Wszystkie pola rezerwacji są wymagane!");
      return;
    }

    try {
      await addReservation({
        reservation_start_date: reservationStartDate,
        reservation_end_date: reservationEndDate,
        location_id: selectedLocation,
        car_id: id || "",
        user_id: userId,
      });

      toast.success("Rezerwacja zakończona sukcesem!");

      setReservationStartDate("");
      setReservationEndDate("");
      setSelectedLocation(null);
    } catch (error) {
      toast.error("Nie udało się zarezerwować samochodu. Spróbuj ponownie.");
    }
  };

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
          <div className={`${styles.description} ${basicStyles.flexColumn}`}>
            <h2>Opis</h2>
            <p>{car.car_description}</p>
            <div className={`${styles.reservation_form}`}>
              <form onSubmit={handleReservation}>
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
                      reservationStartDate ||
                      new Date().toISOString().split("T")[0]
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
              </form>
            </div>
          </div>
        </>
      ) : (
        <p>Nie znaleziono szczegółów samochodu.</p>
      )}
    </div>
  );
};

export default CarDetails;
