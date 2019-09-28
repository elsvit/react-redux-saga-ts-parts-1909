import { isEmpty } from 'lodash-es';
import React, { Component } from 'react';

import {ReactComponent as SwitchOn} from '../../../resources/icons/switch_on.svg';
import { FOLLOWERS_ON_FOLLOW_LIST_PAGE } from '../../../constants';
import {IFollower} from '../../../types/IUser';
import FollowerItem from '../../ui-blocks/FollowerItem';
import MenuItem from '../../ui-blocks/LeftMenu/MenuItem';
import ProfileWatchList from '../../ui-blocks/ProfileWatchList';
import {FollowType} from '../Follow';

interface IOwnProps {
  followType: FollowType;
  followAmount: number;
  followList: IFollower[];
  onClickFollow?: (id: number) => void;
  isShowFollow: boolean;
  switchShowFollow: () => void;
  isMe: boolean;
}

type IFollowListViewProps = IOwnProps;

export default class FollowListView extends Component<IFollowListViewProps> {
  render() {
    const {followAmount, followList, followType, isMe} = this.props;
    const isFollowing = followType === FollowType.FOLLOWING;
    const topLeftText = isFollowing ? 'Following' : 'Followers';
    const isFollowListEmpty = isEmpty(followList);
    const followListShort = isFollowListEmpty
      ? []
      : followList.slice(0, FOLLOWERS_ON_FOLLOW_LIST_PAGE);
    return (
      <div className="margin-32 full-width follow-list">
        <ProfileWatchList
          collectionAmount={followAmount}
          topLeftText={topLeftText}
          topRightBtnText={''}
        >
          {isFollowListEmpty ? (
            <div className="def-text">{`${topLeftText} list is empty`}</div>
          ) : (
            <>
              {isMe && (
                <div className="toggle-show-in-public">
                  <MenuItem
                    title={'SHOW IN PUBLIC PROFILE'}
                    withIndent={false}
                    showIcon={true}
                    icon={SwitchOn}
                    isToggle={true}
                    toggled={this.props.isShowFollow}
                    isItemActive={this.props.isShowFollow}
                    onClick={this.props.switchShowFollow}
                  />
                </div>
              )}
              <div className="list-wrapper">
                {followListShort.map((follower: IFollower) => (
                  <FollowerItem
                    follower={follower}
                    onClickFollow={this.props.onClickFollow}
                    key={follower.id}
                  />
                ))}
              </div>
            </>
          )}
          <div />
        </ProfileWatchList>
      </div>
    );
  }
}
