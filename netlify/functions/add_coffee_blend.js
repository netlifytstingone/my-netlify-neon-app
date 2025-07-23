import { neon } from '@netlify/neon';

const sql = neon();

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { name, origin } = JSON.parse(event.body);

    if (!name || !origin) {
      return { statusCode: 400, body: "Missing name or origin" };
    }

    await sql`
      INSERT INTO coffee_blends (name, origin)
      VALUES (${name}, ${origin})
    `;

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Added successfully" })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
