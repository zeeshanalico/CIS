import { ApiResponseSuccess } from "@/types/apiResponse";
import { toast } from "@/components/ui/use-toast";
const isResponseSuccess = <T>(res: ApiResponseSuccess<T>): res is ApiResponseSuccess<T> => {
    return res.success && typeof res.result === 'object' && typeof res.message === 'string';
};

export const successHandler = <T>(res: ApiResponseSuccess<T>): void => {
    const title = "Success";
    const variant = 'default'
    if (isResponseSuccess(res)) {
        toast({
            title,
            variant,
            description: res.message || 'Successfully responded!',
        });
    } else {
        toast({
            title: title,
            variant,
            description: 'Successfull Response.',
        });
    }
}