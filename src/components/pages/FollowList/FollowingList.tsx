import React from 'react';
import { FollowType } from '../Follow';
import FollowList from './FollowList';

const FollowingList = () => <FollowList followType={FollowType.FOLLOWING} />;

export default FollowingList;
