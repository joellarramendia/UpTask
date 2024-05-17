//import api from "@/lib/axios";
import { Project, ProjectFormData, dashboardProjectSchema } from "../types";
import axios, { isAxiosError } from "axios";


export async function createProject(formData: ProjectFormData) {
   const token = localStorage.getItem('AUTH_TOKEN')
   try {
      const {data} = await axios.post('http://localhost:4000/api/projects', formData, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
      return data
   } catch (error) {
      if(isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}


export async function getProjects() {
   const token = localStorage.getItem('AUTH_TOKEN')
   console.log(token)
   try {
      const {data} = await axios.get('http://localhost:4000/api/projects', {
         headers: {
            Authorization: `Bearer ${token}`
         }
      
      })
      const response = dashboardProjectSchema.safeParse(data)
      if(response.success) {
         return response.data
      }
   } catch (error) {
      if(isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   } 
    
}


export async function getProjectById(id: Project['_id']) {
    const token = localStorage.getItem('AUTH_TOKEN')
   try {
      const {data} = await axios.get(`http://localhost:4000/api/projects/${id}`, {
        headers: {
           Authorization: `Bearer ${token}`
        }
     })
      return data
   } catch (error) {
      if(isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   } 
    
}


type ProjectAPIType = {
   formData: ProjectFormData,
   projectId: Project['_id']
}

export async function updateProject({formData, projectId}: ProjectAPIType ) {
    const token = localStorage.getItem('AUTH_TOKEN')
   try {
      const {data} = await axios.put<String>(`http://localhost:4000/api/projects/${projectId}`, formData,{
        headers: {
           Authorization: `Bearer ${token}`
        }
     })
      return data
   } catch (error) {
      if(isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   } 
    
}


export async function deleteProject(id: Project['_id']) {
    const token = localStorage.getItem('AUTH_TOKEN')
   try {
      const {data} = await axios.delete<string>(`http://localhost:4000/api/projects/${id}`, {
        headers: {
           Authorization: `Bearer ${token}`
        }
     })
      return data
   } catch (error) {
      if(isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   } 
    
}

