import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/storage';
import { LogIn } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In our mock, login and register do the same thing: store the user to 'login'
    loginUser(isLogin ? 'Demo User' : formData.name || 'Student', formData.email);
    window.dispatchEvent(new Event('userStateChanged'));
    navigate('/dashboard');
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '500px', padding: '4rem 2rem' }}>
      <div className="glass-card">
        <h2 className="text-center mb-4">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-center text-secondary" style={{ marginBottom: '2rem' }}>
          {isLogin ? 'Sign in to jump back into your courses.' : 'Join us to start learning today.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                required 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              required 
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              required 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '1rem', padding: '1rem' }}>
            <LogIn size={20} /> {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '1.5rem' }}>
          <button className="btn" style={{ background: 'transparent', color: 'var(--text-secondary)' }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
