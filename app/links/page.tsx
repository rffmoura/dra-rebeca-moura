import Image from "next/image";
import { siteContent } from "../content";

export const metadata = {
  title: "Links | Dra. Rebeca Moura",
  description: "Links principais da Dra. Rebeca Moura.",
};

export default function LinksPage() {
  const { doctor, links } = siteContent;

  return (
    <main className="links-page">
      <section className="links-card section-reveal">
        <div className="links-photo-wrap">
          <Image
            className="links-photo"
            src={doctor.portrait}
            alt="Retrato provisório da Dra. Rebeca Moura"
            width={420}
            height={520}
            priority
          />
          <span className="collage-mark links-heart" aria-hidden="true">
            ♥
          </span>
          <span className="collage-mark links-star" aria-hidden="true">
            ✶
          </span>
        </div>

        <div className="links-copy">
          {/* <span>Oiê, eu sou a</span> */}
          <h1>{doctor.name}</h1>
          <p>{doctor.title}</p>
          <small>
            {doctor.crm} · {doctor.rqe}
          </small>
          <strong className="links-service-mode">Atendimento presencial e online</strong>
        </div>

        <div className="links-list">
          {links.map((link) => (
            <a className="link-button" href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
