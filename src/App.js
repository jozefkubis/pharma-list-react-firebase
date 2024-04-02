import { Routes, Route } from "react-router-dom"
import Sharedlayout from "./pages/SharedLayout"
import Home from "./pages/Home"
import OneMed from "./pages/OneMed"
import Form from "./pages/Form"
import Delete from "./pages/Delete"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Sharedlayout />}>
        <Route index element={<Home />} />
        <Route path="/onemed/:medId" element={<OneMed />} />
        <Route path="/form" element={<Form />} />
        <Route path="/delete" element={<Delete />} />
      </Route>
    </Routes>
  )
}

export default App
