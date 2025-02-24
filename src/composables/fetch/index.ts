const useFetch = () => {
  const fetchWrapper = async (path: string, options = {}) => {
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
