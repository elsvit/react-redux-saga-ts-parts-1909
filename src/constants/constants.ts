// !!! part of code
import { IFeBe } from '../types/IBaseEntities';
import { WatchConditionOnBE, WatchConditionOnFE } from '../types/IWatches';
import { IMarketFilterPriceRequest } from '../types/IMarket';

export const TOAST_DURATION = 5000;
export const DEFAULT_PER_PAGE = 50;
export const DEFAULT_PER_SELECT = 25;
export const WATCHES_ON_PROFILE_PAGE = 6;
export const WATCHES_ON_COLLECTION_PAGE = 12;
export const WATCHES_ON_MARKET_PAGE = 12;
export const WATCHES_ON_WISHLIST_PAGE = 12;
export const FOLLOWERS_ON_FOLLOW_PAGE = 10;
export const FOLLOWERS_ON_FOLLOW_LIST_PAGE = 25;
export const ORDERS_ON_MODAL = 5;

export const DEFAULT_RADIO_GROUP_ITEMS = 16;
export const DEFAULT_RADIOGROUP_MAX_ITEMS = 15;

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 50;

export const HOME_NOTIFICATIONS_PERIOD = 60000;

export const MAX_AVATAR_SIZE = 10000000;

export const LIST_REQUEST_DEFAULT = {
  page: 1,
  perPage: DEFAULT_PER_PAGE,
  search: '',
};
export const SIMPLE_LIST_DEFAULT = {
  rows: [],
  total: 0,
};
export const LIST_DEFAULT = {
  ...LIST_REQUEST_DEFAULT,
  ...SIMPLE_LIST_DEFAULT,
};
