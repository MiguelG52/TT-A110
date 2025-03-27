import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Odemia</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/auth/sign-up" className="hover:underline">Registrarse</a></li>
              <li><a href="/auth/sign-in" className="hover:underline">Iniciar Sesión</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Image
          src="/student_learning.webp"
          alt='Persona sentada en una sala frente a un computador escribiendo código'
          width={2100}
          height={500}
          priority
        />
      </div>

      {/* Contenido principal */}
      <section className="container mx-auto flex-grow p-6 space-y-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Bienvenido</h2>
          <p>Proyecto que busca incentivar las buenas prácticas en los estudiantes de la ESCOM</p>
          <p>Se busca principalmente regirnos al nombramiento de:</p>
          <ul>
            <li>Funciones</li>
            <li>Clases</li>
            <li>Metodos</li>
          </ul>

        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Sección 1</h2>
          <p>Contenido de la primera sección.</p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Sección 2</h2>
          <p>Contenido de la segunda sección.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        <p>&copy; {new Date().getFullYear()} Footer Generico</p>
      </footer>
    </main>
  );
}
