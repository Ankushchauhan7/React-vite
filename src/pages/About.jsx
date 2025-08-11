import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative w-full h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="About Banner"
          className="absolute w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">About Us</h1>
          <p className="mt-4 text-lg md:text-xl text-white font-medium drop-shadow">
            Discover our story and mission
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Who We Are</h2>
        <p className="text-gray-600 mb-6">
          We are a passionate team dedicated to bringing you the best food experiences from around the city.
          Our mission is to connect food lovers with amazing restaurants, making dining out or ordering in
          a delightful and seamless experience.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          To empower local restaurants and provide our users with a curated selection of top-rated eateries.
          We believe in quality, transparency, and supporting our community.
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Curated list of top restaurants</li>
          <li>Easy search and filter options</li>
          <li>Fast and reliable service</li>
          <li>Customer-first approach</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;