//import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { Project, Task, TaskFormData, taskSchema } from '../types';
import axios from 'axios';

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'>) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks`
        const {data} = await axios.post<string>(url, formData, {
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


export async function getTaskById({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`
        const { data } = await axios.get(url, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
        const response = taskSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateTask({projectId, taskId, formData}: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`
        const { data } = await axios.put<string>(url, formData, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function deleteTask({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`
        const { data } = await axios.delete<string>(url, {
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


export async function updateStatus({projectId, taskId, status} : Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await axios.post<string>(url, {status}, {
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