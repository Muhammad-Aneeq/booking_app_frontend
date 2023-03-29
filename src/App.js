import { BrowserRouter,Routes,Route
 } from "react-router-dom"
// import Header from "./components/header/Header"
// import Navbar from "./components/navbar/Navbar"
import Home from "./pages/Home/Home"
import Hotel from "./pages/Hotel/Hotel"
import Hotels from "./pages/Hotels/Hotels"
import Login from "./pages/login/Login"

const App = () => {
  return (
    <BrowserRouter>
    {/* <Navbar/>
    <Header/> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/hotels" element={<Hotels/>} />
        <Route path="/hotel/:id" element={<Hotel/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App