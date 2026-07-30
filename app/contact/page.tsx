"use client";

import { useEffect, useState } from "react";

const contactText = {
  en: {
    platformNav: "Platform",
    services: "Services",
    contact: "Contact",
    portal: "Portal login",
    eyebrow: "Let’s build the next one well",
    title: ["Bring your next", "offering online."],
    intro:
      "Tell us what your mandal or organization needs. We will keep the conversation practical and prepare the right onboarding path.",
    whatsappButton: "Chat on WhatsApp",
    cards: [
      ["01 · WhatsApp", "Speak directly with our team.", "+91 91722 27878"],
      ["02 · Office", "Visit SAMAVET.", "Open office address in Google Maps"],
      ["03 · Instagram", "Follow current work and updates.", "@samavetofficial"],
      ["04 · YouTube", "Watch celebrations and community stories.", "@samavet"],
    ],
    powered: "Powered by BracketDex",
  },
  mr: {
    platformNav: "प्लॅटफॉर्म",
    services: "सेवा",
    contact: "संपर्क",
    portal: "पोर्टल लॉगिन",
    eyebrow: "पुढील उपक्रम उत्तम प्रकारे उभारूया",
    title: ["आपला पुढील उपक्रम", "डिजिटल माध्यमात आणा."],
    intro:
      "आपल्या मंडळाला किंवा संस्थेला नेमके काय हवे आहे ते आम्हाला सांगा. आम्ही सोप्या भाषेत चर्चा करून योग्य सुरुवातीचा मार्ग तयार करू.",
    whatsappButton: "व्हॉट्सॲपवर संपर्क साधा",
    cards: [
      ["०१ · व्हॉट्सॲप", "आमच्या टीमशी थेट बोला.", "+९१ ९१७२२ २७८७८"],
      ["०२ · कार्यालय", "SAMAVET कार्यालयाला भेट द्या.", "Google Maps वर कार्यालयाचा पत्ता पाहा"],
      ["०३ · इंस्टाग्राम", "आमचे नवीन उपक्रम आणि माहिती पाहा.", "@samavetofficial"],
      ["०४ · यूट्यूब", "उत्सव आणि समुदायाच्या कथा पाहा.", "@samavet"],
    ],
    powered: "BracketDex द्वारे समर्थित",
  },
};

export default function ContactPage() {
  const [language, setLanguage] = useState<"en" | "mr">("en");
  const t = contactText[language];
  const whatsappUrl =
    "https://wa.me/919172227878?text=Namaskar%20SAMAVET%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.";
  const contactLinks = [
    whatsappUrl,
    "https://maps.app.goo.gl/CJMvHcXUcSabz8LJ7?g_st=aw",
    "https://www.instagram.com/samavetofficial?igsh=Y20xbG1kaHIxZTJp",
    "https://www.youtube.com/@samavet",
  ];

  useEffect(() => {
    const saved = window.localStorage.getItem("samavet-language");
    if (saved === "mr") setLanguage("mr");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (nextLanguage: "en" | "mr") => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("samavet-language", nextLanguage);
  };

  return (
    <main
      className={`contact-page ${language === "mr" ? "is-marathi" : ""}`}
      lang={language}
    >
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
          <a href="/#experience">{t.platformNav}</a>
          <span aria-hidden="true">/</span>
          <a href="https://epawati.samavet.in/">ePawati</a>
          <span aria-hidden="true">/</span>
          <a href="/#platform">{t.services}</a>
          <span aria-hidden="true">/</span>
          <a href="/contact" aria-current="page">{t.contact}</a>
        </div>
        <div className="nav-actions">
          <div className="language-switcher" aria-label="Choose language">
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <i>/</i>
            <button
              type="button"
              className={language === "mr" ? "active" : ""}
              onClick={() => changeLanguage("mr")}
            >
              मराठी
            </button>
          </div>
          <a className="nav-cta" href="https://epawati.samavet.in/">
            {t.portal}
          </a>
        </div>
      </nav>

      <section className="contact-hero">
        <div className="contact-intro">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>
            {t.title[0]}
            <br />
            <em>{t.title[1]}</em>
          </h1>
          <p>{t.intro}</p>
          <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            {t.whatsappButton} <span>↗</span>
          </a>
        </div>

        <div className="contact-directory">
          {t.cards.map((card, index) => (
            <article key={card[0]}>
              <span>{card[0]}</span>
              <h2>{card[1]}</h2>
              <a href={contactLinks[index]} target="_blank" rel="noreferrer">
                {card[2]} <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className="contact-footer">
        <p>© 2026 Samavet.</p>
        <a href="https://www.bracketdex.com/" target="_blank" rel="noreferrer">
          {t.powered}
        </a>
      </footer>
    </main>
  );
}
