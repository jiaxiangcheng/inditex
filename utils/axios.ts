import axios, { Method, AxiosRequestConfig } from "axios";

interface CustomAxiosProps {
    url: string;
    method: Method;
    data?: any;
    params?: any;
    headers?: any;
}

export const customAxios = async ({
    url,
    method,
    data,
    params,
    headers,
}: CustomAxiosProps) => {
    try {
        const config: AxiosRequestConfig = {
            url,
            method,
            headers,
            params,
            data,
        };
        const response = await axios(config);
        const { status, data: responseData } = response;
        if (status >= 400 && status < 600) {
            console.log(
                `Error fetching ${url} with data`,
                responseData
            );
            return [];
        } else {
            return JSON.parse(responseData.contents);
        }
    } catch (error) {
        console.log(
            `Error fetching ${url} with error`,
            error
        );
        throw error;
    }
};
