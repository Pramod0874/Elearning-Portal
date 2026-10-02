import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookOpen, LogOut, Code } from 'lucide-react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import Assessment from './pages/Assessment';
import { getUser, logoutUser } from './utils/storage';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
    
    // Custom event to handle user state changes without reload
    const handleUserChange = () => {
      setUser(getUser());
    };
    window.addEventListener('userStateChanged', handleUserChange);
    return () => window.removeEventListener('userStateChanged', handleUserChange);
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.dispatchEvent(new Event('userStateChanged'));
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem 0', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: 'white' }}>
          <Code className="text-gradient" size={28} />
          <span>Edu<span className="text-gradient">Verse</span></span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/courses" style={{ color: 'var(--text-primary)' }}>Courses</Link>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: 'var(--text-primary)' }}>Dashboard</Link>
              <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/assessment/:id" element={<Assessment />} />
        </Routes>
      </main>
      <footer style={{ background: 'var(--bg-secondary)', padding: '2rem 0', textAlign: 'center', marginTop: 'auto', borderTop: '1px solid var(--glass-border)' }}>
        <p className="text-secondary">&copy; 2025 EduVerse Mini Project.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
