import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getReservationsByUserId } from "../../utils/network/reservations";
import styles from "../../styles/history.module.css";
import basicStyles from "../../styles/basic_styling.module.css";

interface Reservation {
  photo: string;
  carName: string;
  reservationStartDate: string;
  reservationEndDate: string;
  locationName: string;
  reservationPrice: number;
}

type ReservationStatus = "confirmed";

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
        if (confirmedReservations.length > 0) {
          setConfirmed(confirmedReservations);
        }

        const pendingReservatons = await getReservationsByUserId(
          userId,
          "pending"
        );
        if (pendingReservatons.length > 0) {
          setPending(pendingReservatons);
        }
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
        <div className={`${styles.reservationWrapper} ${basicStyles.gridRow}`}>
          {reservations.map((reservation, index) => (
            <div key={index} className={basicStyles.carCard}>
              <div className={basicStyles.leftPart}>
                <img
                  src={require(`../../assets/${reservation.photo}`)}
                  alt="car image"
                />
              </div>
              <div
                className={`${basicStyles.rightPart} ${basicStyles.flexColumn}`}
              >
                <h4 className={styles.carName}>{reservation.carName}</h4>
                <p className={styles.reservationDetail}>
                  <i className="bx bx-calendar"></i> od{" "}
                  {reservation.reservationStartDate}
                </p>
                <p className={styles.reservationDetail}>
                  <i className="bx bx-calendar"></i> do{" "}
                  {reservation.reservationEndDate}
                </p>
                <p className={styles.reservationDetail}>
                  <i className="bx bx-map"></i> {reservation.locationName}
                </p>
                <p className={styles.price}>
                  {reservation.reservationPrice} PLN
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={basicStyles.wrapper}>
      <div className={basicStyles.wrapperMain}>
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
