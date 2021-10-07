import React, { useState } from 'react';
import Button from '@mui/material/Button';

export default function Settings() {
  const [user, setUser] = useState({});

  // uncomment when linked to back end. 
  // TODO do we need to use useEffect hook here?
  // fetch('/api/user')
  //   .then((res) => res.json())
  //   .then((data) => setUser(data))
  //   .catch((err) => console.log(err));

  function deleteAccount () {
    fetch(`/api/${user.username}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data)) // TODO what do we want to do after account gets deleted?
      .catch((err) => console.log(err));
  }

  return (
    <main>
      <section>
        <h1>Account Settings</h1>
        <div>Name: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>Change password?</div>
      </section>
      <h1>Privacy Settings</h1>
      <Button variant="outlined" onClick={deleteAccount}>Delete Account</Button>
    </main>
  );
}