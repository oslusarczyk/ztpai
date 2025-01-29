export interface Reservation {
  reservation_id: string;
  user_id: string;
  car_id: string;
  location_id: string;
  reservation_start_date: string;
  reservation_end_date: string;
  reservation_price: number;
  reservation_status: string;
  car: {
    car_id: string;
    brand_id: string;
    model: string;
    price_per_day: number;
    seats_available: number;
    photo: string;
    production_year: number;
    car_description: string;
    brand: {
      brand_id: string;
      brand_name: string;
    };
  };
  location: {
    location_id: string;
    location_name: string;
  };
  user: {
    email: string;
  };
}

export interface Locations {
  location_id: number;
  location_name: string;
}

export interface Car {
  car_id: number;
  brand: string;
  model: string;
  photo: string;
  location: string[];
  seats_available: number;
  price_per_day: number;
}

export interface Brands {
  brand_id: number;
  brand_name: string;
}
