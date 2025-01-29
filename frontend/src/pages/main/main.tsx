import React, { useState, useEffect } from "react";
import styles from "../../styles/main.module.css";
import basicStyles from "../../styles/basic_styling.module.css";
import { getLocations } from "../../utils/network/utils";
import { getMostPopularCars } from "../../utils/network/cars";
import { getSeatsText, getLocationText } from "../../utils/functions";

export interface Locations {
  location_id: number;
  location_name: string;
}

export interface Car {
  car_id: number;
  brand: string;
  model: string;
  photo: string;
  location: string[];
  seats_available: number;
  price_per_day: number;
}

export const Main: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [locations, setLocations] = useState<Locations[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const locations = await getLocations();
        setLocations(locations);
      } catch (error) {
        console.error(error);
      }
    })();
    (async () => {
      try {
        const cars = await getMostPopularCars();
        setCars(cars);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <div className={`${basicStyles.wrapper_main}`}>
        <header className={`${basicStyles.flexColumn} ${styles.header}`}>
          <div className={`${basicStyles.flexColumn} ${styles.form_wrapper}`}>
            <h3>Wynajmij auto</h3>
            <form
              className={`${basicStyles.flexColumn}`}
              action="/cars"
              method="GET"
            >
              <label htmlFor="location_select">
                Miejsce wynajmu
                {locations.length === 0 && <p>Brak dostępnych lokalizacji</p>}
                <select name="location" id="location_select">
                  {locations.map((location, index) => (
                    <option key={index} value={location.location_name}>
                      {location.location_name}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Szukaj</button>
            </form>
          </div>
        </header>
        <main className={`${styles.mainPage}`}>
          <h2>Najpopularniejsze samochody</h2>
          <div className={`${styles.carsWrapper} ${basicStyles.grid_row}`}>
            {cars.map((car) => (
              <div key={car.car_id} className={`${basicStyles.carCard}`}>
                <div className={`${basicStyles.leftPart}`}>
                  <img
                    src={require(`../../assets/${car.photo}`)}
                    alt={`${car.brand} ${car.model}`}
                  />
                </div>
                <div
                  className={`${basicStyles.rightPart} ${basicStyles.flexColumn}`}
                >
                  <h4 className="carName">{`${car.brand} ${car.model}`}</h4>
                  <p className="carLocations">
                    <i className="bx bx-map"></i>
                    {`${car.location.length} ${getLocationText(
                      car.location.length
                    )}`}
                  </p>
                  <p className="seats">
                    <i className="bx bx-body"></i>
                    {`${car.seats_available} ${getSeatsText(
                      car.seats_available
                    )}`}
                  </p>
                  <p className="price">od {car.price_per_day} PLN</p>
                  <button className={`${basicStyles.buttonClass}`}>
                    <a href={`/cars/${car.car_id}`}>Zobacz więcej</a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};
