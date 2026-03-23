import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CoinDetails from "./pages/CoinDetails";
import Watchlist from "./pages/Watchlist";

function App() {
  const [user, setUser] = useState(undefined); // 👈 IMPORTANT

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 loading state
  if (user === undefined) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;