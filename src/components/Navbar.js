import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { HiHome } from "react-icons/hi2"
import { IoBagAdd } from "react-icons/io5"
import { AiFillDelete } from "react-icons/ai"
import { useEffect } from "react"

const Navbar = () => {
  const darkMode = () => {
    const isDarkMode = document.body.classList.toggle("dark-mode")
    const isDarkModeH = document.querySelector("header").classList.toggle("dark-mode")
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled")
    localStorage.setItem("darkModeH", isDarkModeH ? "enabled" : "disabled")
  }

  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode")
    if (darkModeSetting === "enabled") {
      document.body.classList.add("dark-mode")
    }
  }, [])

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
        <button className="navbar-btn" onClick={darkMode}>
          Tmavy rezim
        </button>
      </nav>
    </header>
  )
}

export default Navbar
