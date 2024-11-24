import Cookies from "universal-cookie"

const cookie = new Cookies;

export const getCookie = (name:string): string|undefined  => {
    const token:string|undefined = cookie.get(name)
    return token
    
}

export const deleteCookie = (name:string): void =>  {
    cookie.remove(name)
}

export const setCookie = (nameCookie:string, token:string, maxAge:number) :void => { 
    cookie.set(nameCookie, token, { maxAge : maxAge }); 
}