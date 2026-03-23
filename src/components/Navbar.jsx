import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg border-b border-white/20 text-white px-6 py-4 flex items-center justify-between shadow-lg"
    >
      {/* 🔥 LEFT */}
      <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
        Trading Dashboard
      </h1>

      {/* 🔥 CENTER */}
      <div className="flex items-center gap-8 text-sm font-medium">
        <Link
          to="/"
          className="hover:text-blue-400 transition duration-200"
        >
          Home
        </Link>

        <Link
          to="/watchlist"
          className="hover:text-blue-400 transition duration-200"
        >
          Watchlist
        </Link>
      </div>

      {/* 🔥 RIGHT */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-300 text-sm hidden sm:block">
              {user.email}
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm transition"
            >
              Logout
            </motion.button>
          </>
        ) : (
          <motion.div whileTap={{ scale: 0.9 }}>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-sm transition"
            >
              Login
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;