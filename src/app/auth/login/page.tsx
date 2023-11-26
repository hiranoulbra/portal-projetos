"use client"

import { FormEvent } from "react";
import { LoginForm } from "../components/form-login";

const LoginPage = () => {

    /*const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/login', {
            method: 'POST',
            body: formData,
        })
        const data = await response.json();
        alert(data);
    }*/
    return (<LoginForm />)
}
export default LoginPage;