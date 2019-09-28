import { Reducer } from 'redux';

import { LIST_DEFAULT } from '../../constants';
import { IId, IListResponsePayload } from '../../types/IBaseEntities';
import { IShop, IShopBookRequest, IShopListRequest, IPartnerShop } from '../../types/IShops';

// Actions
export enum ShopsActions {
  GET_SHOPS = 'shops/GET_SHOPS',
  SET_SHOPS = 'shops/SET_SHOPS',
  GET_SHOP_BY_ID = 'shops/GET_SHOP_BY_ID',
  SET_SHOP_BY_ID = 'shops/SET_SHOP_BY_ID',
  SHOP_BOOK = 'shops/SHOP_BOOK',
  SHOP_BOOK_SUCCESS = 'shops/SHOP_BOOK_SUCCESS',
  CANCEL_BOOK = 'shops/CANCEL_BOOK',
  CANCEL_BOOK_SUCCESS = 'shops/CANCEL_BOOK_SUCCESS',
  SHOPS_RESET = 'shops/RESET',
}

export type ShopsLoadableT =
  | typeof ShopsActions.SHOP_BOOK
  | typeof ShopsActions.GET_SHOPS
  | typeof ShopsActions.GET_SHOP_BY_ID
  | typeof ShopsActions.CANCEL_BOOK;

export interface IShopBookAction {
  type: typeof ShopsActions.SHOP_BOOK;
  payload: IShopBookRequest;
}

export interface IShopBookSuccessAction {
  type: typeof ShopsActions.SHOP_BOOK_SUCCESS;
}

export interface ICancelBookAction {
  type: typeof ShopsActions.CANCEL_BOOK;
  payload: IId;
}

export interface ICancelBookSuccessAction {
  type: typeof ShopsActions.CANCEL_BOOK_SUCCESS;
  payload: IId;
}

export interface IGetShopsAction {
  type: typeof ShopsActions.GET_SHOPS;
  payload: IShopListRequest;
}

export interface ISetShopsAction {
  type: typeof ShopsActions.SET_SHOPS;
  payload: IListResponsePayload<IShop>;
}

export interface IGetShopByIdAction {
  type: typeof ShopsActions.GET_SHOP_BY_ID;
  payload: IId;
}

export interface ISetShopByIdAction {
  type: typeof ShopsActions.SET_SHOP_BY_ID;
  payload: IPartnerShop;
}

export interface IResetShopsAction {
  type: typeof ShopsActions.SHOPS_RESET;
}

type ShopsActionsT =
  | IShopBookAction
  | IShopBookSuccessAction
  | ICancelBookAction
  | ICancelBookSuccessAction
  | IGetShopsAction
  | IGetShopByIdAction
  | ISetShopByIdAction
  | ISetShopsAction
  | IResetShopsAction;

export const shopBookAction = (payload: IShopBookRequest): IShopBookAction => ({
  type: ShopsActions.SHOP_BOOK,
  payload,
});

export const shopBookSuccessAction = (): IShopBookSuccessAction => ({
  type: ShopsActions.SHOP_BOOK_SUCCESS,
});

export const cancelBookAction = (payload: IId): ICancelBookAction => ({
  type: ShopsActions.CANCEL_BOOK,
  payload,
});

export const cancelBookSuccessAction = (payload: IId): ICancelBookSuccessAction => ({
  type: ShopsActions.CANCEL_BOOK_SUCCESS,
  payload,
});

export const getShopByIdAction = (payload: IId): IGetShopByIdAction => ({
  type: ShopsActions.GET_SHOP_BY_ID,
  payload,
});

export const setShopByIdAction = (payload: IPartnerShop): ISetShopByIdAction => ({
  type: ShopsActions.SET_SHOP_BY_ID,
  payload,
});

export const getShopsAction = (payload: IShopListRequest): IGetShopsAction => ({
  type: ShopsActions.GET_SHOPS,
  payload,
});

export const setShopsAction = (payload: IListResponsePayload<IShop>): ISetShopsAction => ({
  type: ShopsActions.SET_SHOPS,
  payload,
});

export const resetShopsAction = (): IResetShopsAction => ({
  type: ShopsActions.SHOPS_RESET,
});

//Reducer
interface IShopsState {
  partnerShop: Maybe<IPartnerShop>;
  shops: IListResponsePayload<IShop>;
}

export type ShopsStateT = Readonly<IShopsState>;

const initialState: IShopsState = {
  partnerShop: null,
  shops: LIST_DEFAULT,
};

const reducer: Reducer<ShopsStateT> = (
  state: IShopsState = initialState,
  action: ShopsActionsT,
) => {
  switch (action.type) {
    case ShopsActions.SET_SHOPS:
      return {
        ...state,
        shops: {
          ...action.payload,
        },
      };

    case ShopsActions.SET_SHOP_BY_ID:
      return {
        ...state,
        partnerShop: action.payload,
      };

    case ShopsActions.SHOPS_RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
