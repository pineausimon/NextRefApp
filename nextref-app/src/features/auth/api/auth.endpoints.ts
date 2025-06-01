import axios from '../../../shared/api/axiosInstance';

export interface RegisterUserCommand {
    email: string;
    password: string;
    userName: string;
}

export interface LoginUserCommand {
    userName: string;
    password: string;
}

export const registerUser = async (command: RegisterUserCommand) => {
    const result = await axios.post('/users/register', command);
    return result.data;
};

export const loginUser = async (command: LoginUserCommand) => {
    const result = await axios.post('/users/login', command);
    return result.data;
};
