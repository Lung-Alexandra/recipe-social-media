const endpoint = import.meta.env.VITE_GRAPHQL_URL || '/graphql';

export async function graphqlRequest(query, variables = {}, token) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json();

  if (!response.ok || payload.errors?.length) {
    const message =
      payload.errors?.map((entry) => entry.message).join(', ') ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload.data;
}

export { endpoint };
