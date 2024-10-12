CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role VARCHAR(10) DEFAULT 'user' -- Can be 'user' or 'admin'
);

CREATE TABLE deals (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  category VARCHAR(50),
  subcategory VARCHAR(50),
  image_url TEXT,
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT,
  user_id INTEGER REFERENCES users(id),
  deal_id INTEGER REFERENCES deals(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  deal_id INTEGER REFERENCES deals(id)
);
