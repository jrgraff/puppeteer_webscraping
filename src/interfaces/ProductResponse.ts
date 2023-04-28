interface Spec {
  price: number;
  storage: string;
  availability: boolean;
}

export interface ProductResponse {
  name: string;
  specs: Spec[];
  reviews: number;
  rating: number;
  description: string;
}
