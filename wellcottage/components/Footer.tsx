"use client";

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = {
  mainMenu: [
    { name: "Decor", href: "/category/decor" },
    { name: "Wall Organizers", href: "/category/wall-organizers" },
    { name: "Kitchen", href: "/category/kitchen" },
    { name: "Countertops", href: "/category/countertops" },
    { name: "Furniture", href: "/category/furniture" },
    { name: "Lighting", href: "/category/lighting" },
  ],
  information: [
    { name: "Track Your Order", href: "/track-order" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "About Us", href: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#4a5240] text-[#c8bfa0] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <Link href="/">
              <span className="font-serif text-2xl text-[#f0e8d0] tracking-tight">
                The Well Cottage
              </span>
            </Link>
            <p className="text-sm text-[#a0987a] mt-3 leading-relaxed">
              Handcrafted wooden home essentials from the heart of rural India.
              Sustainable, ethical, and heirloom-quality.
            </p>

            {/* Follow Us */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-widest text-[#8d8840] font-semibold mb-3">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#c8bfa0] hover:text-white transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#8d8840] transition-colors">
                    <Instagram size={15} />
                  </span>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#c8bfa0] hover:text-white transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#8d8840] transition-colors">
                    <Facebook size={15} />
                  </span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Main Menu */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#8d8840] font-semibold mb-4">
              Main Menu
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.mainMenu.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#c8bfa0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#8d8840] font-semibold mb-4">
              Information
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.information.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#c8bfa0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#8d8840] font-semibold mb-4">
              Customer Care
            </h4>
            <ul className="space-y-3">
              <li>
                <p className="text-xs text-[#8a8270] uppercase tracking-wide mb-1">
                  Phone
                </p>
                <a
                  href="tel:+919876543210"
                  className="text-sm text-[#c8bfa0] hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li>
                <p className="text-xs text-[#8a8270] uppercase tracking-wide mb-1">
                  Email
                </p>
                <a
                  href="mailto:hello@thewellcottage.com"
                  className="text-sm text-[#c8bfa0] hover:text-white transition-colors"
                >
                  hello@thewellcottage.com
                </a>
              </li>
              <li className="pt-3">
                <p className="text-xs text-[#8a8270] leading-relaxed">
                  Monday – Saturday
                  <br />
                  10:00 AM – 6:00 PM IST
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a7260]">
          <p>© 2024 The Well Cottage. All rights reserved.</p>
          <p>Handcrafted with ♥ in India</p>
        </div>
      </div>
    </footer>
  );
}
