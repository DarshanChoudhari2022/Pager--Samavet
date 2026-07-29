"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    gsap?: {
      registerPlugin: (plugin: unknown) => void;
      to: (target: unknown, vars: Record<string, unknown>) => unknown;
      fromTo: (
        target: unknown,
        fromVars: Record<string, unknown>,
        toVars: Record<string, unknown>,
      ) => unknown;
      timeline: (vars?: Record<string, unknown>) => {
        to: (
          target: unknown,
          vars: Record<string, unknown>,
          position?: number | string,
        ) => unknown;
        fromTo: (
          target: unknown,
          fromVars: Record<string, unknown>,
          toVars: Record<string, unknown>,
          position?: number | string,
        ) => unknown;
      };
      utils: {
        toArray: (selector: string) => Element[];
      };
    };
    ScrollTrigger?: {
      getAll: () => Array<{ kill: () => void }>;
      refresh: () => void;
    };
  }
}

const modules = [
  {
    number: "01",
    title: "Digital Vargani Slips",
    tag: "ePawati",
    copy: "Create your familiar Vargani slip digitally and send the same branded receipt to every donor on WhatsApp.",
    icon: "₹",
    headline: "Every collection, recorded and shared instantly.",
    description:
      "Share your existing Vargani slip template with us, or let our team design one for your mandal. We upload the approved design into SAMAVET. When a member collects a donation, they enter the donor and payment details once; the matching branded receipt is generated and sent directly to the donor on WhatsApp.",
    benefits: [
      "Quick onboarding with your current slip design",
      "No duplicate handwriting or manual receipt registers",
      "Member-wise collection and pending-payment visibility",
      "Searchable records with instant WhatsApp sharing",
    ],
  },
  {
    number: "02",
    title: "Event Intelligence",
    tag: "Live Analytics",
    copy: "See registrations, attendance, donations and reach through one clear real-time view.",
    icon: "↗",
    headline: "See the gathering as it happens.",
    description:
      "Follow registrations, live attendance, collections and activity from one clear dashboard. Organizers can understand what is happening now, spot gaps early and make informed decisions while the event is active.",
    benefits: [
      "Live headcount and registration overview",
      "Collection, expense and balance summaries",
      "Location-wise and member-wise insights",
      "Clear reports for post-event review",
    ],
  },
  {
    number: "03",
    title: "24×7 Live Streaming",
    tag: "Facebook & YouTube",
    copy: "Bring every aarti, utsav and community moment to devotees wherever they are.",
    icon: "◉",
    headline: "Bring every sacred moment closer.",
    description:
      "Broadcast aarti, processions, cultural programs and announcements to devotees on Facebook and YouTube. SAMAVET helps your team prepare, schedule and manage the stream without adding technical complexity for mandal volunteers.",
    benefits: [
      "Facebook and YouTube live-stream support",
      "Event scheduling and broadcast preparation",
      "A single viewing experience for remote devotees",
      "Recorded streams ready for future sharing",
    ],
  },
  {
    number: "04",
    title: "Podcast & Media",
    tag: "Production Studio",
    copy: "Turn stories, teachings and community voices into thoughtful, broadcast-ready media.",
    icon: "≋",
    headline: "Give your community stories a lasting voice.",
    description:
      "From interviews and festival updates to devotional conversations, we help shape, record and publish media that feels authentic to your organization and is ready for today’s digital channels.",
    benefits: [
      "Topic planning and production guidance",
      "Recording, editing and clean audio delivery",
      "Short-form clips for social platforms",
      "Publishing support for consistent reach",
    ],
  },
];

export default function Home() {
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    let disposed = false;

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(
          `script[src="${src}"]`,
        );
        if (existing) {
          if (src.includes("ScrollTrigger") && window.ScrollTrigger) resolve();
          else if (src.includes("gsap.min") && window.gsap) resolve();
          else existing.addEventListener("load", () => resolve(), { once: true });
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Unable to load ${src}`));
        document.head.appendChild(script);
      });

    const initMotion = async () => {
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
      );
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
      );
      if (disposed || !window.gsap || !window.ScrollTrigger) return;

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!reduced) {
        const hero = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=160%",
            scrub: 1,
            pin: true,
          },
        });
        const loaderLogo = document.querySelector<HTMLElement>(
          ".hero-brand-logo-wrap",
        );
        const headerLogo = document.querySelector<HTMLElement>(".top-logo");
        const headerBar = document.querySelector<HTMLElement>(".topbar");

        if (loaderLogo && headerLogo) {
          const loaderRect = loaderLogo.getBoundingClientRect();
          const headerRect = headerLogo.getBoundingClientRect();
          const headerStyles = headerBar
            ? window.getComputedStyle(headerBar)
            : null;
          const headerTargetY =
            Number.parseFloat(headerStyles?.top || "0") +
            Number.parseFloat(headerStyles?.paddingTop || "0") +
            headerLogo.offsetHeight / 2;
          const logoScale = headerRect.width / loaderRect.width;
          const logoX =
            headerRect.left +
            headerRect.width / 2 -
            (loaderRect.left + loaderRect.width / 2);
          const logoY =
            headerTargetY - (loaderRect.top + loaderRect.height / 2);

          hero
            .fromTo(
              ".hero-brand-logo-wrap",
              { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
              {
                x: logoX,
                y: logoY,
                scale: logoScale,
                rotate: -1,
                ease: "power3.inOut",
                duration: 0.58,
              },
              0,
            )
            .fromTo(
              ".topbar",
              {
                opacity: 0,
                y: -140,
                pointerEvents: "none",
              },
              {
                opacity: 1,
                y: 0,
                pointerEvents: "auto",
                duration: 0.16,
                ease: "power2.out",
              },
              0.5,
            )
            .to(
              ".hero-brand-logo-wrap",
              { opacity: 0, duration: 0.08 },
              0.55,
            );
        }

        hero
          .fromTo(
            ".hero-title",
            {
              opacity: 0,
              y: 36,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              ease: "power2.out",
            },
            0.14,
          )
          .fromTo(
            ".hero-intro",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
            0.53,
          )
          .fromTo(
            ".hero-actions",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
            0.62,
          )
          .to(".scroll-cue", { opacity: 0, y: 20, duration: 0.12 }, 0.06);

        gsap.utils.toArray("[data-speed]").forEach((element) => {
          const speed = Number((element as HTMLElement).dataset.speed || 0.4);
          gsap.to(element, {
            yPercent: -60 * speed,
            rotate: speed * 22,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        gsap.utils.toArray(".module-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 86%" },
            },
          );
        });

        const gallery = gsap.timeline({
          scrollTrigger: {
            trigger: ".showcase-wrap",
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 1,
          },
        });
        gallery
          .fromTo(
            ".mock-card-left",
            { xPercent: 72, rotateY: 0, scale: 0.88 },
            { xPercent: -38, rotateY: -15, rotateZ: -3, scale: 0.94 },
            0,
          )
          .fromTo(
            ".mock-card-center",
            { scale: 0.9, z: 0 },
            { scale: 1.05, z: 50 },
            0,
          )
          .fromTo(
            ".mock-card-right",
            { xPercent: -72, rotateY: 0, scale: 0.88 },
            { xPercent: 38, rotateY: 15, rotateZ: 3, scale: 0.94 },
            0,
          )
          .to(
            ".mockup-card",
            { yPercent: -10, opacity: 0.9, ease: "power1.inOut" },
            0.78,
          );
      }

      ScrollTrigger.refresh();
    };

    initMotion().catch(() => {
      document.documentElement.classList.add("motion-fallback");
    });

    return () => {
      disposed = true;
      window.ScrollTrigger?.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main>
      <nav className="topbar" aria-label="Primary navigation">
        <a className="top-brand" href="#top" aria-label="SAMAVET home">
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
          <a href="#platform">Services</a>
          <span aria-hidden="true">/</span>
          <a href="/contact">Contact</a>
        </div>
        <div className="nav-actions">
          <span className="language-switcher">EN <i>/</i> मराठी</span>
          <a
            className="nav-cta"
            href="https://epawati.samavet.in/"
            aria-label="Log in to the SAMAVET ePawati portal"
          >
            Portal login
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-reveal">
          <img
            className="utsav-backdrop"
            src="/assets/ganesh-utsav-2026.jpeg"
            alt="Ganesh Utsav procession with devotees welcoming Lord Ganesha"
          />
          <div className="utsav-image-shade" aria-hidden="true" />
          <div className="hero-brand-logo-wrap" aria-hidden="true">
            <img
              className="hero-brand-logo"
              src="/assets/samavet-logo-transparent.png"
              alt=""
            />
          </div>
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">SAMAVET presents</p>
            <h1 className="hero-title">
              <span className="hero-title-line">
                <span>Digitizing</span>
              </span>
              <span className="hero-title-line">
                <span>Ganesh Utsav</span>
              </span>
              <span className="hero-title-line">
                <span>2026..</span>
              </span>
            </h1>
            <p className="hero-intro">
              One connected digital platform for mandals, devotees, donations,
              live darshan and every moment that brings the utsav alive.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#platform">
                Explore the Utsav platform <span>↓</span>
              </a>
              <span className="trust-note">
                <b>Ganpati Bappa Morya.</b> Tradition, amplified.
              </span>
            </div>
          </div>
          <div className="scroll-cue">
            <span />
            Scroll to enter
          </div>
        </div>
      </section>

      <section className="platform-section" id="platform">
        <div className="section-heading">
          <div>
            <p className="eyebrow">One connected platform</p>
            <h2>
              Everything your community
              <br />
              needs to <em>move forward.</em>
            </h2>
          </div>
          <p>
            Simple enough to begin today. Powerful enough to support your next
            ten years of growth.
          </p>
        </div>
        <div className="module-grid">
          {modules.map((module, index) => (
            <article
              className={`module-card ${activeModule === index ? "active" : ""}`}
              key={module.number}
            >
              <div className="module-top">
                <span>{module.number}</span>
                <i>{module.icon}</i>
              </div>
              <p className="module-tag">{module.tag}</p>
              <h3>{module.title}</h3>
              <p>{module.copy}</p>
              <button
                type="button"
                onClick={() => setActiveModule(index)}
                aria-controls="service-detail"
                aria-expanded={activeModule === index}
              >
                View details <span>↘</span>
              </button>
            </article>
          ))}
        </div>
        <div className="service-detail" id="service-detail" aria-live="polite">
          <div className="service-detail-copy">
            <p className="service-detail-label">
              {modules[activeModule].tag} · {modules[activeModule].number}
            </p>
            <h3>{modules[activeModule].headline}</h3>
            <p>{modules[activeModule].description}</p>
            <ul>
              {modules[activeModule].benefits.map((benefit) => (
                <li key={benefit}>
                  <span>✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
            <a className="service-contact" href="/contact">
              Talk to our team <span>↗</span>
            </a>
          </div>
          {activeModule === 0 ? (
            <div className="vargani-gallery" aria-label="Vargani slip template examples">
              {[
                "/assets/vargani-template-1.jpeg",
                "/assets/vargani-template-2.jpeg",
                "/assets/vargani-template-3.jpeg",
              ].map((src, index) => (
                <figure key={src}>
                  <img src={src} alt={`Custom Vargani receipt template example ${index + 1}`} />
                  <figcaption>Template {String(index + 1).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className={`service-visual service-visual-${activeModule}`}>
              <div className="service-visual-top">
                <span>{modules[activeModule].tag}</span>
                <b>LIVE</b>
              </div>
              <div className="service-metrics">
                <div>
                  <strong>{activeModule === 1 ? "1,284" : activeModule === 2 ? "2" : "24"}</strong>
                  <span>
                    {activeModule === 1
                      ? "participants"
                      : activeModule === 2
                        ? "live channels"
                        : "media stories"}
                  </span>
                </div>
                <div>
                  <strong>{activeModule === 1 ? "74%" : activeModule === 2 ? "LIVE" : "4×"}</strong>
                  <span>
                    {activeModule === 1
                      ? "active zones"
                      : activeModule === 2
                        ? "broadcast ready"
                        : "more reusable content"}
                  </span>
                </div>
              </div>
              <div className="service-bars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          )}
        </div>
        <div className="who-row">
          <span>Built alongside</span>
          <b>Trusts</b>
          <i>✦</i>
          <b>Temples</b>
          <i>✦</i>
          <b>Ganesh Mandals</b>
          <i>✦</i>
          <b>NGOs</b>
          <i>✦</i>
          <b>Social Organisations</b>
        </div>
      </section>

      <section className="showcase-section" id="experience">
        <div className="showcase-wrap">
          <div className="showcase-copy">
            <p className="eyebrow">A clearer view of your impact</p>
            <h2>One platform. Every meaningful moment.</h2>
          </div>
          <div className="gallery-stage">
            <figure className="mockup-card mock-card-left">
              <img
                src="/assets/analytics-dashboard.png"
                alt="Bronze analytics dashboard interface"
              />
              <figcaption>
                <span>01</span> Understand your community
              </figcaption>
            </figure>
            <figure className="mockup-card mock-card-center">
              <img
                src="/assets/samavet-phone.png"
                alt="SAMAVET mobile community platform"
              />
              <figcaption>
                <span>02</span> Stay connected, anywhere
              </figcaption>
            </figure>
            <figure className="mockup-card mock-card-right">
              <img
                src="/assets/livestream-tablet.png"
                alt="Live streaming platform on tablet"
              />
              <figcaption>
                <span>03</span> Share every celebration
              </figcaption>
            </figure>
          </div>
          <div className="showcase-progress">
            <span>Experience the platform</span>
            <i />
            <b>03 views</b>
          </div>
        </div>
      </section>

      <section className="advantage-section">
        <div className="section-count">02 — The SAMAVET advantage</div>
        <div className="advantage-layout">
          <div>
            <p className="eyebrow">Less complexity. More community.</p>
            <h2>
              Built for the way
              <br />
              <em>you actually work.</em>
            </h2>
          </div>
          <div className="comparison">
            <div className="comparison-card muted">
              <p>Without SAMAVET</p>
              <ul>
                <li><span>×</span> Scattered spreadsheets and records</li>
                <li><span>×</span> Manual receipts and follow-ups</li>
                <li><span>×</span> Disconnected streaming tools</li>
                <li><span>×</span> No single view of community impact</li>
              </ul>
            </div>
            <div className="comparison-card bright">
              <p>With SAMAVET</p>
              <ul>
                <li><span>✓</span> One secure source of truth</li>
                <li><span>✓</span> Instant digital ePawati</li>
                <li><span>✓</span> Broadcast everywhere at once</li>
                <li><span>✓</span> Clear, live insights for every decision</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-signature">
          <img
            className="footer-watermark"
            src="/assets/samavet-logo-transparent.png"
            alt=""
            aria-hidden="true"
          />
          <a className="footer-wordmark" href="#top" aria-label="Back to SAMAVET home">
            SAMAVET
          </a>
        </div>
        <div className="footer-meta">
          <p>© 2026 Samavet.</p>
          <p>Built with communities in mind.</p>
          <a
            href="https://www.bracketdex.com/"
            target="_blank"
            rel="noreferrer"
          >
            Powered by BracketDex
          </a>
        </div>
      </footer>
    </main>
  );
}
