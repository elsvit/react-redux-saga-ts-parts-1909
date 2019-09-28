import BaseApi from './BaseApi';
import AuthApi from './AuthApi';
import UserApi from './UserApi';
import ListsApi from './ListsApi';
import WatchesApi from './WatchesApi';
import ShopApi from './ShopApi';
import MarketApi from './MarketApi';
import OrderApi from './OrderApi';
import CartApi from './CartApi';
import WishlistApi from './WishlistApi';
import EventsApi from './EventsApi';

export interface IApiServices {
  baseApi: BaseApi,
  authApi: AuthApi,
  userApi: UserApi,
  listsApi: ListsApi,
  watchesApi: WatchesApi,
  shopApi: ShopApi,
  marketApi: MarketApi,
  orderApi: OrderApi,
  cartApi: CartApi,
  wishlistApi: WishlistApi,
  eventsApi: EventsApi,
}

export function initApiServices(): IApiServices {
  const baseApi = new BaseApi();
  const authApi = new AuthApi(baseApi);
  const userApi = new UserApi(baseApi);
  const listsApi = new ListsApi(baseApi);
  const watchesApi = new WatchesApi(baseApi);
  const shopApi = new ShopApi(baseApi);
  const marketApi = new MarketApi(baseApi);
  const orderApi = new OrderApi(baseApi);
  const cartApi = new CartApi(baseApi);
  const wishlistApi = new WishlistApi(baseApi);
  const eventsApi = new EventsApi(baseApi);

  return {
    baseApi,
    authApi,
    userApi,
    listsApi,
    watchesApi,
    shopApi,
    marketApi,
    orderApi,
    cartApi,
    wishlistApi,
    eventsApi,
  };
}