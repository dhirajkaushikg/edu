import React from 'react';

interface StructuredDataProps {
  data: object;
  id?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data, id }) => {
  // Convert the data object to a JSON string
  const json = JSON.stringify(data, null, 2);
  
  // Create a unique key based on the data
  const key = id || btoa(json).substring(0, 10);
  
  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: json }}
      key={`json-ld-${key}`}
    />
  );
};

export default StructuredData;