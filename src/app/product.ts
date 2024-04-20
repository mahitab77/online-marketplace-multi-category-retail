export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  // Add the rating property
  rating: {
    rate: number;
    count: number;
  };
  isHot?: boolean;
  isNew?: boolean;
  oldPrice?: number;
  hasDiscount: boolean
}

