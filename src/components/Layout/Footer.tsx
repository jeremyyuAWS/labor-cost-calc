import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Lyzr AI - Powered by Bolt.new
        </p>
      </div>
    </footer>
  );
};

export default Footer;