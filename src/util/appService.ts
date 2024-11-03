export const fetchNewsAPI = async (params: any) => {
  const { q, from, sortBy, pageSize, page } = params;

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      q
    )}&pageSize=${pageSize}&from=${from}&sortBy=${sortBy}&page=${page}&apiKey=${
      process.env.REACT_APP_NEWS_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchGuardianApi = async (params: any) => {
  const { q, from, page } = params;
  const response = await fetch(
    `https://content.guardianapis.com/search?q=${encodeURIComponent(
      q
    )}&from=${from}&page=${page}&api-key=${
      process.env.REACT_APP_GAURDIAN_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchNewYorkTimesApi = async (params: any) => {
  const { q, from, sortBy, page } = params;
  const response = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(
      q
    )}&from=${from}&page=${page}&sortBy=${sortBy}&api-key=${
      process.env.REACT_APP_NYTIMES_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
