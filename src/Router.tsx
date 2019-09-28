/**
 * @fileOverview Routers
 */

// !!! part of code

import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import {connect} from 'react-redux';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import CreateAccountPage from './components/pages/Account/CreateAccount';
import EditAccountPage from './components/pages/Account/EditAccount';
import AddWatchPage from './components/pages/AddWatch';
import AppraisePage from './components/pages/Appraise';
import AppraiseNewTimepiecePage from './components/pages/AppraiseTimepiece/AppraiseNewTimepiece';
import AppraiseYourTimepiecePage from './components/pages/AppraiseTimepiece/AppraiseYourTimepiece';
import ChangePasswordByTokenPage from './components/pages/ChangePasswordByToken';
import UpdatePasswordInProfilePage from './components/pages/UpdatePasswordInProfile';
import CollectionPage, {
  CollectionAppraise,
  CollectionConsign,
  CollectionMostExpensive,
} from './components/pages/Collection';
import ConnectPage from './components/pages/Connect';
import DiscoverCollectorsPage from './components/pages/DiscoverCollectors';
import TopCollectorsPage from './components/pages/TopCollectors';
import EventsPage from './components/pages/Events';
import EventItemPage from './components/pages/EventItem';
import {FollowersPage, FollowingPage} from './components/pages/Follow';
import {FollowersListPage, FollowingListPage} from './components/pages/FollowList';
import ForgotPasswordPage from './components/pages/ForgotPassword';
import HomePage from './components/pages/Home';
import FAQ from './components/pages/FAQ';
import MarketPage from './components/pages/Market';
import MyAppraisalsPage from './components/pages/MyAppraisals';
import { MyAppraisalsFirstList, MyAppraisalsSecondList } from './components/pages/MyAppraisalsList';
import PhysicalBookingPage from './components/pages/PhysicalBooking';
import PrivateProfilePage from './components/pages/PrivateProfile';
import PublicProfilePage from './components/pages/PublicProfile';
import SignInPage from './components/pages/SignIn';
import SignUpPage from './components/pages/SignUp';
import SplashPage from './components/pages/Splash';

import {UserPending, UserRejected} from './components/pages/UserStatus';
import WishListPage from './components/pages/WishList';
import ConfirmModal from './components/ui-blocks/ConfirmModal';
import AuthRoute from './components/ui-kit/AuthRoute';
import { ROUTES } from './constants';
import {IAppState} from './store';
import {IConfirmModal} from './types/IPages';

interface IOwnProps extends RouteProps {
  history: History;
}

interface IStateMaps {
  confirmModal: Maybe<IConfirmModal>;
}

type IRouterProps = IOwnProps & IStateMaps;

class Router extends React.Component<IRouterProps> {
  public render() {
    const {history, confirmModal} = this.props;
    return (
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route exact path={ROUTES.SIGNIN} component={SignInPage}/>
            <Route exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordPage}/>
            <AuthRoute exact path={ROUTES.APPRAISE} component={AppraisePage}/>
            <AuthRoute exact path={ROUTES.CREATE_ACCOUNT} component={CreateAccountPage}/>
            <AuthRoute exact path={ROUTES.EDIT_ACCOUNT} component={EditAccountPage}/>
            <AuthRoute exact path={ROUTES.MARKET} component={MarketPage}/>
            <AuthRoute exact path={`${ROUTES.FOLLOWING_LIST}/:id`} component={FollowingListPage}/>
            <AuthRoute exact path={`${ROUTES.FOLLOWERS_LIST}/:id`} component={FollowersListPage}/>
            <Route exact path={ROUTES.SPLASH} component={SplashPage}/>
            <Redirect to={ROUTES.SPLASH}/>
          </Switch>
          {confirmModal && <ConfirmModal/>}
        </>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = ({pages: {confirmModal}}: IAppState) => ({
  confirmModal,
});

export default connect(mapStateToProps)(Router);
