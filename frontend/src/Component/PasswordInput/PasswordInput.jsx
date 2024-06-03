import React from 'react'
import "./PasswordInput.css"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"

const PasswordInput = ({placeholder, value, onChange, name, onPaste}) => {
    const [showPassword, setShowPassword] = useState(false)
    const togglePassword = () => {
      setShowPassword(!showPassword)
    }
  return (
    <div>
      
    </div>
  )
}

export default PasswordInput
