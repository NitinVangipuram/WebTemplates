import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({navClass, linkClassName}) => (
  <NavComponent navClass={navClass}
                linkClassName={linkClassName}
  />
);


export const NavComponent = ({ navClass, linkClassName }) => (
  <nav className={navClass}>
    {["home", "templates", "about", "contact"].map((section) => {
      let path;
      switch (section) {
        case "home":
          path = "/";
          break;
        case "templates":
          path = "/templates";
          break;
        default:
          path = ``;
          break;
      }
      
      return (
        <Link to={path} className={linkClassName}>
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </Link>
      );
    })}
  </nav>
);


export default Navbar;
