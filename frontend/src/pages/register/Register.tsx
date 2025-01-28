import React from "react";
import styles from "../../styles/login.module.css"; // Wspólne style dla stron logowania/rejestracji
import basicStyles from "../../styles/basic_styling.module.css"; // Ogólne style
import SmartCarLogo from "../../assets/smartcar_logo.png";
import CarPhoto from "../../assets/car_logo.jpg";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export const Register: React.FC = () => {
  return (
    <div className={`${styles.wrapper} ${basicStyles.flexColumn}`}>
      <div className={styles.header_logo}>
        <img src={SmartCarLogo} alt="SmartCar logo" />
      </div>
      <div className={`${basicStyles.flexRow} ${styles.wrapper}`}>
        <div className={styles.image_wrapper}>
          <img src={CarPhoto} alt="Car image" />
          <div className={styles.text_wrapper}>
            <p className={styles.imageText}>
              Wynajem samochodów w kilkunastu lokalizacjach
            </p>
          </div>
        </div>
        <div className={`${styles.form_wrapper} ${basicStyles.flexColumn}`}>
          <h2>Załóż konto!</h2>
          <RegisterForm />
          <p>
            Masz już konto? <a href="/login">Zaloguj się</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
