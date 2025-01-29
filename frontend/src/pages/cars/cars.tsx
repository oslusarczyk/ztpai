import React, { useState, useEffect } from "react";
import SearchForm from "../../components/searchForm/searchForm";
import CarCard from "../../components/carCard/carCard";
import Pagination from "../../components/Pagination/Pagination";
import basicStyles from "../../styles/basic_styling.module.css";
import styles from "../../styles/main.module.css";
import { getCars } from "../../utils/network/cars";
import { Car } from "../../utils/types";

export interface FilterParams {
  location?: string;
  brand?: string;
  seats?: string;
  price_min?: string;
  price_max?: string;
}

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = window.innerWidth <= 1024 ? 3 : 6;

  const handleFilterChange = async (filters: FilterParams) => {
    const filtered = await getCars(filters);
    setFilteredCars(filtered);
    setCurrentPage(1);
  };

  const displayedCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className={basicStyles.wrapper_main}>
      <div className={`${styles.header} ${basicStyles.flexColumn}`}>
        <SearchForm onFilterChange={handleFilterChange} />
      </div>

      <div className={styles.mainPage}>
        <h2>Dostępne samochody</h2>
        <div className={`${styles.carsWrapper} ${basicStyles.grid_row}`}>
          {displayedCars.length > 0 ? (
            displayedCars.map((car) => <CarCard key={car.car_id} car={car} />)
          ) : (
            <p className={styles.carsNotFound}>
              Nie znaleziono samochodów z podanymi parametrami
            </p>
          )}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Cars;
