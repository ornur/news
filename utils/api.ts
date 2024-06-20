import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://10.144.251.6:8080",
    withCredentials: true,
});

export const getUserFromDB = async (phone: string, password: string) => {
    try {
        const response = await axiosInstance.post("/login", {
            phone,
            password,
        });

        return response.data;
    } catch (error) {
        throw error;
    }  
};
