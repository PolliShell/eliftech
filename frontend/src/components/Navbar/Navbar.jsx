import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/login" activeClassName={s.activeLink}>Login</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/signup" activeClassName={s.activeLink}>Sign Up</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/" activeClassName={s.activeLink}>Events</NavLink>
            </div>
            {/*<div className={s.item}>*/}
            {/*    <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>*/}
            {/*</div>*/}
        </nav>
    );
}

export default Navbar;
