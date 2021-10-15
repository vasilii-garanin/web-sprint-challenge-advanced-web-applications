import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const initialError = "UserName and Password must be filled in !";

const Login = (props) =>
{

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState(initialError);

    const handleChange = e =>
    {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });

        if (credentials.username !== "" && credentials.password !== "")
        {
            setError("");
        }
        else
        {

            setError(initialError);
        }
    };

    const login = e =>
    {
        console.log("Submitted", credentials);
        e.preventDefault();

        axios.post("http://localhost:5000/api/login", credentials)
            .then(resp =>
            {
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("role", resp.data.role);
                localStorage.setItem("username", resp.data.username);
                props.history.push('/protected');
            })
            .catch(error =>
            {
                setError(error.response.data);
                console.log(error);
            });
    };

    return (<ComponentContainer>
        <ModalContainer>
            <h1>Welcome to Blogger Pro</h1>
            <h2>Please enter your account information.</h2>
            {error && <P id="error">{error}</P>}
            <form onSubmit={login}>
                <Input type="text"
                    name="username"
                    // className="inputField"
                    placeholder="Your User Name is Required"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <Input type="password"
                    name="password"
                    // className="inputField"
                    placeholder="Your Password is Required"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <Button>Login</Button>
            </form>
        </ModalContainer>
    </ComponentContainer>);
};

export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. ****
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`;

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`;

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`;

const FormGroup = styled.form`
    padding:1rem;
`;

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
    text-align: center; 
`;

const Button = styled.button`
    padding:1rem;
    width: 100%;
`;
const P = styled.p`
color:red;
`;