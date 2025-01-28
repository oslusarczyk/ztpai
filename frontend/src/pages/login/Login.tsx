import React from "react";
import styles from "../../styles/login.module.css";
import basicStyles from "../../styles/basic_styling.module.css";
import SmartCarLogo from "../../assets/smartcar_logo.png";
import CarPhoto from "../../assets/car_logo.jpg";
import LoginForm from "../../components/LoginForm/LoginForm";

export const Login: React.FC = () => {
  return (
    <div className={`${styles.wrapper} ${basicStyles.flexColumn}`}>
      <div className={styles.header_logo}>
        <img src={SmartCarLogo} alt="SmartCar logo" />
      </div>
      <div className={`${basicStyles.flexRow} ${styles.wrapper}`}>
        <div className={styles.image_wrapper}>
          <img src={CarPhoto} alt="Car image" />
          <div className={styles.text_wrapper}>
            <p className={styles.image_text}>
              Wynajem samochodów w kilkunastu lokalizacjach
            </p>
          </div>
        </div>
        <div className={`${styles.form_wrapper} ${basicStyles.flexColumn}`}>
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
