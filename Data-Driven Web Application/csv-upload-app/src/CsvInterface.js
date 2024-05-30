import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "react-table/react-table.css";
import ReactTable from "react-table";
import CsvInput from "./CsvInput";

function CsvInterface() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [basePrice, setBasePrice] = useState(0);
  const [pricePerCreditLine, setPricePerCreditLine] = useState(0);
  const [pricePerCreditScorePoint, setPricePerCreditScorePoint] = useState(0);

  useEffect(() => {
    if (originalData.length && columns.length) setLoading(false);
  }, [originalData, columns]);

  useEffect(() => {
    if (originalData.length > 0) {
      const updatedData = originalData.map(row => ({
        ...row,
        SubscriptionPrice: calculateSubscriptionPrice(row.CreditScore, row.CreditLines).toFixed(2)
      }));
      setData(updatedData);
    }
  }, [basePrice, pricePerCreditLine, pricePerCreditScorePoint, originalData]);

  const handleFileChange = (file) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: handleDataChange
    });
  };

  const makeColumns = (rawColumns) => {
    return rawColumns.map((column) => {
      return { Header: column, accessor: column };
    }).concat({
      Header: 'Subscription Price',
      accessor: 'SubscriptionPrice'
    });
  };

  const calculateSubscriptionPrice = (creditScore, creditLines) => {
    return parseFloat(basePrice) +
           parseFloat(pricePerCreditLine) * parseFloat(creditLines) +
           parseFloat(pricePerCreditScorePoint) * parseFloat(creditScore);
  };

  const handleDataChange = (file) => {
    setOriginalData(file.data);
    const updatedData = file.data.map(row => ({
      ...row,
      SubscriptionPrice: calculateSubscriptionPrice(row.CreditScore, row.CreditLines).toFixed(2)
    }));
    setData(updatedData);
    setColumns(makeColumns(file.meta.fields));
  };

  return (
    <div>
      <CsvInput handleFileChange={handleFileChange} data={data} />
      <div>
        <h2>Set Pricing Parameters</h2>
        <div>
          <label>
            Base Price:
            <input type="number" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Price Per Credit Line:
            <input type="number" value={pricePerCreditLine} onChange={(e) => setPricePerCreditLine(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Price Per Credit Score Point:
            <input type="number" value={pricePerCreditScorePoint} onChange={(e) => setPricePerCreditScorePoint(e.target.value)} />
          </label>
        </div>
      </div>
      {!loading && (
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      )}
    </div>
  );
}

export default CsvInterface;
