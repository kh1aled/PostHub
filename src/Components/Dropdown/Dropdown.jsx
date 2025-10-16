import React, { useState, useEffect, useRef } from "react";
import "./DropdownStyle.css";
import { Link } from "react-router-dom";

const Dropdown = ({ postId, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div className="dropdown_container" ref={dropdownRef}>
            <button className="dropdown_toggle" onClick={() => setShowMenu(!showMenu)}>
                &#8942;
            </button>

            {showMenu && (
                <ul className="dropdown_menu">
                    <li>
                        <Link to={`/EditPost/${postId}`} onClick={() => setShowMenu(false)}>
                            📝 Edit
                        </Link>
                    </li>
                    <li>
                        <Link to={`/ShowPost/${postId}`} onClick={() => setShowMenu(false)}>
                            👁️ Show
                        </Link>
                    </li>
                    <li
                        className="delete"
                    >
                        <button onClick={() => {
                            console.log("delete clicked for post:", postId);
                            if (typeof onDelete !== "function") {
                                console.error("onDelete is not a function!");
                                return;
                            }
                            onDelete(postId);
                            setShowMenu(false);
                        }}>
                            🗑️ Delete
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
