import {object, string, ref} from 'yup';

export const createUserSchema = object({
    body: object({
        name: string().required('Name is required'),
        password: string()
        .required('Password is required')
        .min(6,"password is too short - should be at least 6 characters"),
        passwordConfirmation : string().oneOf(
            [ref("password"), null],
            "Password is Must"
        ),
        email:string()
        .email("Must be valid email")
        .required('Email is required'),
    
    }),
});

export const createUserSessionSchema = object({
    body: object({
        name: string().required('Name is required'),
        password: string()
        .required('Password is required')
        .min(6,"password is too short - should be at least 6 characters"),
        
        email:string()
        .email("Must be valid email")
        .required('Email is required'),
    
    }),
});