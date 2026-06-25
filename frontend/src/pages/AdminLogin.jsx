import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import '../styles/adminLogin.css';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  if (localStorage.getItem('isAdminLoggedIn') === 'true') {
    return <Navigate to="/admin" replace />;
  }

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = 'Username is required.';
    if (!password) e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setAuthError('');
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin', { replace: true });
    } else {
      setAuthError('Invalid username or password.');
    }
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">📅</div>
          <span className="login-logo-text">BookEase</span>
        </div>

        <h1 className="login-title">Admin Login</h1>
        <p className="login-subtitle">Please login to access the Appointment Dashboard</p>

        {authError && <div className="login-alert-error">{authError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="login-form-group">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              className={`login-input${errors.username ? ' input-error' : ''}`}
              placeholder="Enter username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); clearError('username'); }}
              autoComplete="username"
            />
            {errors.username && <p className="login-field-error">{errors.username}</p>}
          </div>

          <div className="login-form-group">
            <label htmlFor="admin-password">Password</label>
            <div className="login-input-wrap">
              <input
                id="admin-password"
                type={showPw ? 'text' : 'password'}
                className={`login-input login-input-pw${errors.password ? ' input-error' : ''}`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p className="login-field-error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <button className="btn-back-home" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
