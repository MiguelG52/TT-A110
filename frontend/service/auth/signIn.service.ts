import { authFormSchema } from "@/models/schemas";
import { z } from "zod";
import { WebService } from "../generalWebService";

const formSchema = authFormSchema("sign-in");

export async function authService(values:z.infer<typeof formSchema>) {
    return await WebService.postAsync(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, values);
}
