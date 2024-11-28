import React, { useState } from 'react'
import { MdInventory } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineEventAvailable } from "react-icons/md";

const Sidebar = () => {
  let [open, setOpen] = useState(false)

  return (
    <div className='h-[calc(100vh-80px)] w-[350px] bg-[#27272a] px-2 pt-6 pb-2 select-none flex flex-col'>
      <div className='flex flex-col border-b-2 border-[#31363F] overflow-auto scrollbar-thin'>
        <div className='text-[#EADBC8] font-semibold font-mono text-[20px] flex hover:bg-[rgba(51,51,59,1)] rounded-sm p-1' 
        onClick={() => setOpen(val => !val)}>
          <MdInventory style={{ height: "30px" }} className='mr-5 ml-4' />
          <p>Weather Data</p>
          <FaChevronDown style={{ height: "20px" }} className='ml-auto mr-3 mt-2' />
        </div>
        <ul className={`text-gray-700 pt-2 ${open ? 'hidden':''}`}>
          <li>
          <NavLink className={({isActive}) => isActive ? "link-item bg-[rgba(51,51,59,1)]" : "link-item"} to="/">
          <FaGoogle className='mr-4 ml-4'/>
            My Location
          </NavLink>
          </li>
          <li>
          <NavLink className={({isActive}) => isActive ? "link-item bg-[rgba(51,51,59,1)]" : "link-item"} to='/search'>
          <MdOutlineEventAvailable className='mr-4 ml-4'/>
            Search
          </NavLink>
          </li>
          <li>
          <NavLink className={({isActive}) => isActive ? "link-item bg-[rgba(51,51,59,1)]" : "link-item"} to='/weekly-forcast'>
          <AiFillProduct className='mr-4 ml-4'/>
            Weekly Forcast
          </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
