import type { AxiosResponse } from 'axios';

export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

export async function withErrorHandling<T>(promise: Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> {
    try {
        const response = await promise;
        return { success: true, data: response.data };
    } catch (error: any) {
        let message = "Une erreur est survenue.";
        if (error.response?.data?.message) {
            message = error.response.data.message;
        } else if (error.message) {
            message = error.message;
        }
        return { success: false, error: message };
    }
}