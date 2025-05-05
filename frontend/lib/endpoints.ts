
const baseUrl:string | undefined = process.env.NEXT_PUBLIC_API_URL;
const authRoute:string = "auth"
const teamRoute:string = "team"
const userRoute:string = "user"
const projectRoute:string = "project"

export const methods = {
    auth:{
        signUp:baseUrl+authRoute+"/create-account",
        signIn:baseUrl+authRoute+"/login",
        forgotPassword:baseUrl+authRoute+'/forgot-password',
        confirmAccount:baseUrl+authRoute+'/confirm-account',
        resetPassword:baseUrl+authRoute+'/reset-password',
        getUserData:baseUrl+authRoute+'/get-user-data',
        updatePassword:baseUrl+authRoute+'/update-password/user',
    },
    team:{
        createTeam:baseUrl+teamRoute+"/create",
        join:baseUrl+teamRoute+"/join-team"
    },
    user:{
        getTeamsByUserId:baseUrl+userRoute+"/get-user-teams",
        getProjectsByUserId:baseUrl+userRoute+"/get-user-projects",
        getUserStadictics:baseUrl+userRoute+"/get-stadistics",
        getAllTeams:baseUrl+userRoute+"/get-all-teams",
        updateUserData:baseUrl+userRoute+"/update-data",
    },
    projects:{
        create:baseUrl+projectRoute+"/create"
    }
}