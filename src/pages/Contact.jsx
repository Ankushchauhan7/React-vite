import React from 'react'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative w-full h-64 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"
          alt="Contact Banner"
          className="absolute w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Contact Us</h1>
          <p className="mt-4 text-lg md:text-xl text-white font-medium drop-shadow">
            We'd love to hear from you!
          </p>  
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get in Touch</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="you@example.com"
              disabled
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="4"
              placeholder="Your message..."
              disabled
            />
          </div>
          <button
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline opacity-60 cursor-not-allowed"
            type="button"
            disabled
          >
            Send Message
          </button>
        </form>
        <p className="text-gray-500 text-xs text-center">
          This is a demo contact form. Fields are disabled.
        </p>
      </div>
    </div>
  )
}

export default ContactPage