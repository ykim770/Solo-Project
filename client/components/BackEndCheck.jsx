import React, { useEffect, useState } from 'react';

const BackEndCheck = () => {
  const [data, setData] = useState('NOT UPDATED');
  useEffect(() => {
    (async function callBackend() {
      try {
        const res = await fetch('http://localhost:3000/express');
        const body = await res.json();
        setData(body.express);
      } catch (err) {
        console.log('broke at the response');
      }
    })();
  });
  return (
    <>
      <div>{data}</div>
    </>
  );
};

export default BackEndCheck;
