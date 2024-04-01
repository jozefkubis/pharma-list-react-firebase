import "./Navbar.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header>
      <nav>
      <NavLink to="/">Domov</NavLink>
      <NavLink to="/form">Pridaj liek</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
