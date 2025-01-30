import React, { useEffect, useState, useRef } from "react";
import basicStyles from "../../styles/basic_styling.module.css";
import styles from "../../styles/main.module.css";
import { getBrands, getLocations } from "../../utils/network/utils";
import { Locations } from "../../utils/types";
import { useSearchParams } from "react-router-dom";

export interface FilterParams {
  location?: string;
  brand?: string;
  seats?: string;
  minPrice?: string;
  maxPrice?: string;
}

type Brands = {
  brand_id: string;
  brand_name: string;
};

interface Props {
  onFilterChange: (filters: FilterParams) => void;
}

const SearchForm: React.FC<Props> = ({ onFilterChange }) => {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [brands, setBrands] = useState<Brands[]>([]);
  const [filters, setFilters] = useState<FilterParams>({});
  const [searchParams] = useSearchParams();
  const isFirstRender = useRef(true); // Śledzenie pierwszego renderowania

  useEffect(() => {
    (async () => {
      try {
        const locations = await getLocations();
        setLocations(locations);
      } catch (error) {
        console.error(error);
      }

      try {
        const brands = await getBrands();
        setBrands(brands);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      // Tylko pierwsze ustawienie wartości z URL
      const locationFromUrl = searchParams.get("location");

      setFilters((prev) => {
        const updatedFilters = { ...prev };

        if (locationFromUrl) {
          updatedFilters.location = locationFromUrl;
        }

        onFilterChange(updatedFilters); // Wywołanie `onFilterChange` tylko raz
        return updatedFilters;
      });

      isFirstRender.current = false;
    }
  }, [searchParams, onFilterChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFilters((prev) => {
      const updatedFilters = { ...prev, [name]: value };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div
      className={`${styles.form_wrapper} ${styles.search} ${basicStyles.flexColumn}`}
    >
      <h3>Wyszukaj</h3>
      <form className={`${basicStyles.flexColumn} ${styles.search}`}>
        <label>
          Miejsce wynajmu:
          <select
            name="location"
            onChange={handleChange}
            value={filters.location || ""}
          >
            <option value="">Wszystkie</option>
            {locations.map((location, index) => (
              <option key={index} value={location.location_name}>
                {location.location_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Marka:
          <select
            name="brand"
            onChange={handleChange}
            value={filters.brand || ""}
          >
            <option value="">Wszystkie</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand.brand_name}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Liczba miejsc:
          <select
            name="seats"
            onChange={handleChange}
            value={filters.seats || ""}
          >
            <option value="">Dowolne</option>
            <option value="4">4 miejsca</option>
            <option value="5">5 miejsc</option>
            <option value="7">7 miejsc</option>
          </select>
        </label>

        <div className={styles.price_range}>
          <label>
            Cena min:
            <input
              type="number"
              name="minPrice"
              min="0"
              max="500"
              onChange={handleChange}
              value={filters.minPrice || ""}
            />
          </label>
          <label>
            Cena max:
            <input
              type="number"
              name="maxPrice"
              min="0"
              max="500"
              onChange={handleChange}
              value={filters.maxPrice || ""}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
