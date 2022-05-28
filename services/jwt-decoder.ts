import jwtDecode from 'jwt-decode';

/**
 * Description - decode jwt token from server
 * @param token - desired token to be decoded
 */
export const Decoder = (token: any) => {
    return jwtDecode(token)
} 