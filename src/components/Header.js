import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import SmallScreensNavbar from './smallScreensNavbar';
import { useWindowWidthAndHeight } from './CustomHooks';
import '../index.css';

const Header = () => {
    // Use our custom hook to get the window size
    const [width] = useWindowWidthAndHeight();

    return(
        <header>
            <div className="header-inner">
                {/* Use Link from react-router-dom for navigation */}
                <Link to="/" // Navigate to the root route
                      className="logo nav-link">
                      WebTemplates
                </Link>
                {/* If the width of the window is bigger than 1000px use <Navbar/>, else use <SmallScreensNavbar/> */}
                { width > 1000 ?
                <Navbar navClass="nav-big"
                        linkClassName="nav-big-link"/>
                :
                <SmallScreensNavbar navClass="nav-small"
                                    linkClassName="nav-small-link"
                />
                } 
            </div>
        </header>
    )
}

export default Header;
