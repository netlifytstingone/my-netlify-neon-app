import { neon } from '@netlify/neon';

const sql = neon(); // Automatically reads NETLIFY_DATABASE_URL env var

export async function handler() {
  try {
    const blends = await sql`SELECT * FROM coffee_blends`;
    return {
      statusCode: 200,
      body: JSON.stringify(blends),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
