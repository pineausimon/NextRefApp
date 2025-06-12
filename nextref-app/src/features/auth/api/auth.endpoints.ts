import axios from '../../../shared/api/axiosInstance';
import { withErrorHandling } from '../../../shared/api/withErrorHandling';

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
    return withErrorHandling(axios.post('/users/register', command));
};

export const loginUser = async (command: LoginUserCommand) => {
    return withErrorHandling(axios.post('/users/login', command));
};
