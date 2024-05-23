// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  // TODO: we will not hard code server url here
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json();
    resolve({data})
  });
}
