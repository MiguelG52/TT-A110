
const baseUrl:string | undefined = process.env.NEXT_PUBLIC_API_URL;
const authRoute:string = "auth"

export const methods = {
    auth:{
        signUp:baseUrl+authRoute+"/create-account",
        signIn:baseUrl+authRoute+"/login",
        forgotPassword:baseUrl+authRoute+'/forgot-password',
        confirmAccount:baseUrl+authRoute+'/confirm-account',
        resetPassword:baseUrl+authRoute+'/reset-password',
        getUserData:baseUrl+authRoute+'/get-user-data',
    }
}