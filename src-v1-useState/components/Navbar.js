import "./Navbar.css"
import { NavLink } from "react-router-dom"
import { HiHome } from "react-icons/hi2"
import { IoBagAdd } from "react-icons/io5"
import { AiFillDelete } from "react-icons/ai"
import { useEffect } from "react"
import { PiMoonStarsFill } from "react-icons/pi"

const Navbar = () => {
  const darkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark-mode")
    const navbar = document.querySelector("nav")
    navbar.classList.toggle("dark-mode", isDarkMode)
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled")
  }

  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode")
    if (darkModeSetting === "enabled") {
      document.documentElement.classList.add("dark-mode")
      const navbar = document.querySelector("nav")
      navbar.classList.add("dark-mode")
    }
  }, [])

  return (
    <header>
      <nav>
        <NavLink to="/">
          <HiHome /> <p>Domov</p>
        </NavLink>
        <NavLink to="/form">
          <IoBagAdd /> <p>Pridaj liek</p>
        </NavLink>
        <NavLink to="/delete">
          <AiFillDelete /> <p>Zmazať liek</p>
        </NavLink>
        <div className="navbar-div" onClick={darkMode}>
          <PiMoonStarsFill className="dark-mode-btn" /> <p>Rezim obrazovky</p>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
