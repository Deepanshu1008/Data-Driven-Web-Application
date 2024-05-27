import React, { useEffect, useState } from "react";
import { fetchData } from "../api";

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async (page) => {
    try {
      const response = await fetchData(page);
      setData(response.data.data);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  return (
    <div>
      <h2>Data Display</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Credit Score</th>
            <th>Credit Lines</th>
            <th>Masked Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.email}</td>
              <td>{row.name}</td>
              <td>{row.credit_score}</td>
              <td>{row.credit_lines}</td>
              <td>{row.masked_phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;
