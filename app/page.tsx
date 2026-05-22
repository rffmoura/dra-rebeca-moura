import Image from "next/image";
import Link from "next/link";
import { siteContent } from "./content";
import { TestimonialCard } from "./testimonial-card";

function CollageMark({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`collage-mark ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

export default function Home() {
  const { doctor, hero, procedures, testimonials } = siteContent;

  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Navegação principal">
        <Link className="brand" href="/">
          Dra. Rebeca Moura
        </Link>
        <div className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#atendimentos">Atendimentos</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>

      <section className="hero-section section-reveal">
        <div className="hero-copy">
          <span className="paper-tag tilted-left">{hero.kicker}</span>
          <h1>{hero.headline}</h1>
          <p>{hero.line}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={doctor.whatsapp}>
              {hero.cta}
            </a>
            <a className="button button-secondary" href="#atendimentos">
              {hero.secondary}
            </a>
          </div>
        </div>

        <div className="hero-art" aria-label="Retrato em collage da Dra. Rebeca Moura">
          <div className="portrait-halo" />
          <Image
            className="portrait"
            src={doctor.heroPortrait}
            alt="Dra. Rebeca Moura segurando um dermatoscópio"
            width={1124}
            height={1700}
            priority
          />
          <CollageMark className="heart heart-one">♥</CollageMark>
          <CollageMark className="heart heart-two">♥</CollageMark>
          <CollageMark className="star star-one">✶</CollageMark>
          <div className="hero-note paper-strip">
            cuidado que combina ciência, estudo e escuta
          </div>
        </div>
      </section>

      <section id="sobre" className="about-section section-reveal">
        <div className="about-copy">
          <span className="paper-tag">um pouco sobre mim</span>
        </div>
        <div className="about-author-collage">
          <div className="about-photo-sheet">
            <Image
              src="/rebeca-full-image.jpg"
              alt="Dra. Rebeca Moura em consultório segurando um dermatoscópio"
              width={640}
              height={760}
            />
          </div>
          <div className="about-letter">
            <p>
              Me apaixonei pela dermatologia no final da faculdade e hoje
              transformo essa paixão em cuidado diário para meus pacientes.
              Gosto de olhar cada pele com calma, escuta e estudo, unindo
              ciência, atualização e uma rotina possível para cada pessoa.
            </p>
          </div>
          <span className="paperclip" aria-hidden="true" />
          <CollageMark className="heart about-heart">♥</CollageMark>
          <CollageMark className="star star-two">✷</CollageMark>
        </div>
        <div className="about-details">
          <ul>
            <li>Dermatologista pelo Hospital Escola Álvaro Alvim.</li>
            <li>Médica pela Faculdade de Medicina de Campos.</li>
            <li>Estudo constante para unir ciência, atualização e cuidado.</li>
          </ul>
        </div>
      </section>

      <section id="atendimentos" className="procedures-section section-reveal">
        <div className="section-heading wide">
          <span className="paper-tag dark-tag">atendimentos</span>
          <h2>Dermatologia com planejamento, conversa e acompanhamento.</h2>
        </div>
        <div className="procedure-grid">
          {procedures.map((procedure, index) => (
            <article className="procedure-card" key={procedure.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{procedure.title}</h3>
              <p>{procedure.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials-section section-reveal">
        <div className="section-heading">
          <span className="paper-tag">pacientes</span>
          <h2>Espaço para feedbacks reais.</h2>
        </div>
        <div className="testimonial-track">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              name={testimonial.name}
              note={testimonial.note}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </section>

      <section id="contato" className="contact-section section-reveal">
        <div>
          <span className="paper-tag dark-tag">contato</span>
          <h2>Vamos cuidar da sua pele com calma?</h2>
          <p>
            Agende sua consulta e acompanhe pelas redes sociais conteúdos pensados para orientar e cuidar de você.
          </p>
        </div>
        <div className="contact-card">
          <a className="button button-primary" href={doctor.whatsapp}>
            Agendar pelo WhatsApp
          </a>
          <Link className="button button-secondary" href="/links">
            Abrir página de links
          </Link>
          <p>
            {doctor.address}
            <br />
            {doctor.crm} · {doctor.rqe}
          </p>
        </div>
      </section>
    </main>
  );
}
