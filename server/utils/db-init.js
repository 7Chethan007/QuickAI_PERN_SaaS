import sql from '../configs/db.js';
import dotenv from 'dotenv';

dotenv.config();

async function createArticlesTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        prompt TEXT,
        content TEXT,
        type VARCHAR(50),
        publish BOOLEAN DEFAULT false,
        likes TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "articles" created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

createArticlesTable();
