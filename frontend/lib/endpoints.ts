
const baseUrl:string | undefined = process.env.NEXT_PUBLIC_API_URL;
const authRoute:string = "auth"

export const methods = {
    auth:{
        signUp:baseUrl+authRoute+"create-account",
        signIn:baseUrl+authRoute+"login",
        recoverPassword:baseUrl+authRoute
    }
}