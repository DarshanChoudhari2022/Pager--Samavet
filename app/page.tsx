"use client";

import { useEffect } from "react";

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
    title: "Digital Donation Receipts",
    tag: "ePawati",
    copy: "Issue compliant, beautifully branded receipts in seconds—with donor records always ready.",
    icon: "₹",
  },
  {
    number: "02",
    title: "Event Intelligence",
    tag: "Live Analytics",
    copy: "See registrations, attendance, donations and reach through one clear real-time view.",
    icon: "↗",
  },
  {
    number: "03",
    title: "24×7 Live Streaming",
    tag: "Facebook & YouTube",
    copy: "Bring every aarti, utsav and community moment to devotees wherever they are.",
    icon: "◉",
  },
  {
    number: "04",
    title: "Podcast & Media",
    tag: "Production Studio",
    copy: "Turn stories, teachings and community voices into thoughtful, broadcast-ready media.",
    icon: "≋",
  },
];

const tiers = [
  {
    name: "Bhakt",
    eyebrow: "For emerging communities",
    price: "₹2,999",
    cadence: "/ month",
    features: ["Digital ePawati", "Member directory", "2 campaign pages"],
  },
  {
    name: "Utsav",
    eyebrow: "For active organisations",
    price: "₹7,999",
    cadence: "/ month",
    features: [
      "Everything in Bhakt",
      "Live event analytics",
      "Social live streaming",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Mandap",
    eyebrow: "For large-scale impact",
    price: "Custom",
    cadence: "built around you",
    features: [
      "Everything in Utsav",
      "Multi-location access",
      "Media production",
      "Dedicated success lead",
    ],
  },
];

function TreeMark() {
  return (
    <div className="tree-mark" aria-label="SAMAVET Tree of Life">
      <span className="tree-trunk" />
      <span className="tree-branch branch-a" />
      <span className="tree-branch branch-b" />
      <span className="tree-branch branch-c" />
      {Array.from({ length: 9 }).map((_, index) => (
        <i key={index} style={{ "--leaf": index } as React.CSSProperties} />
      ))}
    </div>
  );
}

function GaneshaSeal() {
  return (
    <div className="ganesha" aria-label="Stylised Lord Ganesha illustration">
      <span className="g-crown">◆</span>
      <span className="g-ear g-ear-left" />
      <span className="g-ear g-ear-right" />
      <span className="g-face" />
      <span className="g-eye g-eye-left" />
      <span className="g-eye g-eye-right" />
      <span className="g-trunk" />
      <span className="g-hand">●</span>
    </div>
  );
}

export default function Home() {
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
            end: "+=130%",
            scrub: 1,
            pin: true,
          },
        });
        hero
          .to(
            ".utsav-backdrop",
            { scale: 1.13, xPercent: -2.5, ease: "none" },
            0,
          )
          .fromTo(
            ".hero-copy",
            { opacity: 1, y: 0 },
            { opacity: 0, y: -90, ease: "power2.in" },
            0.48,
          )
          .fromTo(
            ".hero-ambient",
            { opacity: 0.25 },
            { opacity: 0.82, duration: 0.45 },
            0,
          )
          .to(".scroll-cue", { opacity: 0, y: 20 }, 0.3);

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

        gsap.fromTo(
          ".reveal-stage",
          { opacity: 0, y: 70, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".origin-section",
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          },
        );

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
        <a className="top-logo-link" href="#top" aria-label="SAMAVET home">
          <img
            className="top-logo"
            src="/assets/samavet-attached-logo.jpeg"
            alt="SAMAVET community tree logo"
          />
        </a>
        <div className="nav-links">
          <a href="#platform">Platform</a>
          <a href="#experience">Experience</a>
          <a href="#pricing">Pricing</a>
        </div>
        <a className="nav-cta" href="#contact">
          Begin a conversation <span>↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-reveal">
          <img
            className="utsav-backdrop"
            src="/assets/ganesh-utsav-2026.jpeg"
            alt="Ganesh Utsav procession with devotees welcoming Lord Ganesha"
          />
          <div className="utsav-image-shade" aria-hidden="true" />
          <div className="rangoli rangoli-one" />
          <div className="rangoli rangoli-two" />
          <div className="hero-ambient" aria-hidden="true">
            <span className="diya diya-left">
              <i />
            </span>
            <span className="diya diya-right">
              <i />
            </span>
            <span className="smoke smoke-one" />
            <span className="smoke smoke-two" />
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                className={`petal petal-${index + 1}`}
                data-speed={(0.35 + (index % 4) * 0.18).toFixed(2)}
                key={index}
              />
            ))}
          </div>
          <div className="hero-copy">
            <p className="eyebrow">SAMAVET presents</p>
            <h1>
              Digitizing
              <br />
              Ganesh Utsav
              <br />
              <em>2026.</em>
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

      <section className="origin-section">
        <div className="section-count">01 — Our purpose</div>
        <div className="temple-silhouette" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="reveal-stage">
          <GaneshaSeal />
          <div className="origin-copy">
            <p className="eyebrow">Rooted in seva. Designed for scale.</p>
            <h2>
              Tradition, meet
              <br />
              <em>tomorrow.</em>
            </h2>
            <p>
              SAMAVET means assembled—people, purpose and progress in one
              place. We make powerful technology feel natural for every
              community organisation.
            </p>
          </div>
          <TreeMark />
        </div>
        <div className="garland" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, index) => (
            <i key={index} />
          ))}
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
          {modules.map((module) => (
            <article className="module-card" key={module.number}>
              <div className="module-top">
                <span>{module.number}</span>
                <i>{module.icon}</i>
              </div>
              <p className="module-tag">{module.tag}</p>
              <h3>{module.title}</h3>
              <p>{module.copy}</p>
              <a href="#contact" aria-label={`Learn about ${module.title}`}>
                Discover module <span>↗</span>
              </a>
            </article>
          ))}
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

      <section className="pricing-section" id="pricing">
        <div className="section-heading pricing-heading">
          <div>
            <p className="eyebrow">Plans that grow with your purpose</p>
            <h2>
              Start where you are.
              <br />
              <em>Grow without limits.</em>
            </h2>
          </div>
          <p>Simple monthly plans. Thoughtful onboarding included.</p>
        </div>
        <div className="pricing-grid">
          {tiers.map((tier) => (
            <article
              className={`price-card ${tier.featured ? "featured" : ""}`}
              key={tier.name}
            >
              {tier.featured && <span className="popular">Most loved</span>}
              <p>{tier.eyebrow}</p>
              <h3>{tier.name}</h3>
              <div className="price">
                <b>{tier.price}</b>
                <span>{tier.cadence}</span>
              </div>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <span>✓</span> {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact">
                Choose {tier.name} <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact">
        <div className="footer-orbit" />
        <div className="footer-top">
          <p className="eyebrow">Let&apos;s build belonging, together</p>
          <h2>
            Your community&apos;s next
            <br />
            chapter starts <em>here.</em>
          </h2>
          <a className="footer-button" href="tel:+919172227878">
            Speak with SAMAVET <span>↗</span>
          </a>
        </div>
        <div className="footer-bottom">
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">S</span>
            <span>SAMAVET</span>
          </a>
          <div className="contact-links">
            <a href="tel:+919172227878">+91 917-222-7878</a>
            <a href="https://www.samavet.in">www.samavet.in</a>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/" aria-label="Instagram">
              Instagram
            </a>
            <a href="https://www.facebook.com/" aria-label="Facebook">
              Facebook
            </a>
            <a href="https://www.youtube.com/" aria-label="YouTube">
              YouTube
            </a>
          </div>
          <p>© 2026 SAMAVET. Made with seva in India.</p>
        </div>
      </footer>
    </main>
  );
}
