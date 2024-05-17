//import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";
import axios from "axios";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = `http://localhost:4000/api/auth/create-account`
        const {data} = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = `http://localhost:4000/api/auth/confirm-account`
        const {data} = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = `http://localhost:4000/api/auth/request-code`
        const {data} = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = `http://localhost:4000/api/auth/login`
        const {data} = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = `http://localhost:4000/api/auth/forgot-password`
        const {data} = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function validateToken(formData: ConfirmToken) {
    try {
        const url = `http://localhost:4000/api/auth/validate-token`
        const {data} = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    try {
        const url = `http://localhost:4000/api/auth/update-password/${token}`
        const {data} = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

