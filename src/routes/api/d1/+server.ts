import { json } from '@sveltejs/kit';

export async function GET({ platform }) {

  if (!platform?.env.TEST_D1) {
    return json({ error: "TEST_D1 not available" }, { status: 404 });
  }

  try {

    const { results } = await platform?.env.TEST_D1.prepare(
      "SELECT * FROM Customers"
    )
      .all();
    return json(results);
  } catch (e) {
    console.log(e.stack);
    return json({ error: e }, { status: 500 });
  }
}

export async function POST({ platform, request }) {

  if (!platform?.env.TEST_D1) {
    return json({ error: "TEST_D1 not available" }, { status: 404 });
  }

  const data = await request.json() || {};
  if (!data.id) {
    data.id = new Date().getTime();
  } else {
    data.id = data.id.toString();
  }
  if (!data.CompanyName) {
    data.CompanyName = "Test Company";
  }
  if (!data.ContactName) {
    data.ContactName = "Test Contact";
  }

  try {
    const db = platform?.env.TEST_D1;
    const results = await db.prepare(
      "INSERT INTO Customers (CustomerId, CompanyName, ContactName) values (?1, ?2, ?3)"
    )
      .bind(data.id.toString(), data.CompanyName, data.ContactName)
      .run();

    return json(results);

  } catch (e) {
    console.log(e.stack);
    return json({ error: e }, { status: 500 });
  }
}