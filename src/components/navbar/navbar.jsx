import React from 'react';
import './navbar.scss';
import {NavLink} from 'react-router-dom';

const Navbar = () => {

    return ( 
        <div className="nav-bar">
            <div className="left">
               <h3 className="title">
                   <span id="red">C</span><span id="blue">O</span><span id="green">L</span><span id="yellow">O</span><span id="pink">R</span>FLIX
                </h3>
               <ul className="nav">
               <NavLink style={{textDecoration: "none", color: "#fff"}} activeClassName='active' className='nav-item' exact to='/a'>Top 500</NavLink>
               
               </ul>
            </div>
            
        </div>
     );
}
 
export default Navbar;