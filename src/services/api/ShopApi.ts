import { IId } from '../../types/IBaseEntities';
import { IShopListRequest, IShopBookRequest } from '../../types/IShops';
import BaseApi from './BaseApi';

export default class ShopApi {
  constructor(baseApi: BaseApi) {
    this.baseApi = baseApi;
  }

  public baseApi: BaseApi;

  public getShopList = (value: IShopListRequest) => this.baseApi.get('shop', value);

  public getShopById = ({ id }: IId) => this.baseApi.get(`shop/${id}`, null);

  public shopBook = (value: IShopBookRequest) => this.baseApi.post('shop/book', value);

  public cancelBook = (value: IId) => this.baseApi.delete('shop/book', value);
}
