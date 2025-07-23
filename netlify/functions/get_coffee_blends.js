import { neon } from '@netlify/neon';

const sql = neon();

export async function handler() {
  try {
    const blends = await sql`SELECT * FROM coffee_blends`;
    return {
      statusCode: 200,
      body: JSON.stringify(blends),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
