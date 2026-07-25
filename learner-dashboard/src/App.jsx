import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MyLibrary from "./pages/MyLibrary";
import PurchaseHistory from "./pages/PurchaseHistory";
import Sessions from "./pages/Sessions";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Dashboard />} />

      <Route
        path="/library"
        element={<MyLibrary />}
      />

      <Route
        path="/purchase-history"
        element={<PurchaseHistory />}
      />

      <Route
        path="/sessions"
        element={<Sessions />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

    </Routes>
  );
}

export default App;