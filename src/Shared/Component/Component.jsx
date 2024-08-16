import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";

export function Component() {
  const [toggle, setToggle] = useState(false);
  const { user, logOutUser } = UseAuth(); // Assuming loginUser is the correct function
// console.log(user)
  return (
    <Navbar fluid rounded className="">
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Profile
        </span>
      </NavbarBrand>
      <div className="flex justify-center items-center gap-3 md:order-2">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                
                img={user?.photoURL || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">{user?.displayName}</span>
              <span className="block truncate text-sm font-medium">
             {user?.email}
              </span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => logOutUser()}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <NavLink to="/login" className="">
            Login
          </NavLink>
        )}

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavLink
          to="/"
          onClick={() => setToggle(!toggle)}
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setToggle(!toggle)}
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
        >
          Pricing
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
        >
          Contact
        </NavLink>
      </NavbarCollapse>
    </Navbar>
  );
}
