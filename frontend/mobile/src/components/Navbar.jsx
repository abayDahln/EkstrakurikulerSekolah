import {
  Menu,
  Moon,
  Sun,
  X,
  Home,
  Calendar,
  Users,
  User,
  Info
} from "lucide-react"
import { useState } from "react"
import { useTheme } from "../contexts/ThemeContext"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar({ currentPage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, logout } = useAuth()

  const navItems = isAuthenticated
    ? [
        { name: "Beranda", icon: Home, page: "dashboard" },
        { name: "Ekstrakurikuler", icon: Users, page: "ekskul" },
        { name: "Jadwal", icon: Calendar, page: "schedule" },
        { name: "Profil", icon: User, page: "profile" },
        { name: "Tentang", icon: Info, page: "about" }
      ]
    : [{ name: "Tentang", icon: Info, page: "about" }]

  const handleLogout = () => {
    logout()
    onNavigate("landing")
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-[9999] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() =>
              onNavigate(isAuthenticated ? "dashboard" : "landing")
            }
          >
            <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              EkskulHub
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    currentPage === item.page
                      ? "bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </button>
              )
            })}

            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Keluar
              </button>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="ml-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors"
              >
                Masuk
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page)
                    setIsMenuOpen(false)
                  }}
                  className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    currentPage === item.page
                      ? "bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              )
            })}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Keluar
              </button>
            ) : (
              <button
                onClick={() => {
                  onNavigate("login")
                  setIsMenuOpen(false)
                }}
                className="w-full px-4 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors"
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}