import { ValidationError } from "joi";
export declare const success: (data?: any, message?: string) => {
    code: number;
    message: string;
    data: any;
    error: {};
};
export declare const error: (error?: any, message?: string, code?: number) => {
    code: number;
    message: string;
    data: {};
    error: any;
};
export declare const errorValidation: (error: ValidationError) => {
    code: number;
    message: string;
    data: {};
    error: any;
};
declare const response: {
    success: (data?: any, message?: string) => {
        code: number;
        message: string;
        data: any;
        error: {};
    };
    error: (error?: any, message?: string, code?: number) => {
        code: number;
        message: string;
        data: {};
        error: any;
    };
    errorValidation: (error: ValidationError) => {
        code: number;
        message: string;
        data: {};
        error: any;
    };
};
export default response;
