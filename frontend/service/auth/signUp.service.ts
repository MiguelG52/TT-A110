import { authFormSchema } from "@/models/schemas";
import { z } from "zod";
import { WebService } from "../generalWebService";
import { methods } from "@/lib/endpoints";

const formSchema = authFormSchema("sign-up");

export async function onSignUp(values:z.infer<typeof formSchema>) {
    return await WebService.postAsync(methods.auth.signUp, values);
}
