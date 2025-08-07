import React, { useState } from 'react';
import Dashboard from './Dashboard';

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
          // Clear form
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

  // If user is logged in, show dashboard
  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // Otherwise, show login/registration form
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Welcome to Enqurious Tribe</h2>
              
              <div className="d-flex mb-3">
                <button 
                  className={`btn ${isLogin ? 'btn-primary' : 'btn-outline-primary'} flex-fill me-2`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button 
                  className={`btn ${!isLogin ? 'btn-primary' : 'btn-outline-primary'} flex-fill`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>

              {message && <div className="alert alert-info">{message}</div>}
              
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;