export const fetchAPI = async (url: string) => {
  const data = await fetch(`${url}`);
  const jsonData = await data.json();
  return jsonData.results;
};
