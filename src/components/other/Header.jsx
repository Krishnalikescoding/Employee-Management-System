import React from "react";
import "../../css/Header.css";


const Header = () => {
    return (
        <div className="header main">
            <h2>Hello <span>Krishna 👋</span></h2>
            <div className="logout-btn">
                <button>Log Out</button>
            </div>

        </div>
    )
}

export default Header