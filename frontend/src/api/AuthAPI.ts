//import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";
import axios from "axios";

export async function createAccount(formData: UserRegistrationForm) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/auth/create-account`
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



export async function confirmAccount(formData: ConfirmToken) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/auth/confirm-account`
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



export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/auth/request-code`
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



export async function authenticateUser(formData: UserLoginForm) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/auth/login`
        const {data} = await axios.post<string>(url, formData, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function forgotPassword(formData: ForgotPasswordForm) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/auth/forgot-password`
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


export async function validateToken(formData: ConfirmToken) {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/auth/validate-token`
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


export async function updatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    const token2 = localStorage.getItem('AUTH_TOKEN')
    try {
        const url = `http://localhost:4000/api/auth/update-password/${token}`
        const {data} = await axios.post<string>(url, formData, {
            headers: {
               Authorization: `Bearer ${token2}`
            }
         })
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
        const {data} = await axios.get(`http://localhost:4000/api/auth/user`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
        const response = userSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

