import React, {useState}from "react";

const HeaderSideNav = () => {
  return (
    <div className="sidebar-toggle-icon" onClick={() => setNav(!nav)}>
      {nav ? <FaTimes /> : <FaBars />}
    </div>
  );
};

export default HeaderSideNav;
