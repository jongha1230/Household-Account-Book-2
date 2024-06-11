async function fetchData() {
  const response = await fetch("http://localhost:3000/expense");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  console.log("data", data);
  return data;
}

export default fetchData;
