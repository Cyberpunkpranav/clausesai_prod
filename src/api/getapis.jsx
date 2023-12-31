import axios from "./axios";
import toast from "react-hot-toast";

export const Search_clauses = async(search)=>{
    let res;
    try {
      const response= await axios.get(`/api/user/services/libraries/clauses/query?search=${search}`)
      res=response
    } catch (error) {
        toast.error(error.message)
    }
    return res
}

export const GetClauses = async(req)=>{
    let res;
    try {
      const response= await axios.get(`/api/user/services/libraries/clauses/allclauses?limit=${req.limit}&offset=${req.offset}&search=${req.search}`)
      res=response
    } catch (error) {
        toast.error(error.message)
    }
    return res
    }
    
export const GetClausesByName = async(clause_name)=>{
    let res;
    try {
      const response= await axios.get(`/api/user/services/libraries/clauses/view?clause_name=${clause_name}`)
      res=response
    } catch (error) {
        toast.error(error.message)
    }
    return res
    }

    export const Non_user_Access = async()=>{
        let data;
    try {
        await axios.get(`/non_user_auth`).then((response)=>{
            data = response
           })
    } catch (error) {
        toast.error(error.message)
    }
    return data
    }