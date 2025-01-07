import React from "react";
import "../../styles/basic_styling.css";
import "../../styles/login.css";
import SmartCarLogo from "../../assets/smartcar_logo.png";
import CarPhoto from "../../assets/car_logo.jpg";
import LoginForm from "../../components/LoginForm/LoginForm";

export const Login: React.FC = () => {
  return (
    <div className="login-page">
      <div className="header_logo">
        <img src={SmartCarLogo} alt="SmartCar logo" />
      </div>
      <div className="flex-row wrapper">
        <div className="image_wrapper">
          <img src={CarPhoto} alt="Car image" />
          <div className="text_wrapper">
            <p className="image_text">
              Wynajem samochodów w kilkunastu lokalizacjach
            </p>
          </div>
        </div>
        <div className="form_wrapper flex-column">
          <h2>Witaj!</h2>
          <LoginForm />
          <p>
            Nie masz konta? <a href="/register">Zarejestruj się</a>
          </p>
        </div>
      </div>
    </div>
  );
};
