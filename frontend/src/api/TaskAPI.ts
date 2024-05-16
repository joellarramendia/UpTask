//import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { Project, Task, TaskFormData } from '../types';
import axios from 'axios';

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks`
        const {data} = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function getTaskById({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`
        const { data } = await axios.get(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateTask({projectId, taskId, formData}: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`
        const { data } = await axios.put<string>(url, formData)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function deleteTask({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}`
        const { data } = await axios.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateStatus({projectId, taskId, status} : Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await axios.post<string>(url, {status})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}