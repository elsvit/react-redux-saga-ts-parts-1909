import {put} from 'redux-saga/effects';

import toast from './toast';
import {IErrorResponse} from "../types/IBaseEntities";
import {ActionApiT, setError} from "../store/common";
import {ErrorName} from "../constants/errorMsg";
import {logoutAction} from "../store/auth";
import {Messages} from "../constants/messages";


export function* errorHandler(actionType: ActionApiT, error: IErrorResponse) {
  if (!error.payload || !error.payload.message || !error.payload.name || !(Object.values(ErrorName).includes(error.payload.name))) {
    toast.error(Messages.UNDEFINED_ERROR);
    return;
  }
  if (error.payload.name !== ErrorName.ValidationError) {
    if (Messages[error.payload.message]) {
      toast.error(Messages[error.payload.message]);
    } else {
      toast.error(Messages.UNDEFINED_ERROR);
    }
  }
  if (error.payload.name === ErrorName.AuthError) {
    yield put(logoutAction());
    return;
  }
  yield put(setError({actionType, error: error.payload}));
}
