import { toast } from '@/components/ui/use-toast';
import { ApiResponseFailed } from '@/types/apiResponse';

const isFailedResponse = (error: any): error is ApiResponseFailed => {
    return error && typeof error === 'object' && typeof error.error == 'string';
};

export const errorHandler = (error: unknown) => {
    console.log('errorHandlerFrontend', error);

    const title = "Error";
    const variant = 'destructive'
    if (isFailedResponse(error)) {
        toast({
            title,
            variant,
            description: error.error || 'An unknown error occurred 1',
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
