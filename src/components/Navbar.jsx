import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa6";
import { SiStockx } from "react-icons/si";
import { PiListDashesBold } from "react-icons/pi";
import { RxDividerVertical } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const Navbar = ({ setHidden }) => {
  let [open, setOpen] = useState(false)
  let navigate = useNavigate()


  return (
    <div className='fixed h-[80px] w-full bg-white shadow-md flex select-none'>
      <div className='flex items-center'>
        <PiListDashesBold className='ml-8 hover:scale-[1.03]' style={{ color: 'black', fontSize: '35px' }} onClick={() => setHidden(val => !val)} />
        <RxDividerVertical className='mx-4' style={{ color: 'black', fontSize: '35px' }} />
        <div onClick={() => navigate('/')} className='flex'>
          <SiStockx style={{ color: 'black', fontSize: '40px' }} />
          <h3 className='text-black text-2xl font-bold ml-3 max-sm:hidden'>Weather Dashboard</h3>
        </div>
      </div>
      <div className='flex ml-auto me-10 self-center'>
        <div className='h-12 w-12 flex justify-center items-center rounded-full bg-[#27272a] hover:scale-[1.03]'
          onClick={() => setOpen(val => !val)}
        >
          <FaUser value="S" style={{ height: "30px", color: "wheat" }} />
        </div>
        <ul className={`text-[#EADBC8] w-[250px] fixed top-[75px] rounded-md p-4 right-[20px] bg-[#27272a] ${!open ? 'hidden' : ''}`}>
          <li className=' border-b-2 p-1 border-[#31363F]'>
            <p className='text-xl text-[#EADBC8] text-center'>ABC</p>
            <p className='text-sm text-[#EADBC8] text-center'>123</p>
          </li>
          <li>
            <Link className="link-item flex items-center" to='#'>
              <MdOutlineAccountCircle /><p className='pl-3 flex items-center'>Accounts</p>
            </Link>
            <Link className="link-item flex items-center" to='#'>
              <IoSettingsSharp /><p className='pl-3 flex items-center'>Settings</p>
            </Link>

            <Link className="link-item mt-1 flex items-center text-red-700 border-t-2 border-[#31363F]" to='#'>
              <MdOutlineLogout />
              <p className='pl-3'>LogOut</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
