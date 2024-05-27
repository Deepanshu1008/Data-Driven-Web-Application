import React, { useState } from 'react';
import Upload from './components/Upload';
import DataDisplay from './components/DataDisplay';
import SubscriptionCalculator from './components/SubscriptionCalculator';

const App = () => {
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleUpload = () => {
    setDataUpdated(!dataUpdated);
  };

  return (
    <div>
      <Upload onUpload={handleUpload} />
      <DataDisplay key={dataUpdated} />
      <SubscriptionCalculator />
    </div>
  );
};

export default App;
