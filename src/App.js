import Container from "@material-ui/core/Container"
import "./App.css"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import AllApplicants from "./components/AllApplicants"

export default function App() {
  return (
    <>
      <NavBar />
      {/* <Container
        maxWidth="md"
        style={{ minHeight: "70vh", paddingTop: "20px" }}
      >
        Home Page
      </Container> */}
      <AllApplicants />
      <Footer />
    </>
  )
}
