import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeaderSideNav = ({ items, setNavToggle }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // const handleLinkClick = (index) => {
  //     setActiveIndex(index)
  // }

  return (
    <aside>
      <div className="--flex-end --sidebar-close">
        <FaTimes
          className="sidebar-toggle-icon"
          onClick={() => setNavToggle(false)}
        />
      </div>

      <div className="left">
        {items.map(({ title, url }, index) => (
          <div className="--flex-center --dir-column" key={index}>
            <Link
              to={url}
              className={index === activeIndex ? "active-link" : ""}
              onClick={() => setActiveIndex(index)}
            >
              {title}
            </Link>
          </div>
        ))}

        <div className="--flex-start --flex-center">
          <button className="btn-primary">New</button>
        </div>
      </div>
    </aside>
  );
};

export default HeaderSideNav;
