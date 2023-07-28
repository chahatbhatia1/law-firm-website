import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-cover bg-center flex items-center justify-center bg-[url('../src/assets/banner.avif')]">
      <div className="text-center p-8 bg-white bg-opacity-75 rounded-lg">
        <h1 className="text-4xl font-bold">Best Law Firm Website</h1>
        <p className="text-lg my-3">Hire the best lawyers here</p>
        <Link
          to="/hire-lawyers"
          className="block mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  )
}

export default Banner