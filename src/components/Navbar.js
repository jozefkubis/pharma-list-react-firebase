import "./Navbar.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Domov</NavLink>
        <NavLink to="/form">Pridaj liek</NavLink>
        <NavLink to="/delete">Zmazať liek</NavLink>
        <button className="navbar-btn">Tmavy rezim</button>
      </nav>
    </header>
  )
}

export default Navbar
