export interface ICategory {
  EquipmentName: string;
  Category: string;
  url: string;
  Ratings: string;
  slug: string;
}

export interface IUser {
  name: string;
  role: "user" | "provider";
  email: string;
  delete: true | false;
}

export interface IProduct {
  _id?: string;
  EquipmentName: string;
  Category: string;
  Description: string;
  Brand: string;
  Price: string;
  Location: string;
  Available: boolean;
  Condition: string;
  Specifications: {
    Power: string;
    FuelType: string;
  };
  Accessories: string;
  RentalTerms: string;
  Videos: string[];
  Ratings: string;
  DeliveryOptions: string;
  Insurance: string;
  Service: string;
  UsageInstructions: string;
  ContactInformation: string;
  url: string;
  slug: string;
  provider: string;
}

export interface CartProducts {
  productId: string;
  quantity: number;
}

export interface ICart {
  userId: string;
  products: CartProducts[];
}

export interface IRequest {
  _id?: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  providerId: string;
  requestAccepted: boolean;
  productId: string;
  productSlug: string;
}
