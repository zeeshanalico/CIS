export type ApiResponseType<T> = Promise<ApiResponseSuccess<T> | ApiResponseFailed<T>>

export interface ApiResponseSuccess<T> {
    data: T
    message: string
    success: boolean
}
export interface ApiResponseFailed<T> {
    data: T
    error: string
    success: boolean
}