import React from 'react';
import { Link } from 'react-router-dom';
import { CgDesignmodo } from 'react-icons/cg';

const NavBar = () => {
    return (
        <div style={{ backdropFilter: 'blur(10px)' }} className="navbar shadow-md  bg-transparent sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown lg:hidden md:block sm:hidden ">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
                <div>
                    <Link className='font-bold btn border-0 normal-case flex items-center justify-between text-2xl text-transparent bg-clip-text bg-gradient-to-tl from-primary to-secondary'><span className='text-secondary mr-2'><CgDesignmodo size={35} /></span>ImQ</Link>
                </div>
            </div>


        </div>
    );
};

export default NavBar;