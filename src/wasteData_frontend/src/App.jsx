import { useState, useEffect } from 'react';
import { wasteData_backend } from 'declarations/wasteData_backend';

function App() {
  const [wasteType, setWasteType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [wasteList, setWasteList] = useState([]);
  const [wasteById, setWasteById] = useState(null);
  const [idToSearch, setIdToSearch] = useState('');

  // Function to handle creating new waste data
  async function handleCreateWaste(event) {
    event.preventDefault();
    try {
      const newWaste = await wasteData_backend.createWaste(wasteType, Number(quantity));
      setWasteList([...wasteList, newWaste]);
      setWasteType('');
      setQuantity('');
    } catch (error) {
      console.error("Failed to create waste data:", error);
    }
  }

  // Function to handle searching waste data by ID
  async function handleSearchById(event) {
    event.preventDefault();
    try {
      const waste = await wasteData_backend.getWasteById(Number(idToSearch));
      setWasteById(waste);
      setIdToSearch('');
    } catch (error) {
      console.error("Failed to fetch waste data by ID:", error);
    }
  }

  // Function to fetch all waste data when the component mounts
  useEffect(() => {
    async function fetchAllWaste() {
      try {
        const allWaste = await wasteData_backend.listAllWaste();
        setWasteList(allWaste);
      } catch (error) {
        console.error("Failed to fetch all waste data:", error);
      }
    }

    fetchAllWaste();
  }, []);

  return (
    <main>
      <h1>Waste Data Management</h1>

      <section>
        <h2>Create Waste Data</h2>
        <form onSubmit={handleCreateWaste}>
          <label>
            Waste Type:
            <input
              type="text"
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Create Waste</button>
        </form>
      </section>

      <section>
        <h2>Search Waste Data by ID</h2>
        <form onSubmit={handleSearchById}>
          <label>
            Waste ID:
            <input
              type="number"
              value={idToSearch}
              onChange={(e) => setIdToSearch(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Search</button>
        </form>
        {wasteById && (
          <div>
            <h3>Waste Data for ID: {wasteById.id}</h3>
            <p>Type: {wasteById.wasteType}</p>
            <p>Quantity: {wasteById.quantity}</p>
            <p>Created At: {new Date(Number(wasteById.createdAt / 1000000n)).toLocaleString()}</p>
          </div>
        )}
      </section>

      <section>
        <h2>All Waste Data</h2>
        <ul>
          {wasteList.map((waste) => (
            <li key={waste.id}>
              <strong>ID: {waste.id}</strong> | Type: {waste.wasteType} | Quantity: {waste.quantity} | Created At: {new Date(Number(waste.createdAt / 1000000n)).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;