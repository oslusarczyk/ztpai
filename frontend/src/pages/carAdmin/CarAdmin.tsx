import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getPendingReservations,
  updateReservationStatus,
  Status,
} from "../../utils/network/reservations";
import { formatDate } from "../../utils/functions";
import styles from "../../styles/car_admin.module.css";
import basicStyles from "../../styles/basic_styling.module.css";
import { Reservation } from "../../utils/types";

const CarAdmin: React.FC = () => {
  const [pending, setPending] = useState<Reservation[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const pendingReservations = await getPendingReservations();
        setPending(pendingReservations);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleAction = async (reservationId: string, decision: Status) => {
    console.log(decision, reservationId);
    updateReservationStatus(reservationId, decision);
    setPending((prev) =>
      prev.filter((res) => res.reservation_id !== reservationId)
    );
  };

  return (
    <div className={basicStyles.wrapper}>
      <div className={basicStyles.wrapper_main}>
        {pending.length === 0 ? (
          <h2>Brak rezerwacji do potwierdzenia</h2>
        ) : (
          <>
            <h2>Rezerwacje do potwierdzenia</h2>
            <div
              className={`${styles.pending_reservation_wrapper} ${basicStyles.grid_row}`}
            >
              {pending.map((reservation) => (
                <div
                  key={reservation.reservation_id}
                  id={reservation.reservation_id}
                  className={basicStyles.carCard}
                >
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
                    <p className={styles.reservationDetail}>
                      <i className="bx bx-body"></i> {reservation.user.email}
                    </p>
                    <p className={styles.price}>
                      {reservation.reservation_price} PLN
                    </p>

                    <div className={styles.buttonContainer}>
                      <button
                        className={`${styles.cancel} cancel`}
                        onClick={() =>
                          handleAction(
                            reservation.reservation_id,
                            Status.CANCELLED
                          )
                        }
                      >
                        &#10005;
                      </button>
                      <button
                        className={`${styles.confirm} confirm`}
                        onClick={() =>
                          handleAction(
                            reservation.reservation_id,
                            Status.CONFIRMED
                          )
                        }
                      >
                        &#10004;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarAdmin;
