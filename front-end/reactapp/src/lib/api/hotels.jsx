const getHotels = async () => {
  const res = await fetch("http://localhost:3000/api/hotel", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // Check if the response is ok (status code 200-299)
  const data = await res.json();
  return data;
};

export { getHotels };
