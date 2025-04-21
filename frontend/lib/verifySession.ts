import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { WebService } from "./generalWebService";
import { methods } from "./endpoints";
import { User } from "@/models/models";


export const verifySession = cache(async () => {
    const token = cookies().get('token')?.value;
    if (!token) {
        redirect('/auth/sign-in');
    }
    const user = await fetch(methods.auth.getUserData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const session = await user.json()
    const result = User.safeParse(session)

    if (!result.success) {
        redirect('/auth/sign-in');
    }
    return{
        user:result.data,
        isAuth:true
    }
})