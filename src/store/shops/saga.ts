import { push } from 'connected-react-router';
import { put, takeEvery } from 'redux-saga/effects';
import toast from '../../services/toast';

import { ROUTES } from '../../constants';
import { IGetResponse, IListResponse } from '../../types/IBaseEntities';
import { IPartnerShop, IShop } from '../../types/IShops';
import { setLoaded, setLoading } from '../common';
import { api } from '../store';
import {
  setShopsAction,
  IGetShopsAction,
  ISetShopByIdAction,
  IShopBookAction,
  setShopByIdAction,
  shopBookSuccessAction,
  ShopsActions,
  ICancelBookAction,
  cancelBookSuccessAction,
} from './shops';
import {setCancelBookedAction} from '../watches';
import {errorHandler} from "../../services/errorHandler";

export function* sagaGetShops({ payload }: IGetShopsAction) {
  const actionType = ShopsActions.GET_SHOPS;
  try {
    yield put(setLoading({actionType}));
    const res: IListResponse<IShop> = yield api.shopApi.getShopList(payload);
    yield put(setShopsAction(res.payload));
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield errorHandler(actionType, error);
  }
}

export function* sagaGetShopById({ payload }: ISetShopByIdAction) {
  const actionType = ShopsActions.GET_SHOP_BY_ID;
  try {
    yield put(setLoading({actionType}));
    const res: IGetResponse<IPartnerShop> = yield api.shopApi.getShopById(payload);
    yield put(setShopByIdAction(res.payload));
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield errorHandler(actionType, error);
  }
}

export function* sagaShopBook({ payload }: IShopBookAction) {
  const actionType = ShopsActions.SHOP_BOOK;
  try {
    yield put(setLoading({actionType}));
    yield api.shopApi.shopBook(payload);
    yield put(shopBookSuccessAction());
    toast.info('Shop booked successfully');
    yield put(push(ROUTES.PRIVATE_PROFILE));
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield errorHandler(actionType, error);
  }
}

export function* sagaCancelBook({payload}: ICancelBookAction) {
  const actionType = ShopsActions.CANCEL_BOOK;
  yield put(setLoading({actionType}));
  try {
    yield api.shopApi.cancelBook(payload);
    yield put(cancelBookSuccessAction(payload));
    yield put(setCancelBookedAction(payload));
    yield put(setLoaded({actionType}));
  } catch (error) {
    yield errorHandler(actionType, error);
  }
}

export default function*(): Generator {
  yield takeEvery(ShopsActions.GET_SHOPS, sagaGetShops);
  yield takeEvery(ShopsActions.GET_SHOP_BY_ID, sagaGetShopById);
  yield takeEvery(ShopsActions.SHOP_BOOK, sagaShopBook);
  yield takeEvery(ShopsActions.CANCEL_BOOK, sagaCancelBook);
}
