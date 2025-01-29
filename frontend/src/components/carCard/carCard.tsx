import React from "react";
import { Car } from "../../pages/main/Main";
import basicStyles from "../../styles/basic_styling.module.css";
import { getLocationText, getSeatsText } from "../../utils/functions";

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  console.log(car);
  return (
    <div className={basicStyles.carCard}>
      <div className={basicStyles.leftPart}>
        <img src={require(`../../assets/${car.photo}`)} alt={car.model} />
      </div>
      <div className={`${basicStyles.rightPart} ${basicStyles.flexColumn}`}>
        <h4>
          {car.brand} {car.model}
        </h4>
        <p className="carLocations">
          <i className="bx bx-map"></i>
          {`${car.location.length} ${getLocationText(car.location.length)}`}
        </p>
        <p className="seats">
          <i className="bx bx-body"></i>
          {`${car.seats_available} ${getSeatsText(car.seats_available)}`}
        </p>
        <p className={basicStyles.price}>od {car.price_per_day} PLN</p>
        <button className={`${basicStyles.buttonClass}`}>
          <a href={`/cars/${car.car_id}`}>Zobacz więcej</a>
        </button>
      </div>
      {/* <div key={car.car_id} className={`${basicStyles.carCard}`}>
         
                <div
                  className={`${basicStyles.rightPart} ${basicStyles.flexColumn}`}
                >
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
              </div> */}
    </div>
  );
};

export default CarCard;
