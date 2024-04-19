import { Route,Routes } from "react-router-dom"
import AdminReg from "./Component/Register/AdminReg"
import Login from "./Component/Register/Login"
import StudentReg from "./Component/Register/StudentReg"
import HomeDash from "./Component/Dashboard/HomeDash"
import Layout from "./Component/Layout/Layout"


function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminReg/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/student-reg" element={<StudentReg/>}/>
        <Route path="/homedash" element={<Layout><HomeDash/></Layout>}/>
      </Routes>
     
    </div>
  )
}

export default App
        





