import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Label, FormGroup, Button } from "reactstrap";


function LoginForm({ login }) {
    const INITIAL_STATE = {
        username: "",
        password: ""
    }
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors=", formErrors,
    );
     
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
        navigate("/teams");
        } else {
        setFormErrors(result.errors);
        }
    };

    return (
        <div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="name">
                    Username:
                </Label>
                <Input 
                    name="username"
                    type="text"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="name">
                    Password:
                </Label>
                <Input 
                    name="password"
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="password"
                    required
                />
            </FormGroup>

                {
                formErrors.length 
                    ? "Errors" 
                    : null
                }
            <Button onSubmit={handleSubmit}>
                Login
            </Button>
        </Form>
        </div>
    )
};

export default LoginForm;