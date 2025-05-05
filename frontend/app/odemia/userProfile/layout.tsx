import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perfil de Usuario | TTA-110",
    description: "Página de perfil de usuario en TTA-110",
};

export default function UserProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={` antialiased h-full w-full`}>
            {children}
        </div>
    );
}