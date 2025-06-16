import React, { useEffect, useState } from 'react';

const Api = () => {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setAllData(data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      } finally {
        console.log('API called');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#3498db' }}>API Data</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#2c3e50' }}>Total Products:</h2>
        <h3 style={{ color: '#e74c3c' }}>{allData.total || 'Loading...'}</h3>
      </div>

      <div>
        <h2 style={{ color: '#2c3e50' }}>Products List</h2>
        {loading ? (
          <p style={{ color: '#7f8c8d' }}>Loading...</p>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '10px',
            }}
          >
            {allData?.products?.map((product) => (
              <div
                key={product.id}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h3 style={{ color: '#34495e' }}>{product.title}</h3>
                <p style={{ color: '#7f8c8d', margin: 0 }}>
                  Price: ${product.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Api;
