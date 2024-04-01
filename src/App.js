import { Routes, Route } from "react-router-dom"
import Sharedlayout from "./pages/SharedLayout"
import Home from "./pages/Home"
import OneMed from "./pages/OneMed"
import Form from "./pages/Form"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Sharedlayout />}>
        <Route index element={<Home />} />
        <Route path="/onemed" element={<OneMed />} />
        <Route path="/form" element={<Form />} />
      </Route>
    </Routes>
  )
}

export default App
