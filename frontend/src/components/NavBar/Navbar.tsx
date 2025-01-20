import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SmartCarLogo from "../../assets/smartcar_logo.png";
import styles from "../../styles/navbar.module.css"; // Import modułu CSS

const Navbar: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={`${styles.nav} flex-column`}>
      <div className={styles.header_logo}>
        <img src={SmartCarLogo} alt="SmartCar logo" />
      </div>
      <div className={`${styles.navParts} flex-column`}>
        <Link to="/main">
          <i className="bx bx-home"></i>
          <p>Główna</p>
        </Link>
        <Link to="/cars">
          <i className="bx bx-car"></i>
          <p>Samochody</p>
        </Link>
        <Link to="/history">
          <i className="bx bx-history"></i>
          <p>Historia</p>
        </Link>

        {isAdmin && (
          <>
            <Link className="end" to="/carAdmin">
              <i className="bx bx-calendar"></i>
              <p>Rezerwacje</p>
            </Link>
            <Link className="end" to="/addCar">
              <i className="bx bx-car"></i>
              <p>Dodawanie</p>
            </Link>
          </>
        )}

        <Link className="end logout-button" to={"/"} onClick={handleLogout}>
          <i className="bx bx-log-out"></i>
          <p>Wyloguj</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
