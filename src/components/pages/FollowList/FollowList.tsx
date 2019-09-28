import { RouteComponentProps, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import {
  getFollowersAction,
  getFollowingAction,
  UserActions,
  switchShowFollowersAction,
  switchShowFollowingAction,
} from '../../../store/user';
import FollowListView from './FollowListView';
import {FOLLOWERS_ON_FOLLOW_PAGE} from '../../../constants';
import SIGNUP_BG from '../../../resources/images/bg_signup.jpg';
import ArrowBackWrapper from '../../ui-blocks/ArrowBackWrapper';
import Header from '../../ui-blocks/Header';
import Preloader from '../../ui-kit/Preloader';
import { FollowType } from '../Follow';
import { IListResponsePayload } from '../../../types/IBaseEntities';
import { followByUserAction } from '../../../store/user';
import { IAppState } from '../../../store';
import { IFollower } from '../../../types/IUser';

import './followList.scss';

interface IOwnProps {
  followType: FollowType;
}

interface IStateMap {
  loading: IBoolDict;
  loaded: IBoolDict;
  userId: Maybe<number>;
  following: IListResponsePayload<IFollower>;
  followers: IListResponsePayload<IFollower>;
  displayFollowers: boolean;
  displayFollowing: boolean;
}

interface IDispatchMap {
  getFollowing: typeof getFollowingAction;
  getFollowers: typeof getFollowersAction;
  followByUser: typeof followByUserAction;
  switchShowFollowers: typeof switchShowFollowersAction;
  switchShowFollowing: typeof switchShowFollowingAction;
}

type FollowListProps = IOwnProps & IStateMap & IDispatchMap & RouteComponentProps<{ id: string }>;

class FollowList extends Component<FollowListProps> {
  public componentDidMount(): void {
    const { followType } = this.props;
    const {id} = this.props.match.params;
    if (id) {
      if (followType === FollowType.FOLLOWING) {
        this.props.getFollowing({id: Number(id), page: 1, perPage: FOLLOWERS_ON_FOLLOW_PAGE});
      } else if (followType === FollowType.FOLLOWERS) {
        this.props.getFollowers({id: Number(id), page: 1, perPage: FOLLOWERS_ON_FOLLOW_PAGE});
      }
    }
  }

  public onClickFollow = (id: number) => {
    this.props.followByUser(id);
  };

  public switchShowFollow = () => {
    const {followType, userId, displayFollowing, displayFollowers} = this.props;
    if (userId != null) {
      if (followType === FollowType.FOLLOWING) {
        this.props.switchShowFollowing({id: userId, switch: !displayFollowing});
      } else {
        this.props.switchShowFollowers({id: userId, switch: !displayFollowers});
      }
    }
  };

  public render() {
    const {
      followType,
      followers,
      following,
      userId,
      displayFollowing,
      displayFollowers,
      loading,
      history,
    } = this.props;
    const {id} = this.props.match.params;
    const isMe = Number(id) === userId;
    const isFollowing = followType === FollowType.FOLLOWING;
    const followAmount = isFollowing ? following.total : followers.total;
    const followList = isFollowing ? following.rows : followers.rows;
    const isLoading =
      followType === FollowType.FOLLOWING
        ? loading[UserActions.GET_FOLLOWING]
        : loading[UserActions.GET_FOLLOWERS];
    const isShowFollow = followType === FollowType.FOLLOWING ? displayFollowing : displayFollowers;
    return (
      <div className="global-wrapper">
        <Header />
        <ArrowBackWrapper
          className={'arrow-wrapper-page collection-page header'}
          arrow
          onBackClicked={() => history.goBack()}
          backgroundImage={SIGNUP_BG}
          wrapperClass={'wrapper'}
        >
          <>
            {userId != null ? (
              isLoading ? (
                <Preloader />
              ) : (
                <FollowListView
                  followType={followType}
                  followAmount={followAmount}
                  followList={followList}
                  onClickFollow={this.onClickFollow}
                  isShowFollow={isShowFollow}
                  switchShowFollow={this.switchShowFollow}
                  isMe={isMe}
                />
              )
            ) : null}
          </>
        </ArrowBackWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: { user },
  user: {following, followers, user: userUser},
  common: {loading, loaded},
}: IAppState) => ({
  userId: user && user.id,
  following,
  followers,
  displayFollowers: !!(userUser && userUser.displayFollowers),
  displayFollowing: !!(userUser && userUser.displayFollowing),

  loading,
  loaded,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getFollowing: getFollowingAction,
      getFollowers: getFollowersAction,
      followByUser: followByUserAction,
      switchShowFollowers: switchShowFollowersAction,
      switchShowFollowing: switchShowFollowingAction,
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FollowList),
);
