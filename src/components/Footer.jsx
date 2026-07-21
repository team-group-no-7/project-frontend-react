import { BookOpen, Send } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "#",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
    },
    {
      icon: FaXTwitter,
      href: "#",
      label: "Twitter",
    },
    {
      icon: FaLinkedinIn,
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: FaGithub,
      href: "#",
      label: "GitHub",
    },
  ];

  const platformLinks = [
    "Explore",
    "Categories",
    "Top Creators",
    "Pricing",
    "Community",
  ];

  const companyLinks = [
    "About",
    "Careers",
    "Blog",
    "Contact",
    "Press",
  ];

  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-600 p-3">
                <BookOpen className="text-white" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-white">
                LearnMint
              </h2>
            </div>

            <p className="mt-5 max-w-md leading-7 text-gray-400">
              LearnMint is a community-driven platform where students
              share notes, projects, interview experiences, and earn
              from their knowledge.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex gap-4">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={index}
                    href={item.href}
                    aria-label={item.label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-600"
                  >
                    <Icon className="text-lg text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Platform
            </h3>

            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="transition hover:text-indigo-400"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="transition hover:text-indigo-400"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Newsletter
            </h3>

            <p className="mb-5 text-sm text-gray-400">
              Subscribe to receive the latest resources and updates.
            </p>

            <div className="flex rounded-xl bg-slate-900 p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 text-sm text-white placeholder:text-gray-500 outline-none"
              />

              <button className="rounded-lg bg-indigo-600 p-3 transition hover:bg-indigo-700">
                <Send size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-gray-500 md:flex-row">
          <p>© 2026 LearnMint. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-indigo-400">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-indigo-400">
              Terms of Service
            </a>

            <a href="#" className="transition hover:text-indigo-400">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;