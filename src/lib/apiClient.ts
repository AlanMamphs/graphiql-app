class ApiClient {
  async fetchDocs(endpoint: string) {
    return fetch('/api/graphql_proxy/docs', {
      method: 'POST',
      body: JSON.stringify({ endpoint }),
    });
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
    return fetch('/api/graphql_proxy/query', {
      method: 'POST',
      body: JSON.stringify({
        query,
        endpoint,
        headers,
        variables,
      }),
    });
  }
}

const apiClient = new ApiClient();

export default apiClient;
