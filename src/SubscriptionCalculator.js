import React, { useState } from "react";

function SubscriptionCalculator({ data }) {
  const [basePrice, setBasePrice] = useState(0);
  const [pricePerCreditLine, setPricePerCreditLine] = useState(0);
  const [pricePerCreditScorePoint, setPricePerCreditScorePoint] = useState(0);
  const [subscriptionPrice, setSubscriptionPrice] = useState(null);

  const calculateSubscriptionPrice = () => {
    if (data.length === 0) return;

    const { CreditScore, CreditLines } = data[0]; // Using the first entry for simplicity
    const price = parseFloat(basePrice) +
                  parseFloat(pricePerCreditLine) * parseFloat(CreditLines) +
                  parseFloat(pricePerCreditScorePoint) * parseFloat(CreditScore);
    setSubscriptionPrice(price.toFixed(2));
  };

  return (
    <div>
      <h2>Subscription Pricing Calculator</h2>
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
      <button onClick={calculateSubscriptionPrice}>Calculate Subscription Price</button>
      {subscriptionPrice && <h3>Subscription Price: ${subscriptionPrice}</h3>}
    </div>
  );
}

export default SubscriptionCalculator;
