import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { LockClosedIcon } from "@heroicons/react/20/solid";
import React,{useState} from 'react';
import AWN from "awesome-notifications"
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import dashbord from './Dashbord';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading,} = useAuth0();
  const navigate = useNavigate();
  const changepage = () =>{
    // console.log("clicked")
    let path = '/profile'
    navigate(path)
  }
  const dashbord=()=>{
    console.log()
    let path = '/'
    navigate(path)
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
              {isAuthenticated&&
                
                <div className="hidden sm:ml-6 sm:block" >
                <div className="flex-row justify-evenly space-x-4">
                    <a className='flex space-x-4"'>
                       {/* <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a> */}
                      <button onClick={dashbord}className='text-gray-300 list-none hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Dashboard</button>
                      <button onClick={changepage} className='text-gray-300 list-none hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Profile</button>
                    </a>
                  
                </div>
              </div>}
         
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
               
              {isAuthenticated?(
      //    <button className="rounded-full" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      //    Log Out
      //  </button>
      <button
      className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      // onClick={createUser}
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    >
     
      Log Out
    </button>
    ):(
      // <button onClick={() => loginWithRedirect()}>Log In</button>
      <button
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                // onClick={createUser}
                onClick={() => loginWithRedirect()}
              >
               
                Login
              </button>
      
    )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                    {isAuthenticated&&
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      {/* <span className="sr-only">Open user menu</span> */}
                      <img
                        className="h-8 w-10 rounded-full"
                        src={user.picture}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                    }
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {isAuthenticated&&
                      <Menu.Item>
                          
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            {user.name.substring(0,10)}
                          </a>
                        )}
                      </Menu.Item>}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {isAuthenticated&&
          
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
                <Disclosure.Button>
                <button onClick={dashbord}className='text-gray-300 list-none hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Dashboard</button>
                <button onClick={changepage} className='text-gray-300 list-none hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Profile</button>
                </Disclosure.Button>
            </div>
          </Disclosure.Panel>
          
          }
          
        </>
      )}
    </Disclosure>
  )
}
