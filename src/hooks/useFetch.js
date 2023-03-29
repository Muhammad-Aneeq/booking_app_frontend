import axios from 'axios'
import  { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data,setData] = useState([])
  const [isloading,setIsLoading] = useState(false)
  const [error,setError] = useState(false)

  useEffect(()=>{
    const fetchData =async () =>{
      setIsLoading(true)
   try {
    const {data} = await axios.get(url)
    console.log("data",data)
    setData(data)
   } catch (error) {
    console.log("error",error)
    setError(error)
   }
   setIsLoading(false)
}

fetchData()
  },[url])


    const reFetch = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.get(url);
      setData(data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };
  return {data,isloading,error,reFetch}
}

export default useFetch