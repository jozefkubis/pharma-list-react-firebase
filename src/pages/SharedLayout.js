import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import { PharmaProvider } from "../contexts/PharmaContext"

const SharedLayout = () => {
  return (
    <main>
      <PharmaProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </PharmaProvider>
    </main>
  )
}

export default SharedLayout
