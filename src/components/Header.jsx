// TODO Day 1: build the header with the app name and Login/Register links
// TODO Day 4: replace <a href> with <Link to> from react-router-dom
import { Link } from 'react-router-dom'
import { GrResume } from "react-icons/gr";
import { IoIosLogIn } from "react-icons/io";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">App Name   <GrResume/></Link>
        <Link to="/login">Login   <IoIosLogIn /></Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  )
}

export default Header

