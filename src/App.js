import Container from "@material-ui/core/Container"
import "./App.css"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import AllApplicants from "./components/AllApplicants"
import ApplicantTable from "./components/ApplicantTable"
import ApplicantList from "./components/ApplicantList"

export default function App() {
  return (
    <>
      <NavBar />
      <ApplicantList />
      {/* <AllApplicants /> */}
      {/* <ApplicantTable /> */}
      <Footer />
    </>
  )
}
