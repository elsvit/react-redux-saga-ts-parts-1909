import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { initApiServices } from '../services/api';
import auth, { AuthStateT } from './auth';
import common, { CommonStateT } from './common';
import lists, { ListsStateT } from './lists';
import sagas from './sagas';
import shops, { ShopsStateT } from './shops';
import user, { UserStateT } from './user';
import watches, { WatchesStateT } from './watches';
import market, { MarketStateT } from './market';
import orders, {OrderStateT} from './orders';
import cart, {CartStateT} from './cart';
import pages, { PagesStateT } from './pages';
import wishlist, {WishlistStateT} from './wishlist';
import events, {EventsStateT} from './events';

export interface IAppState {
  auth: AuthStateT;
  common: CommonStateT;
  lists: ListsStateT;
  shops: ShopsStateT;
  user: UserStateT;
  watches: WatchesStateT;
  pages: PagesStateT;
  market: MarketStateT;
  orders: OrderStateT;
  cart: CartStateT;
  wishlist: WishlistStateT;
  events: EventsStateT;
}

export const api = initApiServices();

const envPublicUrl = process.env.PUBLIC_URL || '';
const basename = envPublicUrl.endsWith('/') ? envPublicUrl : `${envPublicUrl}/`;
const history = createBrowserHistory({ basename }) as History;

const reducers = combineReducers<IAppState & { router: RouterState }>({
  auth,
  common,
  lists,
  shops,
  user,
  watches,
  pages,
  market,
  orders,
  cart,
  wishlist,
  events,
  router: connectRouter(history),
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagas.forEach((saga: any) => sagaMiddleware.run(saga));

export { store, history };
