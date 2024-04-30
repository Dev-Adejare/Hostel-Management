import React,{useState} from 'react';
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";



const HeaderSideNav = ({items, setNavToggle}) => {

    const [activeIndex, setActiveIndex] = useState()
  return (
    <aside>
        <div className="--flex-end --sidebar-close">
            <FaTimes className="sidebar-toggle-icon" 
            onClick={() => setNavToggle(false)}/>
        </div>
      
    </aside>
  )
}

export default HeaderSideNav
