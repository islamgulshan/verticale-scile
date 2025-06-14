CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  embedding VECTOR(6)
);

CREATE TABLE candidates (
  id TEXT PRIMARY KEY,
  name TEXT,
  skills TEXT,
  embedding VECTOR(6)
);
-- Insert sample data into jobs table
INSERT INTO candidates (id, name, skills, embedding)
VALUES (
  '4f1e25c0-dd9e-4b3a-924a-92b6f52db8ad',
  'John Doe',
  'JavaScript, Node.js, PostgreSQL',
  '[0.11, 0.23, 0.43, 0.31, 0.29, 0.60]'
);
