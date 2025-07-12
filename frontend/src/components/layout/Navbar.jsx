import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Wrench,
  BookOpen,
  Users,
  IdCard,
  DraftingCompass,
} from "lucide-react";
import logo from "../../assets/general/logo.png";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const navLinks = [
  { name: "Products", path: "/products", icon: Wrench },
  {
    name: "Digital Business Card",
    path: "/digital-business-card",
    icon: IdCard,
  },
  { name: "Tech Blog", path: "/blogs", icon: BookOpen },
  {
    name: "Engineering Projects",
    path: "/engineering-projects",
    icon: DraftingCompass,
  },
  { name: "Contact Us", path: "/contact", icon: Users },
];

// --- NEW: Framer Motion Variants for animations ---
const sidebarVariants = {
  // The "open" state
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring", // A physics-based animation
      stiffness: 300,
      damping: 30,
      // This is where the magic for the list items happens
      staggerChildren: 0.1,
    },
  },
  // The "closed" state
  closed: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const listItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`
            w-full z-50 transition-all duration-300
            ${
              // If it's the homepage...
              isHomePage 
                // ...apply the floating/scrolling logic.
                ? isScrolled ? 'fixed top-0 left-0 bg-[#161a1d] shadow-lg' : 'absolute top-0 left-0 bg-transparent'
                // Otherwise (for all other pages)...
                : 'relative bg-[#161a1d] shadow-lg' // ...make it solid and static.
            }
          `}
        ref={navbarRef}
      >
        <div className="container mx-auto px-6 flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 lg:pl-3">
            <img
              className="h-12 lg:h-14 w-auto"
              src={logo}
              alt="TechAsia Logo"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center font-semibold text-lg">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {/* ---  NavLink component --- */}
                  <NavLink
                    to={link.path}
                    // The className prop can be a function to dynamically apply classes
                    className={({ isActive }) => `
                      block px-8 py-2 text-base capitalize transition-colors duration-300
                      ${
                        isActive
                          ? // Active state: Apply gradient classes
                            "bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
                          : // Inactive state: Solid gray, with gradient on hover
                            "text-gray-400 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 hover:bg-clip-text hover:text-transparent"
                      }
                    `}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center p-2 text-white rounded-lg hover:bg-white hover:bg-opacity-10 focus:outline-none transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* --- Wrapped mobile sidebar elements in AnimatePresence --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Mobile Sidebar Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* --- Mobile Sidebar  uses motion component and variants --- */}
            <motion.aside
              className="fixed top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-[#161616] md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              <div className="h-full px-4 py-4 overflow-y-auto">
                <div className="flex items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <a href="/">
                    <img
                      className="h-10 w-auto"
                      src={logo}
                      alt="TechAsia Logo"
                    />
                  </a>
                </div>

                {/* --- List and list items are motion components --- */}
                <nav>
                  {/* The motion.ul inherits the stagger from its parent */}
                  <motion.ul className="space-y-2 font-medium">
                    {navLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <motion.li key={link.name} variants={listItemVariants}>
                          {/* --- Using NavLink instead of <a> --- */}
                          <NavLink
                            to={link.path}
                            // Close the menu when a link is clicked
                            onClick={() => setIsMenuOpen(false)}
                            // ---  className is a function using `isActive` ---
                            className={({ isActive }) => `
                              flex items-center p-3 rounded-lg transition-colors duration-200 group
                              ${
                                isActive
                                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
                                  : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                              }`}>{({ isActive }) => (
                              <>
                                <IconComponent
                                  className={`w-5 h-5 transition-colors duration-200 ${ isActive
                                  ? "text-orange-700 dark:text-orange-300"
                                  : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                  }`}
                                />
                                <span className="ml-3 capitalize">
                                  {link.name}
                                </span>
                              </>
                            )}
                          </NavLink>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
