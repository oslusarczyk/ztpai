import React, { useEffect, useState } from "react";
import styles from "../../styles/car_admin.module.css";
import basicStyles from "../../styles/basic_styling.module.css";
import { addCar } from "../../utils/network/cars";
import { Locations, Brands } from "../../utils/types";
import { getLocations, getBrands } from "../../utils/network/utils";

const CarAdmin: React.FC = () => {
  const [brands, setBrands] = useState<Brands[]>([]);
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
        const brands = await getBrands();
        setBrands(brands);
        if (brands.length > 0) {
          setForm((prev) => ({ ...prev, brand: brands[0].brand_id }));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const [form, setForm] = useState({
    carPhoto: null as File | null,
    brand: "",
    model: "",
    price: "",
    seats: "4",
    productionYear: "",
    description: "",
    locations: [] as string[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log(form);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        carPhoto: e.target.files?.[0] || null,
      }));
    }
  };

  const handleCheckboxChange = (locationId: string) => {
    setForm((prev) => ({
      ...prev,
      locations: prev.locations.includes(locationId)
        ? prev.locations.filter((id) => id !== locationId)
        : [...prev.locations, locationId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (form.carPhoto) {
      formData.append("car_photo", form.carPhoto);
    }
    formData.append("brand_id", form.brand);
    formData.append("model", form.model);
    formData.append("price_per_day", form.price);
    formData.append("seats_available", form.seats);
    formData.append("production_year", form.productionYear);
    formData.append("car_description", form.description);
    formData.append("locations", JSON.stringify(form.locations));
    console.log("Form data submitted:", formData);

    try {
      const response = await addCar(formData);
      console.log("Samochód dodany:", response);
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  return (
    <div className={basicStyles.wrapper}>
      <div className={`${basicStyles.wrapper_main} ${basicStyles.flexColumn}`}>
        <h2>Dodaj auto</h2>
        <div className={styles.form_wrapper}>
          <form className={basicStyles.flexColumn} onSubmit={handleSubmit}>
            <label htmlFor="car_photo">
              Zdjęcie
              <input
                type="file"
                name="carPhoto"
                id="car_photo"
                onChange={handleFileChange}
              />
            </label>

            <label htmlFor="brand_select">
              Marka
              <select
                name="brand"
                id="brand_select"
                value={form.brand}
                onChange={handleChange}
              >
                {brands.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="model_select">
              Model
              <input
                type="text"
                name="model"
                id="model_select"
                placeholder="Model samochodu"
                value={form.model}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="price_input">
              Cena
              <input
                type="number"
                name="price"
                id="price_input"
                value={form.price}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="seats_select">
              Liczba miejsc
              <select
                name="seats"
                id="seats_select"
                value={form.seats}
                onChange={handleChange}
              >
                <option value="4">4 miejsc</option>
                <option value="5">5 miejsc</option>
                <option value="7">7 miejsc</option>
              </select>
            </label>

            <label htmlFor="production_year">
              Rok produkcji
              <input
                type="number"
                name="productionYear"
                id="production_year"
                placeholder="Rok produkcji"
                min="1900"
                max="2024"
                value={form.productionYear}
                onChange={handleChange}
              />
            </label>

            <div className={styles.checkbox}>
              <span>Dostępne lokalizacje</span>
              <div className={styles.checkbox_wrapper}>
                {locations.map((location) => (
                  <label
                    key={location.location_id}
                    htmlFor={location.location_id.toString()}
                  >
                    {location.location_name}
                    <input
                      type="checkbox"
                      name="locations"
                      id={location.location_id.toString()}
                      value={location.location_id}
                      checked={form.locations.includes(
                        location.location_id.toString()
                      )}
                      onChange={() =>
                        handleCheckboxChange(location.location_id.toString())
                      }
                    />
                  </label>
                ))}
              </div>
            </div>

            <label htmlFor="car_description">
              Opis samochodu
              <textarea
                name="description"
                id="car_description"
                rows={7}
                placeholder="Dodaj opis samochodu"
                value={form.description}
                onChange={handleChange}
              ></textarea>
            </label>

            <button type="submit">Dodaj samochód</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarAdmin;
