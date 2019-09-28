import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import { ROUTES } from '../../../constants';
import SIGNUP_BG from '../../../resources/images/bg_signup.jpg';
import { IAppState } from '../../../store';
import {AuthActions, logoutAction, signinAction, authResetAction} from '../../../store/auth';
import ArrowBackWrapper from '../../ui-blocks/ArrowBackWrapper';
import SignInForm from './SignInForm';
import {IError} from "../../../types/IBaseEntities";

interface IStateMap {
  showFormLoader: boolean;
  formErrors: Maybe<IError>;
}

interface IDispatchMap {
  signin: typeof signinAction;
  resetStore: typeof logoutAction;
  authReset: typeof authResetAction;
}

type ISignInContainerProps = IStateMap & IDispatchMap;

class SignIn extends Component<ISignInContainerProps> {
  public componentDidMount(): void {
    this.props.resetStore();
    this.props.authReset();
  }

  render() {
    return (
      <ArrowBackWrapper backgroundImage={SIGNUP_BG} arrow navLink={ROUTES.SPLASH}>
        <SignInForm
          onSubmit={this.props.signin}
          formErrors={this.props.formErrors || void(0)}
          showFormLoader={this.props.showFormLoader}
        />
      </ArrowBackWrapper>
    );
  }
}

const mapStateToProps = ({ common: {loading, error} }: IAppState) => ({
  showFormLoader: !!loading[AuthActions.SIGNIN],
  formErrors: error[AuthActions.SIGNIN],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      signin: signinAction,
      resetStore: logoutAction,
      authReset: authResetAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
