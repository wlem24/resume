// TODO Day 1: build the header with the app name and Login/Register links
// TODO Day 4: replace <a href> with <Link to> from react-router-dom
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">App Name</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  )
}

export default Header

