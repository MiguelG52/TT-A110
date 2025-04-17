import { authFormSchema } from "@/models/schemas";
import { z } from "zod";
import { WebService } from "../generalWebService";
import { methods } from "@/lib/endpoints";

const formSchema:any = authFormSchema("sign-in");

export async function onSignIn(values:z.infer<typeof formSchema>) {
    return await WebService.postAsync(methods.auth.signIn, values);
}
