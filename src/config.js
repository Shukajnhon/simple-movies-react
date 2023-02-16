// For normal RESTful APIs with JSON data
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
