const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env' });

const { Pool } = require('pg');

// Database connection
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Database test route
app.get('/api/db-test', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.json({ 
        message: 'Database connected!', 
        time: result.rows[0].now 
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Database connection failed', 
        details: error.message 
      });
    }
  });

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      const user = result.rows[0];
      
      // For now, simple password comparison (we'll improve this later)
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      res.json({ message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  const bcrypt = require('bcryptjs');

// Registration route
app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, hashedPassword, name]
    );
    
    res.status(201).json({ 
      message: 'User created successfully', 
      user: result.rows[0] 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});