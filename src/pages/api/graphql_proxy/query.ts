import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { body } = req;

  const { endpoint, query, variables = {}, headers = {} } = JSON.parse(body);
  console.log('endpoint:', endpoint);
  console.log('query:', query);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error('GraphQL Proxy Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
