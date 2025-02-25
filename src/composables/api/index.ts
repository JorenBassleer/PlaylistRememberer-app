const useFetch = () => {
  const fetchWrapper = async <T>(path: string, options = {}): Promise<T> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
      credentials: 'include',
      ...options,
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    return response.json();
  };

  return {
    fetch: fetchWrapper,
  };
};

export default useFetch;
