import React from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Enqurious Tribe Dashboard</h1>
            <button className="btn btn-outline-danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome back, {user.name}!</h5>
              <p className="card-text">Email: {user.email}</p>
              <p className="card-text">User ID: {user.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Channels</h5>
              <h3 className="text-primary">5</h3>
              <small className="text-muted">Active channels</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Articles</h5>
              <h3 className="text-success">12</h3>
              <small className="text-muted">Articles read</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Comments</h5>
              <h3 className="text-info">8</h3>
              <small className="text-muted">Comments posted</small>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <strong>New article:</strong> "Getting Started with React"
                  <small className="text-muted d-block">2 hours ago</small>
                </div>
                <div className="list-group-item">
                  <strong>Joined channel:</strong> Web Development
                  <small className="text-muted d-block">1 day ago</small>
                </div>
                <div className="list-group-item">
                  <strong>Comment on:</strong> "AI in Education"
                  <small className="text-muted d-block">3 days ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-primary">Browse Channels</button>
                <button className="btn btn-success">Read Articles</button>
                <button className="btn btn-info">Write Article</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;