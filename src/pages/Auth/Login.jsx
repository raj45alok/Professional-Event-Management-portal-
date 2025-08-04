import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import droneEventPoster from '../../assets/drone-event.jpg';
import '../../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill out all fields');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/manage-events');
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-section">
          <div className="login-card">
            <div className="login-header">
              <h1>Welcome Host</h1>
              <p className="tagline">UNLEASH YOUR EVENT WITH US</p>
            </div>

            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-field-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ? '👁️‍🗨️' : '👁️'}
                  </span>
                </div>

                <div className="password-footer">
                  <button
                    type="button"
                    className="forgot-btn"
                    onClick={() => alert('Forgot Password clicked!')}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="login-footer">
              Don't have an account?{' '}
              <button className="text-link" onClick={() => navigate('/signup')}>
                Sign up
              </button>
            </div>
          </div>
        </div>

        <div className="poster-section">
          <div className="poster-content">
            <h2>UPCOMING EVENT THIS AUGUST!</h2>
            <div className="poster-image-container">
              <img
                src={droneEventPoster}
                alt="Drone Technology Workshop"
                className="event-poster"
              />
            </div>
            <div className="poster-text">
              <h3>DRONE TECHNOLOGY WORKSHOP</h3>
              <p className="highlight">
                ELEVATE YOUR SKILLS AND GAIN HANDS ON EXPERIENCE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
