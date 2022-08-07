import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

function Dashboard() {

  const [user, setUser] = useState({
    email: "",
    username: ""
  });

  const router = useRouter();

  const getProfile = async () => {
    const response = await axios.get('/api/auth/profile');
    setUser(response.data);
  }

  const handleLogout = async () => {

    try {
      await axios.post('/api/auth/logout');
      router.push('/login');
    } catch (error) {
      console.log(error);
      router.push('/login');
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <button onClick={() => getProfile()}>
        Get profile
      </button>

      <button onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard