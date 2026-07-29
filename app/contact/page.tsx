export default function ContactPage() {
  const whatsappUrl =
    "https://wa.me/919172227878?text=Namaskar%20SAMAVET%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.";

  return (
    <main className="contact-page">
      <nav className="topbar contact-nav" aria-label="Primary navigation">
        <a className="top-brand" href="/" aria-label="SAMAVET home">
          <span className="top-logo-link">
            <img
              className="top-logo"
              src="/assets/samavet-logo-transparent.png"
              alt="SAMAVET community tree logo"
            />
          </span>
          <span className="top-brand-name">SAMAVET</span>
        </a>
        <div className="nav-links">
          <a href="https://epawati.samavet.in/">ePawati</a>
          <span aria-hidden="true">/</span>
          <a href="/#platform">Services</a>
          <span aria-hidden="true">/</span>
          <a href="/contact" aria-current="page">Contact</a>
        </div>
        <div className="nav-actions">
          <span className="language-switcher">EN <i>/</i> मराठी</span>
          <a className="nav-cta" href="https://epawati.samavet.in/">
            Portal login
          </a>
        </div>
      </nav>

      <section className="contact-hero">
        <div className="contact-intro">
          <p className="eyebrow">Let&apos;s build the next one well</p>
          <h1>
            Bring your next
            <br />
            offering <em>online.</em>
          </h1>
          <p>
            Tell us what your mandal or organization needs. We will keep the
            conversation practical and prepare the right onboarding path.
          </p>
          <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            Chat on WhatsApp <span>↗</span>
          </a>
        </div>

        <div className="contact-directory">
          <article>
            <span>01 · WhatsApp</span>
            <h2>Speak directly with our team.</h2>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              +91 91722 27878 <span>↗</span>
            </a>
          </article>
          <article>
            <span>02 · Office</span>
            <h2>Visit SAMAVET.</h2>
            <a
              href="https://maps.app.goo.gl/CJMvHcXUcSabz8LJ7?g_st=aw"
              target="_blank"
              rel="noreferrer"
            >
              Open office address in Google Maps <span>↗</span>
            </a>
          </article>
          <article>
            <span>03 · Instagram</span>
            <h2>Follow current work and updates.</h2>
            <a
              href="https://www.instagram.com/samavetofficial?igsh=Y20xbG1kaHIxZTJp"
              target="_blank"
              rel="noreferrer"
            >
              @samavetofficial <span>↗</span>
            </a>
          </article>
          <article>
            <span>04 · YouTube</span>
            <h2>Watch celebrations and community stories.</h2>
            <a
              href="https://www.youtube.com/@samavet"
              target="_blank"
              rel="noreferrer"
            >
              @samavet <span>↗</span>
            </a>
          </article>
        </div>
      </section>

      <footer className="contact-footer">
        <p>© 2026 Samavet.</p>
        <a href="https://www.bracketdex.com/" target="_blank" rel="noreferrer">
          Powered by BracketDex
        </a>
      </footer>
    </main>
  );
}
