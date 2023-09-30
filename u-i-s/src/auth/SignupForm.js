import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Label, FormGroup, Button } from "reactstrap";


function SignupForm({ signup }) {
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "SignupForm",
        "signup=", typeof signup,
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
        let result = await signup(formData);
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
                    
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="name">
                    First Name:
                </Label>
                <Input 
                    name="firstName"
                    type="text"
                    placeholder="first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="name">
                    Last Name:
                </Label>
                <Input 
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="name">
                    email:
                </Label>
                <Input 
                    name="email"
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                    
                />
            </FormGroup>

                {
                formErrors.length 
                    ? "Errors" 
                    : null
                }
            <Button onSubmit={handleSubmit}>
                Sign Up
            </Button>
        </Form>
        </div>
    )
};

export default SignupForm;