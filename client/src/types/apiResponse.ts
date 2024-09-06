export interface ApiResponseSuccess<T> {
    message: string | null
    success: boolean
    result: T
}
export interface ApiResponseFailed {
    success: boolean
    error: string
    result: null
}

export interface FailedResponse {
    status: number;
    data: ApiResponseFailed;
}

