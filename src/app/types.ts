export interface Product {
    id: string; // ✅ Sanity CMS _id is always a string
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  