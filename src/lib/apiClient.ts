class ApiClient {
  async fetchDocs(endpoint: string) {
    const response = await fetch('/api/graphql_proxy/docs', {
      method: 'POST',
      body: JSON.stringify({ endpoint }),
    });

    return response.json();
  }

  async runQuery({
    query,
    endpoint,
    headers,
    variables,
  }: {
    query: string;
    endpoint: string;
    headers: object;
    variables: object;
  }) {
    const response = await fetch('/api/graphql_proxy/query', {
      method: 'POST',
      body: JSON.stringify({
        query,
        endpoint,
        headers,
        variables,
      }),
    });
    return response.json();
  }
}

const apiClient = new ApiClient();

export default apiClient;
