import React, { useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
    const body = isLogin ? { email, password } : { email, password, name };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (isLogin) {
          setUser(data.user);
          setMessage('');
        } else {
          setMessage('Registration successful! You can now login.');
          setIsLogin(true);
          setEmail('');
          setPassword('');
          setName('');
        }
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (error) {
      setMessage('Connection error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setName('');
    setMessage('');
    setIsLogin(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  if (user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5',
        padding: '40px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            <h1 style={{ color: '#1a1a1a', fontSize: '28px', fontWeight: '600', margin: 0 }}>
              Enqurious Tribe Dashboard
            </h1>
            <button 
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
            >
              Logout
            </button>
          </div>
          
          <div style={{
            backgroundColor: '#e3f2fd',
            border: '1px solid #2196f3',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ color: '#1976d2', margin: '0 0 8px 0' }}>
              Welcome back, {user.name}! 👋
            </h3>
            <p style={{ color: '#1976d2', margin: 0, fontSize: '14px' }}>
              Email: {user.email} | User ID: {user.id}
            </p>
          </div>

          <div style={{ color: '#666', textAlign: 'center', padding: '40px' }}>
            <h2 style={{ marginBottom: '16px' }}>Dashboard Coming Soon!</h2>
            <p>We'll build the channels, articles, and other features next.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Left Side - Login Form */}
      <div style={{
        flex: '1',
        backgroundColor: '#ffffff',
        padding: '40px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Logo */}
        <div style={{ position: 'absolute', top: '40px', left: '60px' }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#1e88e5',
            margin: 0
          }}>
            <span style={{ color: '#1e88e5' }}>ENQURIOUS </span>
            <span style={{ color: '#4caf50' }}>TRIBE</span>
          </h1>
        </div>

        <div style={{ maxWidth: '400px', width: '100%' }}>
          {/* Welcome Message */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '600', 
              color: '#1a1a1a',
              marginBottom: '8px'
            }}>
              👋 {isLogin ? 'Welcome back!' : 'Join us!'}
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '16px',
              margin: 0
            }}>
              {isLogin ? 'Log into your account' : 'Create your account'}
            </p>
          </div>

          {/* Toggle buttons */}
          {!isLogin && (
            <div style={{ marginBottom: '16px' }}>
              <button 
                onClick={() => setIsLogin(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1e88e5',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Already have an account? Login
              </button>
            </div>
          )}

          {message && (
            <div style={{ 
              backgroundColor: '#e3f2fd', 
              border: '1px solid #2196f3',
              color: '#1976d2',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              {message}
            </div>
          )}

          <div onKeyPress={handleKeyPress}>
            {!isLogin && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  color: '#555',
                  marginBottom: '6px'
                }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: '#fafafa',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                color: '#555',
                marginBottom: '6px'
              }}>
                Email *
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@enqurious.com"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#fafafa',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                color: '#555',
                marginBottom: '6px'
              }}>
                Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    paddingRight: '50px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: '#fafafa',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#666'
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {isLogin && (
              <div style={{ marginBottom: '32px' }}>
                <button 
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1e88e5',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button 
              type="button"
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#1e88e5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1976d2')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e88e5')}
            >
              {isLogin ? 'Login' : 'Sign Up'} →
            </button>

            {isLogin && (
              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <span style={{ color: '#666', fontSize: '14px' }}>Don't have an account? </span>
                <button 
                  type="button"
                  onClick={() => setIsLogin(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1e88e5',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          position: 'absolute', 
          bottom: '40px', 
          left: '60px',
          fontSize: '12px',
          color: '#666'
        }}>
          Having trouble? Please contact{' '}
          <a href="mailto:notifications@enqurious.com" style={{ color: '#1e88e5' }}>
            notifications@enqurious.com
          </a>
        </div>
      </div>

      {/* Right Side - Background Image Area */}
      <div style={{
        flex: '1',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Placeholder for background image - you can replace this with your image */}
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/logo-image.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        </div>

        {/* Footer */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '60px',
          right: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.6)'
        }}>
          <div>
            © 2025 Enqurious, All rights reserved. | <span style={{ color: '#1e88e5' }}>Privacy policy</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ cursor: 'pointer' }}>📺</span>
            <span style={{ cursor: 'pointer' }}>💼</span>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;