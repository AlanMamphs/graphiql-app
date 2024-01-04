import { getIntrospectionQuery } from 'graphql';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { endpoint } = JSON.parse(req.body);

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing GraphQL endpoint URL' });
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery({}) }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GraphQL schema: ${response.statusText}`);
    }

    const schema = await response.json();

    res.status(response.status).json(schema.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
