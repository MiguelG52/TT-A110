export type TransportConfig = {
    host: string,
    port: number,
    secure?: boolean,
    tls?:{
        ciphers:string
    },
    requireTLS?:boolean,
    debug?: boolean,
    connectionTimeout?: number,
    auth: {
        user: string,
        pass: string
    }
}

export type Email = {
    name:string,
    email:string,
    token:string
}