import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phonenumber: '',
    company: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      await axios.post('http://localhost:5000/api/auth/register', payload); 
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.msg || 'Registration failed.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      {/* Left Panel - Form */}
      <div className="left-panel">
        <div className="signup-form">
          <h1>Create Your Account</h1>
          <p className="subtitle">Join us to start creating and managing events</p>

          <form onSubmit={handleSubmit}>
            {['name', 'email', 'phone', 'company'].map((field, i) => (
              <div className="form-group" key={i}>
                <label htmlFor={field}>
                  {field === 'company' ? 'Company (Optional)' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  placeholder={`Enter your ${field}`}
                  value={formData[field]}
                  onChange={handleChange}
                />
                {errors[field] && <span className="error-message">{errors[field]}</span>}
              </div>
            ))}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            {serverError && <p className="error-message">{serverError}</p>}

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="right-panel">
        <div className="overlay">
          <h2>Start Managing Events Today</h2>
          <p>Create beautiful event pages with our professional templates</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
