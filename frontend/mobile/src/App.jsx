import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeProvider';
import { AuthProvider } from "./contexts/AuthProvider";
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EkskulPage from './pages/EkskulPage';
import EkskulDetailPage from './pages/EkskulDetailPage';
import SchedulePage from './pages/SchedulePage';
import ScheduleDetailPage from './pages/ScheduleDetailPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedId, setSelectedId] = useState(undefined);
  const { isAuthenticated } = useAuth();

  const handleNavigate = (page, id) => {
    setCurrentPage(page);
    setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (!isAuthenticated && currentPage !== 'landing' && currentPage !== 'login' && currentPage !== 'about') {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'ekskul':
        return <EkskulPage onNavigate={handleNavigate} />;
      case 'ekskul-detail':
        return selectedId ? (
          <EkskulDetailPage ekskulId={selectedId} onNavigate={handleNavigate} />
        ) : (
          <EkskulPage onNavigate={handleNavigate} />
        );
      case 'schedule':
        return <SchedulePage onNavigate={handleNavigate} />;
      case 'schedule-detail':
        return selectedId ? (
          <ScheduleDetailPage scheduleId={selectedId} onNavigate={handleNavigate} />
        ) : (
          <SchedulePage onNavigate={handleNavigate} />
        );
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
