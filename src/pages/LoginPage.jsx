import { useState } from 'react'

// TODO Day 4: build a login form with controlled email and password inputs
//             add a submit handler that console.logs the values for now
//             add a link to the Register page

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Logging in with:', { email, password })
    // Add your authentication logic here
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </label>

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </main>
  )
}

export default LoginPage