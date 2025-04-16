import "../../assets/css/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <section className='flex-col h-min-screen items-center justify-center p-5'>
            {children}
        </section>   
    </>
  );
}
