
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <section className='flex flex-col min-h-screen items-center justify-center p-5 md:flex-row'>
      {children}
    </section>
  );
}
