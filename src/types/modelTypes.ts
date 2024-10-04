export interface ICategory {
  EquipmentName: string;
  Category: string;
  url: string;
  Ratings: string;
  slug: string;
}

export interface IUser {
  name: string;
  role: 'user'|'provider';
  email: string;
  delete: true | false;
}

export interface IProduct {
  EquipmentName: string;
  Category: string;
  Description: string;
  Brand: string;
  Price: string;
  Location: string;
  Availability: string;
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
