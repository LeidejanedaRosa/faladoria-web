export const AboutSection = () => {
  return (
    <section
      className="bg-primary-500 relative flex min-h-screen flex-col px-6 py-16 md:px-12 lg:px-20"
      aria-labelledby="about-heading"
    >
      <header>
        <span className="text-sm font-medium tracking-widest text-white/80 uppercase">
          Faladoria
        </span>
      </header>

      <div className="flex flex-1 items-center">
        <h2
          id="about-heading"
          className="max-w-5xl text-3xl leading-tight font-light text-white italic sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          Criamos a faladoria para conectar usuários do SUS à gestão pública e
          melhorar o atendimento de saúde.
        </h2>
      </div>

      <footer className="flex items-end justify-between text-white/80">
        <span className="text-base font-medium">2025</span>
        <p className="text-center text-sm leading-tight md:text-base">
          Uma plataforma independente
          <br />
          para ouvir, mediar e resolver.
        </p>
      </footer>
    </section>
  )
}
