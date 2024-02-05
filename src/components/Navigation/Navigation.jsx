/* eslint-disable no-unused-vars */
import React from "react";
import img from "../../assets/GettyImages-138596308-ad71719.webp";
import Link from "next/link";
import Image from "next/image";
const Navigation = () => {
  return (
    <div>
      <header className="mb-2 bg-gradient-to-r from-[#4b7bc4] to-[#4b93af]">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <a
            href="#"
            className="flex items-center whitespace-nowrap text-2xl font-black"
          >
            <span className="mr-2 text-4xl text-blue-600">
              <Image
                src={img}
                alt=""
                className="object-cover rounded-full w-16 h-16 md:w-36 md:h-20 "
                width={100}
                height={100}
              />
            </span>
            <span className="bg-gradient-to-r from-[#b9d0f1] to-[#07b9ff] inline-block text-transparent bg-clip-text md:ml-10 pb-2">
              EIFPE
            </span>
          </a>
          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label
            className="absolute top-8 right-7 cursor-pointer md:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
          >
            <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="text-blue-100 md:mr-12 hover:text-blue-600">
                <Link href="/">Home</Link>
              </li>
              <li className="text-blue-100 md:mr-12 hover:text-blue-600">
                <Link href="/applynow">Apply Now</Link>
              </li>
              <li className="text-blue-100 md:mr-12 hover:text-blue-600">
                <Link href="/Gallery">Gallery</Link>
              </li>
              <li className="text-blue-100 md:mr-12 hover:text-blue-600">
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navigation;
