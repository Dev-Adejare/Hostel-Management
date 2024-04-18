import { Route,Routes } from "react-router-dom"
import AdminReg from "./Component/Register/AdminReg"
import Login from "./Component/Register/Login"
import StudentReg from "./Component/Register/StudentReg"





function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminReg/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/student-reg" element={<StudentReg/>}/>
        

      </Routes>
     
    </div>
  )
}

export default App
