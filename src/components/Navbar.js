import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { HiHome } from "react-icons/hi2"
import { IoBagAdd } from "react-icons/io5"
import { AiFillDelete } from "react-icons/ai"

const Navbar = () => {

const darkMode = () => {
  document.body.classList.toggle("dark-mode")
}

  return (
    <header>
      <nav>
        <NavLink to="/">
          <HiHome /> Domov
        </NavLink>
        <NavLink to="/form">
          <IoBagAdd /> Pridaj liek
        </NavLink>
        <NavLink to="/delete">
          <AiFillDelete /> Zmazať liek
        </NavLink>
        <button className="navbar-btn" onClick={darkMode}>Tmavy rezim</button>
      </nav>
    </header>
  )
}

export default Navbar
