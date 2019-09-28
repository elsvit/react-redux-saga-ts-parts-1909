import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Header from '../../../components/ui-blocks/Header';
import { ROUTES } from '../../../constants';
import SIGNUP_BG from '../../../resources/images/bg_signup.jpg';
import { IAppState } from '../../../store';
import ArrowBackWrapper from '../../ui-blocks/ArrowBackWrapper';
import AppraiseView from './AppraiseView';

interface IStateMap {}

interface IDispatchMap {}

type IAppriseProps = IStateMap & IDispatchMap;

class Appraise extends Component<IAppriseProps> {
  render() {
    return (
      <div className="global-wrapper arrow-below-header">
        <Header />
        <ArrowBackWrapper
          backgroundImage={SIGNUP_BG}
          arrow
          navLink={ROUTES.PRIVATE_PROFILE}
          className={'apprise-page'}
        >
          <AppraiseView />
        </ArrowBackWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appraise);
