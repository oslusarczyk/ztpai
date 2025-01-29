import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getReservationsByUserId } from "../../utils/network/reservations";
import { formatDate } from "../../utils/functions";
import styles from "../../styles/history.module.css";
import basicStyles from "../../styles/basic_styling.module.css";

interface Reservation {
  reservation_id: string;
  user_id: string;
  car_id: string;
  location_id: string;
  reservation_start_date: string;
  reservation_end_date: string;
  reservation_price: number;
  reservation_status: string;
  car: {
    car_id: string;
    brand_id: string;
    model: string; // carName
    price_per_day: number;
    seats_available: number;
    photo: string;
    production_year: number;
    car_description: string;
    brand: {
      brand_id: string;
      brand_name: string;
    };
  };
  location: {
    location_id: string;
    location_name: string; // locationName
  };
}

const History: React.FC = () => {
  const [confirmed, setConfirmed] = useState<Reservation[]>([]);
  const [pending, setPending] = useState<Reservation[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const confirmedReservations = await getReservationsByUserId(
          userId,
          "confirmed"
        );
        setConfirmed(confirmedReservations);

        const pendingReservations = await getReservationsByUserId(
          userId,
          "pending"
        );
        setPending(pendingReservations);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const renderReservations = (
    reservations: Reservation[],
    isConfirmed: boolean
  ) => {
    if (reservations.length === 0) {
      return (
        <h2>
          {isConfirmed
            ? "Brak potwierdzonych rezerwacji"
            : "Brak oczekujących rezerwacji"}
        </h2>
      );
    }

    return (
      <>
        <h2>
          {isConfirmed ? "Potwierdzone rezerwacje" : "Oczekujące rezerwacje"}
        </h2>
        <div>
          <div
            className={`${styles.reservation_wrapper} ${basicStyles.grid_row}`}
          >
            {reservations.map((reservation, index) => (
              <div key={index} className={basicStyles.carCard}>
                <div className={basicStyles.leftPart}>
                  <img
                    src={require(`../../assets/${reservation.car.photo}`)}
                    alt="car image"
                  />
                </div>
                <div
                  className={`${basicStyles.rightPart} ${basicStyles.flexColumn}`}
                >
                  <h4 className={styles.carName}>
                    {reservation.car.brand.brand_name} {reservation.car.model}
                  </h4>
                  <p className={styles.reservationDetail}>
                    <i className="bx bx-calendar"></i> od{" "}
                    {formatDate(reservation.reservation_start_date)}
                  </p>
                  <p className={styles.reservationDetail}>
                    <i className="bx bx-calendar"></i> do{" "}
                    {formatDate(reservation.reservation_end_date)}
                  </p>
                  <p className={styles.reservationDetail}>
                    <i className="bx bx-map"></i>{" "}
                    {reservation.location.location_name}
                  </p>
                  <p className={styles.price}>
                    {reservation.reservation_price} PLN
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={basicStyles.wrapper}>
      <div className={basicStyles.wrapper_main}>
        <div className={basicStyles.confirmed_wrapper}>
          {renderReservations(confirmed, true)}
        </div>
        <div className={basicStyles.pending_wrapper}>
          {renderReservations(pending, false)}
        </div>
      </div>
    </div>
  );
};

export default History;
