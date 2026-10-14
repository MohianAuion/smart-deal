
import React from "react";
import { FaFacebook, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#001A2C] text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-12">

        {/* Main Footer */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-6 sm:gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Smart<span className="text-yellow-400">Deals</span>
              </h2>

              {/* Social Links - Mobile */}
              <div className="flex gap-2 lg:hidden">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white text-[#001A2C] flex items-center justify-center hover:bg-yellow-400 transition"
                >
                  <FaFacebook size={14} />
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white text-[#001A2C] flex items-center justify-center hover:bg-yellow-400 transition"
                >
                  <FaLinkedinIn size={14} />
                </a>

                <a
                  href="#"
                  aria-label="GitHub"
                  className="w-8 h-8 rounded-full bg-white text-[#001A2C] flex items-center justify-center hover:bg-yellow-400 transition"
                >
                  <FaGithub size={14} />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-5 text-gray-400 mt-2 max-w-sm">
              Your trusted marketplace for authentic local products.
              Discover the best deals from across Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base text-white font-semibold mb-2 sm:mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="/products" className="hover:text-yellow-400 transition">
                  All Products
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-yellow-400 transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-yellow-400 transition">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-yellow-400 transition">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm sm:text-base text-white font-semibold mb-2 sm:mb-4">
              Categories
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Fashion
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Home & Living
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Groceries
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm sm:text-base text-white font-semibold mb-2 sm:mb-4">
              Contact & Support
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-yellow-400 shrink-0" />
                <span className="break-all">support@smartdeals.com</span>
              </li>

              <li className="flex items-center gap-2">
                <Phone size={14} className="text-yellow-400 shrink-0" />
                <span>+880 123 456 789</span>
              </li>

              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-yellow-400 shrink-0" />
                <span>123 Commerce Street, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden lg:block">
            <h3 className="text-white font-semibold mb-4">
              Social Links
            </h3>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white text-[#001A2C] flex items-center justify-center hover:bg-yellow-400 transition"
              >
                <FaFacebook size={14} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white text-[#001A2C] flex items-center justify-center hover:bg-yellow-400 transition"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full bg-white text-[#001A2C] flex items-center justify-center hover:bg-yellow-400 transition"
              >
                <FaGithub size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 sm:mt-10 pt-4 sm:pt-6 text-center">
          <p className="text-[11px] sm:text-xs text-gray-400">
            © 2025 SmartDeals. All rights reserved.
          </p>

          <p className="text-[11px] sm:text-xs text-gray-500 mt-1.5">
            Created by{" "}
            <span className="text-yellow-400 font-medium">
              Mohian Ahmed Auion
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

