export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
  active: boolean;
}

export interface Store {
  id: string;
  name: string;
  activated: boolean;
  userId: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  storeId: string;
  size: Size;
  color: Color;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface User {
  email: string;
  name: string;
  image: string;
  createdAt: any;
  accounts: any;
  password: string;
  cupons: Cupon[];
}

export interface Cupon {
  id: string;
  name: string;
  value: string;
  storeId: string;
  activated: boolean;
  code: string;
  expiresAt: any;
}
