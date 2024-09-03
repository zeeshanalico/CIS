export interface ApiResponseSuccess<T> {
    message: string
    success: boolean
    result: T
}
export interface ApiResponseFailed {
    success: boolean
    error: string
    result: null
}

