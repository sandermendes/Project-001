import React from "react";

export interface ISignUpStep1 {
    firstName?: string;
    lastName?: string
}

export interface ISignUpStep2 {
    email?: string,
    password?: string,
    confirm?: string,
}

export interface SignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm: string;
    complete: boolean;
}

export interface StepFormProps {
    errors?: string | null;
    handleNext: () => void;
    handleBack: () => void;
    handleFinish: () => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    signUpData: SignUp;
    setSignUpData: React.Dispatch<React.SetStateAction<SignUp>>;
}

export interface ISignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface ISignUpDataRegister {
    token: string;
    redirect: string;
}

export interface ISignUpData {
    register: ISignUpDataRegister
}
