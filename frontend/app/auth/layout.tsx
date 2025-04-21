import { verifySession } from "@/lib/verifySession";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  verifySession()
  return (
    <section className='flex flex-col min-h-screen items-center justify-center p-5 md:flex-row'>
      {children}
    </section>
  );
}
