import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { FcHome } from "react-icons/fc";
import { FaWarehouse } from "react-icons/fa";
import { FaCommentMedical } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
import { CgEditMarkup } from "react-icons/cg";









const Navbar = () => {


  return (
    <div className='navbar'>
      <Link to={'/'} className='logo'>El<span>MA</span>R<span>WA</span><span> </span><span>Pharmacy</span></Link>
      <div className='navItems'>
        <div className='navItem'>
          <FcHome />
          <Link to={`/`}> Home</Link>
        </div>
        <div className='navItem'>
          <FaWarehouse />
          <Link to={`/store`}> Store</Link>
        </div>
        <div className='navItem'>
          <FaClinicMedical />
          <Link to={`/AddToStock`}> Add To Stock</Link>
        </div>
        <div className='navItem'>
          <FaCommentMedical />
          <Link to={`/report`}> Report</Link>
        </div>
        <div className='navItem'>
          <CgEditMarkup />
          <Link to={`/AddProduct`}> Edit Products</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
