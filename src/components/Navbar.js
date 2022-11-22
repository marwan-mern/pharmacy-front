import React, { useEffect, useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { FcHome } from "react-icons/fc";
import { FaWarehouse } from "react-icons/fa";
import { FaCommentMedical } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
import { CgEditMarkup } from "react-icons/cg";
import { HiMenu } from "react-icons/hi";










const Navbar = () => {
  const [showMenuButton, setshowMenuButton] = useState(false)
  const [showMenu, setshowMenu] = useState(false)
  let WindowWidth = window.innerWidth;

  const show = () => {
    setshowMenu(!showMenu)
    if (showMenu === true) {
      setshowMenuButton(false)
    } else {
      setshowMenuButton(true)
    }
  }

  useEffect(() => {
    if (WindowWidth < 1222) {
      setshowMenuButton(true)
    } else {
      setshowMenuButton(false)
    }
  }, [])

  return (
    <div className='navbar'>
      <Link to={'/'} className='logo'>EL<span>MA</span>R<span>WA</span><span> </span><span>Pharmacy</span></Link>
      <div className='navItems'>
        <div onClick={() => { show(showMenu) }} className={showMenuButton ? 'navItem' : 'hide'}>
          <HiMenu />
        </div>
        <div onClick={()=>{show(showMenu)}} className={showMenuButton ? 'hide' : 'navItem'}>
          <FcHome />
          <Link to={`/`}> Home</Link>
        </div>
        <div onClick={()=>{show(showMenu)}} className={showMenuButton ? 'hide' : 'navItem'}>
          <FaWarehouse />
          <Link to={`/store`}> Store</Link>
        </div>
        <div onClick={()=>{show(showMenu)}} className={showMenuButton ? 'hide' : 'navItem'}>
          <FaClinicMedical />
          <Link to={`/AddToStock`}> Add To Stock</Link>
        </div>
        <div onClick={()=>{show(showMenu)}} className={showMenuButton ? 'hide' : 'navItem'}>
          <FaCommentMedical />
          <Link to={`/report`}> Report</Link>
        </div>
        <div onClick={()=>{show(showMenu)}} className={showMenuButton ? 'hide' : 'navItem'}>
          <CgEditMarkup />
          <Link to={`/AddProduct`}> Edit Products</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
