import { redirect } from "next/dist/server/api-utils";

export default function DashboardPage() {
    return (
        <div className="flex-1 w-full h-full flex flex-col items-left justify-up bg-white p-6">
            <h1 className="text-2xl font-bold">Bienvenido</h1>
        </div>
    );
}