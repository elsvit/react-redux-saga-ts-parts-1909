import auth from './auth/saga';
import lists from './lists/saga';
import shops from './shops/saga';
import user from './user/saga';
import watches from './watches/saga';
import market from './market/saga';
import orders from './orders/saga';
import cart from './cart/saga';
import wishlist from './wishlist/saga';
import events from './events/saga';

export default [
  auth,
  lists,
  shops,
  user,
  watches,
  market,
  orders,
  cart,
  wishlist,
  events,
];
