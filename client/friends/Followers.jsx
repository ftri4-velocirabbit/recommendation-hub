import React from 'react';
import UserAvatar from './UserAvatar.jsx';

// remember to pass in props when uncommenting
export default function Followers() {
  // DUMMY DATA
  const followerArray = [{name: 'Jackie A', username: 'jackiea'}, {name: 'Jake B', username: 'jakb'}, {name: 'David Dohn', username: 'davidd'}];
    const avatars = [];
    for (let user of followerArray) {
      avatars.push(<UserAvatar key={user.username} name={user.name} />);
    }

    // uncomment when ready to fetch
    // const avatars = [];
    // for (let user of props.followers) {
    //   avatars.push(<UserAvatar key={user.username} name={user.name} />);
    // }
    
    return (
      <div>
      <h1>Followers</h1>
      {avatars}
    </div>
    );
}

