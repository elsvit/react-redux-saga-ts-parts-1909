import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../../constants';
import { ReactComponent as HandWithMoneyIcon } from '../../../resources/icons/hand_with_money.svg';
import { ReactComponent as ExpertAppraisalIcon } from '../../../resources/icons/expert_appraisal.svg';

import './appraise.scss';

const AppriseView = () => {
  return (
    <div className="apprise-container">
      <div className="apprise-container__column">
        <div className="block-top">
          <div className="orange-title">What is you watch worth?</div>
          <p>Have it appraised now and sell it for the best price possible.</p>
        </div>
        <div className="block-bottom">
          <p className="margin-top-48 fee">
            <span>100% Free</span><span className="margin-left-16"><HandWithMoneyIcon /></span>
          </p>
          <p className="margin-top-8">Find out the value of your watch for free online.
            Simply enter the model, condition and
            then submit</p>
          <NavLink to={ROUTES.MY_COLLECTION_APPRAISE} className="btn btn--bg-white">
            SELECT FROM COLLECTION
          </NavLink>
        </div>
      </div>
      <div className="apprise-container__column">
        <div className="block-top sm-hide" />
        <div className="block-bottom">
          <p className="margin-top-48 expert">
            <span>Expert Appraisal</span><span className="margin-left-16"><ExpertAppraisalIcon /></span>
          </p>
          <p className="margin-top-8">AWX is uniquely qualified to appraise your watch.
            Our expert specialists will estimate your item.</p>
          <NavLink to={ROUTES.APPRAISE_NEW_TIMEPIECE} className="btn btn--bg-white">
            APPRAISE NEW TIMEPIECE
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AppriseView;
