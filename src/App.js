import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Items from './ItemsComponent';

function App() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {

    const getData = () => {
      fetch('/get-data')
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    getData();

  }, [])


  return (
    <div className="wrapper">
      {data && data.map(el =>
        <Items key={el.id} item={el} setItems={setData} />)}
    </div>
  )
}

export default App;
