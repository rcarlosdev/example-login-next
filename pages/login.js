import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

function LoginPage() {

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/auth/login', credentials);
    if (response.status === 200) router.push('/dashboard');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder='Email' onChange={handleChange}></input>
        <input type="password" name="password" placeholder='Password' onChange={handleChange}></input>
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage