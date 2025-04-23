import { authFormSchema } from "@/models/schemas";
import { z } from "zod";
import { postAsync } from "../generalWebService";
import { methods } from "@/lib/endpoints";

const formSchema:any = authFormSchema("sign-in");

export async function onSignIn(values:z.infer<typeof formSchema>) {
    return await postAsync(methods.auth.signIn, values);
}
