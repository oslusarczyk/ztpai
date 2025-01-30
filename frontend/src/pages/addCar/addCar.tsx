import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/car_admin.module.css";
import basicStyles from "../../styles/basic_styling.module.css";
import { addCar } from "../../utils/network/cars";
import { Locations, Brands } from "../../utils/types";
import { getLocations, getBrands } from "../../utils/network/utils";
import { toast } from "react-toastify";

const CarAdmin: React.FC = () => {
  const [brands, setBrands] = useState<Brands[]>([]);
  const [locations, setLocations] = useState<Locations[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.carPhoto) newErrors.carPhoto = "Zdjęcie jest wymagane.";
    if (!form.brand) newErrors.brand = "Marka jest wymagana.";
    if (!form.model.trim()) newErrors.model = "Model jest wymagany.";
    if (!form.price.trim()) newErrors.price = "Cena jest wymagana.";
    if (!form.productionYear.trim())
      newErrors.productionYear = "Rok produkcji jest wymagany.";
    if (!form.description.trim())
      newErrors.description = "Opis samochodu jest wymagany.";
    if (form.locations.length === 0)
      newErrors.locations = "Wybierz co najmniej jedną lokalizację.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Jeśli nie ma błędów, zwróć true
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Czyszczenie błędu po poprawnym wpisaniu wartości
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        carPhoto: e.target.files?.[0] || null,
      }));
      setErrors((prev) => ({ ...prev, carPhoto: "" }));
    }
  };

  const handleCheckboxChange = (locationId: string) => {
    setForm((prev) => {
      const updatedLocations = prev.locations.includes(locationId)
        ? prev.locations.filter((id) => id !== locationId)
        : [...prev.locations, locationId];

      return { ...prev, locations: updatedLocations };
    });

    setErrors((prev) => ({ ...prev, locations: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Uzupełnij wszystkie wymagane pola.");
      return;
    }

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

    try {
      await addCar(formData);
      toast.success("Samochód został poprawnie dodany.");

      setForm({
        carPhoto: null,
        brand: "",
        model: "",
        price: "",
        seats: "4",
        productionYear: "",
        description: "",
        locations: [],
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Wystąpił błąd przy dodawaniu auta.");
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
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {errors.carPhoto && (
                <span className={styles.error}>{errors.carPhoto}</span>
              )}
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
              {errors.brand && (
                <span className={styles.error}>{errors.brand}</span>
              )}
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
              {errors.model && (
                <span className={styles.error}>{errors.model}</span>
              )}
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
              {errors.price && (
                <span className={styles.error}>{errors.price}</span>
              )}
            </label>

            <label htmlFor="production_year">
              Rok produkcji
              <input
                type="number"
                name="productionYear"
                placeholder="2020"
                id="production_year"
                min="1900"
                max="2024"
                value={form.productionYear}
                onChange={handleChange}
              />
              {errors.productionYear && (
                <span className={styles.error}>{errors.productionYear}</span>
              )}
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
              {errors.locations && (
                <span className={styles.error}>{errors.locations}</span>
              )}
            </div>

            <label htmlFor="car_description">
              Opis samochodu
              <textarea
                name="description"
                id="car_description"
                rows={7}
                placeholder="Napisz tutaj opis samochodu"
                value={form.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <span className={styles.error}>{errors.description}</span>
              )}
            </label>

            <button type="submit">Dodaj samochód</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarAdmin;
