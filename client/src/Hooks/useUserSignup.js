import React from 'react'
import { toast } from "react-hot-toast";
import { useAuthContext } from "../authContext/AuthContext.jsx";

const useUserSignup = () => {
    const { setAuthUser, setUser } = useAuthContext();

    const signup = async (input) => {
        // Validate all fields
        const isValid = validateInput(input);
        if (!isValid){ 
            return;
        }

        try {
            // Transform the input to match backend expectations
            const transformedInput = {
                ...input,
                fullname: input.fullName,
            };
            delete transformedInput.fullName;

            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
            const res = await fetch(`${API_URL}/auth/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transformedInput) 
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                toast.error(data.error || "Signup failed. Please try again.");
                return;
            }

            // Update context with session-based auth
            setAuthUser("user");
            setUser({ userType: "user", ...data });

            toast.success("Signup successful!");
            console.log(data);

        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        }
    };
    return { signup };
}

export default useUserSignup

const validateInput = (input) => {
    const { email, fullName, university_rollno, class_rollno, password, confirmPassword } = input;

    if (!email || !fullName || !university_rollno || !class_rollno || !password || !confirmPassword) {
        toast.error("Please fill in all fields.");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return false;
    }

    return true;
}