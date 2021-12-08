import React from "react";

// Using bootstrap
import "boostrap/dist/css/boostrap.css";

// Import NavLink to use react router
import { NavLink } from "react-router-dom";

// Display the Navbar
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    Movie Club
                </NavLink>
                <button
                  classname="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-bar ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create">
                                Add Movie
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;