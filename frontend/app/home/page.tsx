import { redirect } from "next/dist/server/api-utils";

export default function DashboardPage() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-white p-6">
            <h1 className="text-2xl font-bold">Bienvenido</h1>
        </div>
    );
}
