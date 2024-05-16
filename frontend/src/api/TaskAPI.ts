//import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { Project, TaskFormData } from '../types';
import axios from 'axios';

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project['_id']
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