import React from 'react';
import { FollowType } from '../Follow';
import FollowList from './FollowList';

const FollowersList = () => <FollowList followType={FollowType.FOLLOWERS} />;

export default FollowersList;
