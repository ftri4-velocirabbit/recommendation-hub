import React from 'react';
import UserAvatar from './UserAvatar.jsx';

// remember to pass in props when uncommenting
export default function Following(props) {

  //DUMMY DATA
  const followingArray = [{name: 'Jackie A', username: 'jackiea'}, {name: 'Jake B', username: 'jakb'}, {name: 'David Dohn', username: 'davidd'}];
  const avatars = [];
  for (let user of followingArray) {
    avatars.push(<UserAvatar key={user.username} name={user.name} />);
  }


  // uncomment when ready to fetch
  // const avatars = [];
  // for (let user of props.followedUsers) {
  //   avatars.push(<UserAvatar key={user.username} name={user.name} />);
  // }

    return (
    <div>
      <h1>Following</h1>
      {avatars}
    </div>
    );
}
 