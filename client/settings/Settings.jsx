import React, { useState } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

import './Settings.scss';

export default function Settings() {
  const [user, setUser] = useState({name: 'Duke Lee', email: 'dukelee@codesmith.com'}); //dummy data
  const [edit, setEdit] = useState(false);

  // TODO uncomment when linked to back end. 
  // useEffect(() => {
    // fetch('/api/user')
    //   .then((res) => res.json())
    //   .then((data) => setUser(data))
    //   .catch((err) => console.log(err));
  // })

  function editAccount () {
    setEdit(true);
  }

  function saveChanges (e) {
    e.preventDefault();
    console.log(user);
    fetch(`/api/user/${user.username}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      body: JSON.stringify(user)
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setEdit(false);
  }

  function deleteAccount () {
    fetch(`/api/user/${user.username}`, {
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
    <main id='settingsMain'>
      <h1>Account Settings</h1>
      {!edit && <section>
        <div id='settingsUserInfo'>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
        </div>
        <h1>Privacy Settings</h1>
        <Button sx={{m: 1}} variant="contained" onClick={editAccount}>Edit Account Information</Button>
      </section>}
      {edit && <section>       
        <form onSubmit={saveChanges}>
            
          <InputLabel htmlFor="my-name" sx={{fontSize: 12, mt: 2}}>Name</InputLabel>
          <TextField id="my-name" size="small" variant="outlined" aria-describedby="my-name" defaultValue={user.name} 
            onChange={e => setUser(Object.assign({}, user, {name: e.target.value}))}/>
          <InputLabel htmlFor="my-email" sx={{fontSize: 12, mt: 2}}>Email</InputLabel>
          <TextField id="my-email" size="small" fullWidth={true} variant="outlined" aria-describedby="my-email" defaultValue={user.email} 
            onChange={e => setUser(Object.assign({}, user, {email: e.target.value}))}/>
          <InputLabel htmlFor="my-password" sx={{fontSize: 12, mt: 2}}>Password</InputLabel>
          <TextField id="my-password" type='password' size="small" fullWidth={true} variant="outlined" aria-describedby="my-password" 
            onChange={e => setUser(Object.assign({}, user, {password: e.target.value}))}/>
          <h1>Privacy Settings</h1>
          <Button sx={{m: 1}} variant="contained" type="submit">Save</Button>
        </form>
      </section>}
      <Button sx={{m: 1}} variant="contained" color="error" onClick={deleteAccount}>Delete Account</Button>
    </main>
  );
}