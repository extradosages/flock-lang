type Ok<T> = { success: true; data: T };
export const ok = <T>(data: T): Ok<T> => ({ success: true, data });

type Error<E> = { success: false; error: E };
export const error = <E>(error: E): Error<E> => ({ success: false, error });

type Result<T, E> = Ok<T> | Error<E>;

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> =>
    result.success === true;

export const isError = <T, E>(result: Result<T, E>): result is Error<E> =>
    result.success === false;
