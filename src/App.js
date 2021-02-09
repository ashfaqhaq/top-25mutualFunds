import './App.css';
import React, {useState,useEffect} from 'react';
import ContentLoader from 'react-content-loader'
import MUIDataTable from "mui-datatables";
import svg from "./finance-1.1s-47px.svg"

const MyLoader = () => (
  <ContentLoader viewBox="0 0 380 70">
    {/* Only SVG shapes */}    
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" style={{color:'red'}}/>
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
)
function App() {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
   fetch("https://top-25-mutualfunds.herokuapp.com/top-25")
   .then(resp=>(resp.json()))
   .then(json=>{
    let obj = json;
      let result = Object.keys(obj).map((key) => [(key), obj[key].slice(0,5)].flat());
 
     return(
       setData(result)
   )})
   .then(()=>setisLoading(false))
   .catch(err=>{
     setError(err);
   });
  }, [])

  const columns = ["Name", "Day 1", "Day 2", "Day 3","Day 4","Day 5"];
  // console.log("data",data);
  return (
    <div className="App">
      {error?<p>An error occured, please refresh the page once if required.</p>:null}
      {isLoading? <header>
       <img src ={svg} alt="loading" width="170px" height="300px"/>
        <h1>Loading</h1>
         
        <MyLoader />
      
      </header>: <header>
      <MUIDataTable
  title={"Top 25 Mutual Funds List"}
  data={data}
  columns={columns}
  className="App-header"
/>
      </header>}
     
    
    </div>
  );
}

export default App;
