import React, { useState } from "react";
import { calculateSubscriptionPrice } from "../api";

const SubscriptionCalculator = () => {
  const [form, setForm] = useState({
    creditScore: "",
    creditLines: "",
    basePrice: "",
    pricePerCreditLine: "",
    pricePerCreditScorePoint: "",
  });
  const [subscriptionPrice, setSubscriptionPrice] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await calculateSubscriptionPrice(form);
      setSubscriptionPrice(response.data.subscriptionPrice);
    } catch (error) {
      console.error("Error calculating subscription price:", error);
    }
  };

  return (
    <div>
      <h2><a href="https://github.com/Deepanshu1008/Data-Driven-Web-Application" target="_blank" rel="noopener noreferrer">GitHub Repository</a></h2>

      <h2>Subscription Calculator</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="creditScore"
          placeholder="Credit Score"
          value={form.creditScore}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="creditLines"
          placeholder="Credit Lines"
          value={form.creditLines}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="basePrice"
          placeholder="Base Price"
          value={form.basePrice}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="pricePerCreditLine"
          placeholder="Price Per Credit Line"
          value={form.pricePerCreditLine}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="pricePerCreditScorePoint"
          placeholder="Price Per Credit Score Point"
          value={form.pricePerCreditScorePoint}
          onChange={handleChange}
          required
        />
        <button type="submit">Calculate</button>
      </form>
      {subscriptionPrice !== null && (
        <p>Subscription Price: ${subscriptionPrice}</p>
      )}
    </div>
  );
};

export default SubscriptionCalculator;
