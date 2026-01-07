import { useState } from "react";

/* ===== THEME PROVIDER ===== */
import { ThemeProvider } from "./context/ThemeContext";

/* ===== COMPONENTS ===== */
import ThemeSelector from "./components/theme/ThemeSelector";

/* ===== PAGES ===== */
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeProvider>
      <div
        className="min-h-screen
                   bg-gradient-to-br from-zinc-100 to-zinc-200
                   dark:from-zinc-900 dark:to-black
                   transition-colors duration-500"
      >
        {/* ===== TOP BAR ===== */}
        <div className="fixed top-4 right-4 z-50 flex gap-3 items-center">
          <ThemeSelector />

          <button
            onClick={() =>
              document.documentElement.classList.toggle("dark")
            }
            className="px-3 py-1 rounded-lg
                       bg-accent text-white
                       hover:opacity-90
                       transition"
          >
            Toggle Mode
          </button>
        </div>

        {/* ===== PAGE CONTENT ===== */}
        <div className="flex items-center justify-center min-h-screen">
          {isLoggedIn ? (
            <Dashboard />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
