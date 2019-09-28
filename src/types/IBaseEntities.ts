import {ErrorMsg, ErrorName} from "../constants/errorMsg";

export interface ILoadableBooleanDict { [actionType: string]: Maybe<boolean> }
export interface ILoadableStringDict { [actionType: string]: Maybe<string> }
export interface IStringObj { [key: string]: string }

export interface IId {
  id: number
}

export interface IIdName extends IId {
  name: string;
}

export interface IIdImg extends IId {
  image: string;
}

export interface IIdQuantity extends IId {
  quantity: number;
}

export interface IIdSwitch extends IId {
  switch: boolean;
}

export interface IResponse {
  success: boolean
}

export interface IGetResponse<P> extends IResponse {
  payload: P;
}

export interface IError {
  name: ErrorName,
  message: any,
  data?: any,
  validationErrors?: any;
}

export interface IValidationError extends IError {
  name: ErrorName.ValidationError,
  message: {
    [idx: string]: ErrorMsg,
  },
}

export interface IAPIError extends IError {
  name: ErrorName.APIError,
  message: ErrorMsg,
}

export interface IAuthError extends IError {
  name: ErrorName.AuthError,
  message: ErrorMsg,
}

export interface INotFoundError extends IError {
  name: ErrorName.NotFoundError,
  message: ErrorMsg,
}

export interface IErrorResponse extends IResponse {
  payload: IAPIError | IValidationError | IAuthError | INotFoundError,
}

export interface ILabelValue<V> {
  label: string;
  value: V
}

export interface IListRequest {
  page: number;
  perPage: number;
  search?: string;
}

export interface IArrayResponsePayload<T> {
  rows: T[]
}

export interface IListResponsePayload<D> {
  total: number;
  rows: D[]
}

export interface IListResponse<D> extends IResponse {
  payload: IListResponsePayload<D>;
}

export interface ICheckbox extends IIdName{
  checked: boolean;
}

export interface IIdStorageUrl extends IId {
  storageUrl: string;
}

export interface IImgUrls {
  cropUrl: string;
  storageUrl: string;
}

export interface IIdImgUrls extends IId, IImgUrls {
}

export interface IFeBe<FE, BE> {
  fe: FE,
  be: BE,
}
