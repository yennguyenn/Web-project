import './App.css';
import axios from "axios"
import { useEffect } from 'react'
function App() {
  useEffect(() => {

    axios.get("http://localhost:8080/api/getUserById?id=1")
      .then(response => {
        console.log(response.data);

      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  
  return <div>contro</div>;
}

export default App;