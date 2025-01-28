import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SmartCarLogo from "../../assets/smartcar_logo.png";
import styles from "../../styles/navbar.module.css";
import basicStyles from "../../styles/basic_styling.module.css";

const Navbar: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const getActiveClass = (path: string) =>
    location.pathname === path ? styles.active : "";

  return (
    <nav className={`${styles.nav} ${basicStyles.flexColumn}`}>
      <div className={styles.header_logo}>
        <img src={SmartCarLogo} alt="SmartCar logo" />
      </div>
      <div className={`${styles.navParts} ${basicStyles.flexColumn}`}>
        <Link to="/" className={getActiveClass("/")}>
          <i className="bx bx-home"></i>
          <p>Główna</p>
        </Link>
        <Link to="/cars" className={getActiveClass("/cars")}>
          <i className="bx bx-car"></i>
          <p>Samochody</p>
        </Link>
        <Link to="/history" className={getActiveClass("/history")}>
          <i className="bx bx-history"></i>
          <p>Historia</p>
        </Link>

        {isAdmin && (
          <>
            <Link
              className={`end ${getActiveClass("/carAdmin")}}`}
              to="/carAdmin"
            >
              <i className="bx bx-calendar"></i>
              <p>Rezerwacje</p>
            </Link>
            <Link className={`end ${getActiveClass("/addCar")}}`} to="/addCar">
              <i className="bx bx-car"></i>
              <p>Dodawanie</p>
            </Link>
          </>
        )}

        <Link
          className={`end ${getActiveClass("/cars")}}`}
          to={"/"}
          onClick={handleLogout}
        >
          <i className="bx bx-log-out"></i>
          <p>Wyloguj</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
