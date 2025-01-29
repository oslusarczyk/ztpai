import React, { useEffect, useState } from "react";
import basicStyles from "../../styles/basic_styling.module.css";
import styles from "../../styles/main.module.css";
import { getBrands, getLocations } from "../../utils/network/utils";
import { Locations } from "../../utils/types";

export interface FilterParams {
  location?: string;
  brand?: string;
  seats?: string;
  price_min?: string;
  price_max?: string;
}

type Brands = {
  brand_id: string;
  brand_name: string;
};

interface Props {
  onFilterChange: (filters: FilterParams) => void;
}

const SearchForm: React.FC<Props> = ({ onFilterChange }) => {
  const [locations, setLocations] = useState<Locations[]>();
  const [brands, setBrands] = useState<Brands[]>();
  const [filters, setFilters] = useState<FilterParams>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

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
        const brands = await getBrands();
        setBrands(brands);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div
      className={`${styles.form_wrapper} ${styles.search} ${basicStyles.flexColumn}`}
    >
      <h3>Wyszukaj</h3>
      <form className={`${basicStyles.flexColumn} ${styles.search}`}>
        <label>
          Miejsce wynajmu:
          <select name="location" onChange={handleChange}>
            <option value="">Wszystkie</option>
            {locations &&
              locations.map((location, index) => (
                <option key={index} value={location.location_name}>
                  {location.location_name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Marka:
          <select name="brand" onChange={handleChange}>
            <option value="">Wszystkie</option>
            {brands &&
              brands.map((brand, index) => (
                <option key={index} value={brand.brand_name}>
                  {brand.brand_name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Liczba miejsc:
          <select name="seats" onChange={handleChange}>
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
              name="price_min"
              min="0"
              max="500"
              onChange={handleChange}
            />
          </label>
          <label>
            Cena max:
            <input
              type="number"
              name="price_max"
              min="0"
              max="500"
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
