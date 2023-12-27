import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { body } = req;

  const { endpoint, query, variables = {} } = JSON.parse(body);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: req.headers as Record<string, string>,
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
