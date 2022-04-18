import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';

function App() {

  const [book,setBook] = useState("");
  const [result,setResult] = useState([]);
  const [apiKey,setApiKey] = useState("AIzaSyCwQlq9W6zsbSd0J1Qdyn5_T-DRwUPoGaM");

  function handleChange(event){

    const book = event.target.value;
    setBook(book);
  }

  
  function handleSubmit(event){
    event.preventDefault();
    console.log(book);
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key="+apiKey+"&maxResults=40").then(data => {
      console.log(data.data.items);
      setResult(data.data.items);
    })
  }

  return (
       <div className='container'>
        <h1>Search For Books</h1>
           <form onSubmit={handleSubmit}>
             <div className='form-group'>
               <input type="text" className="form-control" placeholder="Search For Books" autoComplete = "off" onChange={handleChange}/>
             </div>
             <button type="submit" className="btn btn-success btncss"> Search </button>
           </form>

           {result.map(book=>(     
             <div className="bookContainer">
               <a href={book.volumeInfo.previewLink} target="_blank">
               <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} width="200px" height="200px" className="imagecss"/>
              </a>
             </div> 
            ))}
       </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
