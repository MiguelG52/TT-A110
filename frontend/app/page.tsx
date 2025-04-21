import "../assets/css/globals.css";
import { AuthProvider } from "@/context/authContext";
import { AuthGuard } from "@/components/authGuard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
        <h1 className="text-2xl text-center mt-10">Bienvenido a la app protegida</h1>
    </main>
  );
}
