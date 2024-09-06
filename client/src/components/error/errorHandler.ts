import { toast } from '@/components/ui/use-toast';
import {  FailedResponse } from '@/types/apiResponse';

const isFailedResponse = (error: any): error is FailedResponse => {
    return error && typeof error.data === 'object' && typeof error.data.error === 'string';
};

export const errorHandler = (error: unknown) => {
    const title = "Error";
    const variant = 'destructive'
    if (isFailedResponse(error)) {
        toast({
            title,
            variant,
            description: error.data.error || 'An unknown error occurred',
        });
    } else if (error instanceof Error) {
        toast({
            title: title,
            variant,
            description: error.message || 'An unknown error occurred',
        });
    } else {
        toast({
            title: title,
            variant,
            description: 'An unknown error occurred',
        });
    }
};
