import { Outlet } from "react-router"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"

const Root = () => {
  return (
    <section>
      <header className="sticky top-0 z-50 backdrop-blur-lg">
        <Navbar></Navbar>
      </header>

      <div>
        <Outlet></Outlet>
      </div>

      <div>
        <Footer></Footer>
      </div>
    </section>
  )
}

export default Root
