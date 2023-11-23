import { json } from '@sveltejs/kit';

export async function POST({ platform }) {

  if (!platform?.env.TEST_D1) {
    return json({ error: "TEST_D1 not available" }, { status: 404 });
  }

  try {
    const db = platform?.env.TEST_D1;
    const results = await db.exec(
      `CREATE TABLE IF NOT EXISTS Customers ( CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT );`
    );
    return json(results);

  } catch (e) {
    console.log(e.stack);
    return json({ error: e, msg: "CREATE TABLE" }, { status: 500 });
  }
}