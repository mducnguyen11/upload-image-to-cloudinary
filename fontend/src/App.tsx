import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css';
import axios from 'axios'

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading ] = useState(false)
  const [url, setUrl] = useState("")
  const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
	};

  useEffect(()=>{
    console.log(selectedFile)
  },[selectedFile])

  const handleUpload = ()=>{
   if(selectedFile){
    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)
    axios({
      method: 'post',
      url: 'http://localhost:3005/upload/image',
      data: formData,
      headers:{
        "Content-Type": "multipart/form-data",
      }
  })
  .then(function (response) {
      console.log(" - response - ");
      setUrl(response.data.secure_url); 
      alert("Upload successfully")
           
  })
  .catch(function (error) {
    console.log(" - error - "); 
    console.log(error);
    alert("Something went wrong ! please try again ...")
  })
  .finally(()=>{
    setIsLoading(false)
  });
   }else{
    alert("You haven't selected any files yet")
   }
  }

  const handleVisitImageUploaded = ()=>{
    if(url){
      window.open(url,'_blank');
    }else{
      alert("You have not uploaded any photos yet")
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
      <input multiple={false} type={"file"} onChange={changeHandler}/>
      <button onClick={handleUpload}>Upload to cloud</button>
      {isLoading &&  <div style={{
          marginTop:"10px",
          color:"green"
        }}>Uploading ...</div>}
        <div style={{
          marginTop:"20px"
        }}><button onClick={handleVisitImageUploaded}>Click here to see the image you just upload</button></div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    
    </div>
  )
}

export default App
