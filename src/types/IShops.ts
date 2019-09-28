import { IId, IIdName, IListRequest } from './IBaseEntities';
import { ICountry, ICity } from './ILists';

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IShop extends IIdName {
  street: string;
  building: string;
  poBox: string;
  appriseFee: number;
  country: ICountry;
  city: ICity;
  booksCount?: number;
  lat: number;
  lng: number;
}

export interface IPartner extends IId {
  fullName: string;
  email: string;
}

export interface IShopListRequest extends IListRequest {
  city: number; // city id
  country: number; // country id
}

export interface IShopBookRequest {
  shopId: number;
  watchId: number;
  date: string;
}

export interface IPartnerShop extends IShop, IPartner {}