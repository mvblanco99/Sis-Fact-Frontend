
export type idUser = number;
export type users = 'administrador' | 'doctor' | 'paciente' | idUser

export type EndPointApi = '/api/auth/login'
    |'/api/auth/register'
    |'/api/auth/verify-token'
    |'/api/auth/refresh-token'
    |'/api/auth/logout'
    |'/api/auth/changePassword'
    |`/api/users/`
    |`/api/users/${string}`
    |'/api/departamento'
    |'/api/departamento/store'
    |`/api/departamento/${string}`
    |'/api/categoria'
    |'/api/categoria/store'
    |`/api/categoria/${string}`
    |'/api/articulo'
    |`/api/articulo/store`
    |`/api/articulo/${string}`
    |'/api/factura'
    |`/api/factura/store`
    |`/api/factura/${string}`

export type ErrForActions = {
    status:number,
    statusText:string
}

export type PropsToken = {
    accessToken: string,
    name:string,
    username:string,    
    departamento_id:number,
    id:number
}

export type Panel = 1 | 2;

export type PropsToaster = {
    theme: 'colored' | 'dark' | 'light',
    message: string,
    autoClose?:number,
    type: 'success' | 'error' | 'info' | 'warning'
    position: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-center' | 'top-left' | 'top-right' 
};
