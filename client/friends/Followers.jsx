import React from 'react';
import UserAvatar from './UserAvatar.jsx';

// remember to pass in props when uncommenting
export default function Followers({
  followers,
}) {
  const avatars = [];
  for (let user of followers) {
    avatars.push(<UserAvatar key={user.username} name={user.name} />);
  }

  // uncomment when ready to fetch
  // const avatars = [];
  // for (let user of props.followers) {
  //   avatars.push(<UserAvatar key={user.username} name={user.name} />);
  // }

  // TODO show default message if empty

  return (
    <div>
      <h1>Followers</h1>
      {avatars}
    </div>
  );
}

