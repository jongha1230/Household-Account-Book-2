async function fetchData() {
  const response = await fetch("http://localhost:3000/expense");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();

  return data;
}

export default fetchData;
