//import api from "@/lib/axios";
import { ProjectFormData } from "../types";
import axios from "axios";


export async function createProject(formData: ProjectFormData) {
   try {
    const {data} = await axios.post('http://localhost:4000/api/projects', formData)
    console.log(data)
   } catch (error) {
    console.log(error)
   }
    
    
}