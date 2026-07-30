"use client";

import { useEffect, useState } from "react";

interface GsapTimeline {
  to: (
    target: unknown,
    vars: Record<string, unknown>,
    position?: number | string,
  ) => GsapTimeline;
  fromTo: (
    target: unknown,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
    position?: number | string,
  ) => GsapTimeline;
}

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
      timeline: (vars?: Record<string, unknown>) => GsapTimeline;
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
    copy: "Create familiar Vargani slips digitally and send branded ePawati receipts to every donor on WhatsApp — instantly and securely.",
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
    mr: {
      title: "डिजिटल वर्गणी पावत्या",
      tag: "ई-पावती",
      copy: "परिचित वर्गणी पावत्या डिजिटल स्वरूपात तयार करा आणि प्रत्येक देणगीदाराला ब्रँडेड ई-पावती व्हॉट्सॲपवर तत्काळ व सुरक्षितपणे पाठवा.",
      headline: "प्रत्येक वर्गणीची तत्काळ नोंद आणि पावती.",
      description:
        "आपल्या मंडळाची सध्याची वर्गणी पावती आम्हाला पाठवा किंवा नवीन पावतीचे डिझाइन आमच्याकडून करून घ्या. मंजूर डिझाइन आम्ही SAMAVET मध्ये अपलोड करतो. सदस्याने देणगीदाराचे नाव, रक्कम आणि देयकाची माहिती एकदाच भरली की त्याच डिझाइनमधील पावती तयार होऊन थेट व्हॉट्सॲपवर पाठवली जाते.",
      benefits: [
        "सध्याच्या पावतीच्या डिझाइनसह सोपी सुरुवात",
        "दुबार लेखन आणि हाताने नोंदवही ठेवण्याची गरज नाही",
        "सदस्यनिहाय जमा आणि बाकी रकमेची स्पष्ट माहिती",
        "शोधता येणाऱ्या नोंदी आणि तत्काळ व्हॉट्सॲप शेअरिंग",
      ],
    },
  },
  {
    number: "02",
    title: "Event Intelligence",
    tag: "Live Analytics",
    copy: "Track registrations, attendance, donations and digital reach in one clear, real-time dashboard.",
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
    mr: {
      title: "उत्सव माहिती व विश्लेषण",
      tag: "थेट विश्लेषण",
      copy: "नोंदणी, उपस्थिती, देणग्या आणि डिजिटल पोहोच यांचा एका स्पष्ट, थेट डॅशबोर्डवर मागोवा घ्या.",
      headline: "उत्सवातील प्रत्येक हालचाल थेट पाहा.",
      description:
        "नोंदणी, उपस्थिती, जमा रक्कम आणि उपक्रमांची माहिती एका स्पष्ट डॅशबोर्डवर पाहा. उत्सव सुरू असतानाच आयोजकांना परिस्थिती समजते, त्रुटी लवकर लक्षात येतात आणि योग्य निर्णय घेता येतात.",
      benefits: [
        "थेट उपस्थिती आणि नोंदणीचा आढावा",
        "जमा, खर्च आणि शिल्लक रकमेचा सारांश",
        "ठिकाणनिहाय आणि सदस्यनिहाय माहिती",
        "उत्सवानंतरच्या परीक्षणासाठी स्पष्ट अहवाल",
      ],
    },
  },
  {
    number: "03",
    title: "24×7 Live Streaming",
    tag: "Facebook & YouTube",
    copy: "Broadcast aarti, utsav and community moments live on Facebook and YouTube — reaching devotees wherever they are.",
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
    mr: {
      title: "२४×७ थेट प्रक्षेपण",
      tag: "फेसबुक आणि यूट्यूब",
      copy: "आरती, उत्सव आणि समुदायातील क्षण फेसबुक व यूट्यूबवर थेट प्रसारित करून भाविकांपर्यंत सर्वत्र पोहोचवा.",
      headline: "प्रत्येक पवित्र क्षण भाविकांच्या जवळ आणा.",
      description:
        "आरती, मिरवणूक, सांस्कृतिक कार्यक्रम आणि महत्त्वाच्या घोषणा फेसबुक व यूट्यूबवर थेट प्रसारित करा. मंडळाच्या स्वयंसेवकांवर तांत्रिक ताण न आणता SAMAVET नियोजन, वेळापत्रक आणि प्रसारण व्यवस्थापनात मदत करते.",
      benefits: [
        "फेसबुक आणि यूट्यूब थेट प्रक्षेपणासाठी मदत",
        "कार्यक्रमाचे वेळापत्रक आणि प्रसारणाची पूर्वतयारी",
        "दूरच्या भाविकांसाठी एकसंध दर्शन अनुभव",
        "पुढे शेअर करण्यासाठी जतन केलेले प्रसारण",
      ],
    },
  },
  {
    number: "04",
    title: "Podcast & Media",
    tag: "Production Studio",
    copy: "Turn stories, teachings and community voices into thoughtful, broadcast-quality podcasts and videos.",
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
    mr: {
      title: "पॉडकास्ट आणि मीडिया",
      tag: "निर्मिती स्टुडिओ",
      copy: "समुदायाच्या कथा, शिकवण आणि आवाज विचारपूर्वक, प्रसारण-दर्जाच्या पॉडकास्ट आणि व्हिडिओमध्ये सादर करा.",
      headline: "समुदायाच्या कथांना दीर्घकाळ टिकणारा आवाज द्या.",
      description:
        "मुलाखती, उत्सवाच्या बातम्या आणि भक्तीपर संवाद यांना योग्य स्वरूप देणे, ध्वनिमुद्रण करणे आणि प्रकाशित करणे यासाठी आम्ही मदत करतो. तयार होणारे माध्यम आपल्या संस्थेची ओळख जपते आणि आजच्या डिजिटल चॅनेलसाठी तयार असते.",
      benefits: [
        "विषय नियोजन आणि निर्मितीसाठी मार्गदर्शन",
        "ध्वनिमुद्रण, संपादन आणि स्वच्छ ऑडिओ",
        "सोशल मीडियासाठी लघु व्हिडिओ क्लिप्स",
        "सातत्यपूर्ण पोहोचेसाठी प्रकाशन सहाय्य",
      ],
    },
  },
];

const homeText = {
  en: {
    platformNav: "Platform",
    services: "Services",
    contact: "Contact",
    portal: "Portal login",
    heroKicker: "SAMAVET presents",
    heroTitle: ["Digitizing Ganesh Utsav 2026"],
    heroIntro:
      "One connected digital platform for mandals, trusts and devotees — managing donations, live darshan and every moment of the utsav.",
    explore: "Explore the Utsav platform",
    trustStrong: "Ganpati Bappa Morya.",
    trust: "Tradition, beautifully digitised.",
    scroll: "Scroll to see how SAMAVET supports your utsav.",
    platformLabel: "One connected platform.",
    platformTitle: "Everything your community needs to run and grow your Ganesh Utsav.",
    platformIntro:
      "Simple enough to begin today. Powerful enough to support your next ten years of growth.",
    viewDetails: "View details",
    talk: "Talk to our team",
    template: "Template",
    epawatiGraphic: "Your receipt. Digitized by ePawati.",
    epawatiFlow: ["Your mandal design", "Digital ePawati", "Sent on WhatsApp"],
    live: "LIVE",
    metricLabels: ["participants", "live channels", "media stories", "active zones", "broadcast ready", "more reusable content"],
    alongside: "Built alongside trusts ✦ temples ✦ Ganesh mandals ✦ NGOs ✦ social organisations.",
    showcaseLabel: "A clearer view of your impact",
    showcaseTitle: "One platform. Every meaningful moment.",
    captions: [
      "Understand your community at a glance.",
      "Stay connected with every donor, from anywhere.",
      "Share every celebration with devotees online.",
    ],
    experience: "Experience the SAMAVET platform in action.",
    advantageCount: "02 — The SAMAVET advantage",
    advantageLabel: "Less complexity. More community.",
    advantageTitle: "Built for the way your mandal actually works, every day.",
    without: "Without SAMAVET",
    with: "With SAMAVET",
    withoutItems: [
      "Scattered spreadsheets and records.",
      "Manual receipts and follow-ups.",
      "Disconnected streaming tools.",
      "No single view of community impact.",
    ],
    withItems: [
      "One secure source of truth for your data.",
      "Instant digital ePawati receipts.",
      "Broadcast everywhere at once from one place.",
      "Clear, live insights for every decision.",
    ],
    footerReady: "Ready to digitise your Ganesh Utsav? Contact us for a walkthrough.",
    emailLabel: "contact@samavet.in",
    requestDemo: "Request a demo",
    built: "Built with communities in mind.",
    powered: "Powered by BracketDex",
  },
  mr: {
    platformNav: "प्लॅटफॉर्म",
    services: "सेवा",
    contact: "संपर्क",
    portal: "पोर्टल लॉगिन",
    heroKicker: "समवेत प्रस्तुत",
    heroTitle: ["गणेशोत्सव २०२६ चे डिजिटायझेशन"],
    heroIntro:
      "मंडळे, विश्वस्त संस्था आणि भाविकांसाठी एक जोडलेले डिजिटल व्यासपीठ — देणग्या, थेट दर्शन आणि उत्सवातील प्रत्येक क्षणाचे व्यवस्थापन करण्यासाठी.",
    explore: "उत्सव व्यासपीठ पाहा",
    trustStrong: "गणपती बाप्पा मोरया.",
    trust: "परंपरेचे सुंदर डिजिटायझेशन.",
    scroll: "SAMAVET आपल्या उत्सवाला कशी साथ देते ते पाहण्यासाठी स्क्रोल करा.",
    platformLabel: "एक जोडलेले व्यासपीठ.",
    platformTitle: "आपला गणेशोत्सव चालवण्यासाठी आणि वाढवण्यासाठी आवश्यक सर्व काही.",
    platformIntro:
      "आजपासून सुरू करण्याइतके सोपे आणि पुढील अनेक वर्षांच्या वाढीसाठी पुरेसे सक्षम.",
    viewDetails: "सविस्तर माहिती",
    talk: "आमच्या टीमशी संपर्क साधा",
    template: "नमुना",
    epawatiGraphic: "आपली पावती. ePawati द्वारे डिजिटल.",
    epawatiFlow: ["मंडळाचे डिझाइन", "डिजिटल ई-पावती", "व्हॉट्सॲपवर पाठवा"],
    live: "थेट",
    metricLabels: ["सहभागी", "थेट चॅनेल", "मीडिया कथा", "सक्रिय विभाग", "प्रसारणासाठी तयार", "पुन्हा वापरता येणारे अधिक साहित्य"],
    alongside: "विश्वस्त संस्था ✦ मंदिरे ✦ गणेश मंडळे ✦ स्वयंसेवी संस्था ✦ सामाजिक संस्थांसोबत विकसित.",
    showcaseLabel: "आपल्या कार्याचा स्पष्ट आढावा",
    showcaseTitle: "एक व्यासपीठ. प्रत्येक महत्त्वाचा क्षण.",
    captions: [
      "आपल्या समुदायाचा एका नजरेत आढावा घ्या.",
      "प्रत्येक देणगीदाराशी कुठूनही जोडलेले राहा.",
      "प्रत्येक उत्सव भाविकांसोबत ऑनलाइन शेअर करा.",
    ],
    experience: "SAMAVET प्लॅटफॉर्म प्रत्यक्ष काम करताना पाहा.",
    advantageCount: "०२ — SAMAVET चे फायदे",
    advantageLabel: "कमी गुंतागुंत. अधिक समुदायभावना.",
    advantageTitle: "आपल्या मंडळाच्या रोजच्या प्रत्यक्ष कार्यपद्धतीसाठी तयार केलेले.",
    without: "SAMAVET शिवाय",
    with: "SAMAVET सह",
    withoutItems: [
      "वेगवेगळ्या स्प्रेडशीट्स आणि विखुरलेल्या नोंदी.",
      "हाताने पावत्या आणि वारंवार पाठपुरावा.",
      "एकमेकांपासून वेगळी प्रसारण साधने.",
      "समुदायाच्या कामाचा एकत्रित आढावा नाही.",
    ],
    withItems: [
      "आपल्या माहितीसाठी एक सुरक्षित आणि अधिकृत स्रोत.",
      "तत्काळ डिजिटल ई-पावत्या.",
      "एका ठिकाणाहून एकाच वेळी सर्वत्र प्रसारण.",
      "प्रत्येक निर्णयासाठी स्पष्ट आणि थेट माहिती.",
    ],
    footerReady: "आपला गणेशोत्सव डिजिटल करण्यासाठी तयार आहात? मार्गदर्शनासाठी आमच्याशी संपर्क साधा.",
    emailLabel: "contact@samavet.in",
    requestDemo: "डेमोची विनंती करा",
    built: "समुदायाला केंद्रस्थानी ठेवून निर्मिती.",
    powered: "BracketDex द्वारे समर्थित",
  },
};

export default function Home() {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [language, setLanguage] = useState<"en" | "mr">("en");
  const t = homeText[language];
  const localizedModules = modules.map((module) =>
    language === "mr" ? { ...module, ...module.mr } : module,
  );
  const selectedModule =
    activeModule === null ? null : localizedModules[activeModule];

  useEffect(() => {
    const saved = window.localStorage.getItem("samavet-language");
    if (saved === "mr") setLanguage("mr");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    const frame = window.requestAnimationFrame(() => window.ScrollTrigger?.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [language]);

  const changeLanguage = (nextLanguage: "en" | "mr") => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("samavet-language", nextLanguage);
  };

  const showModule = (index: number) => {
    setActiveModule(index);
  };

  useEffect(() => {
    if (activeModule === null) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("service-detail")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeModule]);

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
                duration: 0.46,
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
                duration: 0.14,
                ease: "power2.out",
              },
              0.46,
            )
            .to(
              ".hero-brand-logo-wrap",
              { opacity: 0, duration: 0.08 },
              0.5,
            );
        }

        hero
          .fromTo(
            ".hero-kicker",
            {
              opacity: 0,
              y: 14,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.14,
              ease: "power2.out",
            },
            0.5,
          )
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
            0.64,
          )
          .fromTo(
            ".hero-intro",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
            0.9,
          )
          .fromTo(
            ".hero-actions",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
            0.98,
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
    <main className={language === "mr" ? "is-marathi" : ""} lang={language}>
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
          <a href="#experience">{t.platformNav}</a>
          <span aria-hidden="true">/</span>
          <a href="https://epawati.samavet.in/">ePawati</a>
          <span aria-hidden="true">/</span>
          <a href="#platform">{t.services}</a>
          <span aria-hidden="true">/</span>
          <a href="/contact">{t.contact}</a>
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
          <a
            className="nav-cta"
            href="https://epawati.samavet.in/"
            aria-label="Log in to the SAMAVET ePawati portal"
          >
            {t.portal}
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-reveal">
          <picture>
            <source
              media="(max-width: 720px)"
              srcSet="/assets/ganesh-utsav-2026-mobile.png"
            />
            <img
              className="utsav-backdrop"
              src="/assets/ganesh-utsav-2026.jpeg"
              alt="Ganesh Utsav procession with devotees welcoming Lord Ganesha"
            />
          </picture>
          <div className="utsav-image-shade" aria-hidden="true" />
          <div className="hero-brand-logo-wrap" aria-hidden="true">
            <img
              className="hero-brand-logo"
              src="/assets/samavet-logo-transparent.png"
              alt=""
            />
          </div>
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">{t.heroKicker}</p>
            <h1 className="hero-title">
              {t.heroTitle.map((line) => (
                <span className="hero-title-line" key={line}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            <p className="hero-intro">{t.heroIntro}</p>
            <div className="hero-actions">
              <div className="hero-cta-group">
                <a className="primary-button" href="#platform">
                  {t.explore} <span>↓</span>
                </a>
                <a className="secondary-button" href="/contact">
                  {t.talk} <span>↗</span>
                </a>
              </div>
              <span className="trust-note">
                <b>{t.trustStrong}</b> {t.trust}
              </span>
            </div>
          </div>
          <div className="scroll-cue">
            <span />
            {t.scroll}
          </div>
        </div>
      </section>

      <section className="platform-section" id="platform">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.platformLabel}</p>
            <h2>{t.platformTitle}</h2>
          </div>
          <p>{t.platformIntro}</p>
        </div>
        <div className="module-grid">
          {localizedModules.map((module, index) => (
            <article
              className={`module-card ${activeModule === index ? "active" : ""}`}
              key={module.number}
              role="button"
              tabIndex={0}
              aria-controls="service-detail"
              aria-expanded={activeModule === index}
              aria-labelledby={`module-title-${module.number}`}
              onClick={() => showModule(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  showModule(index);
                }
              }}
            >
              <div className="module-top">
                <span>{module.number}</span>
                <i>{module.icon}</i>
              </div>
              <p className="module-tag">{module.tag}</p>
              <h3 id={`module-title-${module.number}`}>{module.title}</h3>
              <p>{module.copy}</p>
            </article>
          ))}
        </div>
        {selectedModule && activeModule !== null && (
          <div className="service-detail" id="service-detail" aria-live="polite">
            <div className="service-detail-copy">
              <p className="service-detail-label">
                {selectedModule.tag} · {selectedModule.number}
              </p>
              <h3>{selectedModule.headline}</h3>
              <p>{selectedModule.description}</p>
              <ul>
                {selectedModule.benefits.map((benefit) => (
                  <li key={benefit}>
                    <span>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <a className="service-contact" href="/contact">
                {t.talk} <span>↗</span>
              </a>
            </div>
            {activeModule === 0 ? (
              <div className="epawati-graphic" aria-label="ePawati digital receipt workflow">
                <div className="epawati-heading">
                  <span>ePawati</span>
                  <strong>{t.epawatiGraphic}</strong>
                </div>
                <div className="epawati-collage">
                  <img
                    className="epawati-slip epawati-slip-left"
                    src="/assets/vargani-template-1.jpeg"
                    alt="Mandal Vargani receipt design"
                  />
                  <img
                    className="epawati-slip epawati-slip-center"
                    src="/assets/vargani-template-2.jpeg"
                    alt="Digitized Ganesh Mandal Vargani receipt"
                  />
                  <img
                    className="epawati-slip epawati-slip-right"
                    src="/assets/vargani-template-3.jpeg"
                    alt="Custom digital Vargani receipt"
                  />
                  <div className="epawati-receipt-chip">
                    <b>✓</b>
                    <span>WhatsApp</span>
                  </div>
                </div>
                <div className="epawati-flow">
                  {t.epawatiFlow.map((step, index) => (
                    <span key={step}>
                      <b>{String(index + 1).padStart(2, "0")}</b>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`service-visual service-visual-${activeModule}`}>
                <div className="service-visual-top">
                  <span>{selectedModule.tag}</span>
                  <b>{t.live}</b>
                </div>
                <div className="service-metrics">
                  <div>
                    <strong>{activeModule === 1 ? "1,284" : activeModule === 2 ? "2" : "24"}</strong>
                    <span>
                      {activeModule === 1
                        ? t.metricLabels[0]
                        : activeModule === 2
                          ? t.metricLabels[1]
                          : t.metricLabels[2]}
                    </span>
                  </div>
                  <div>
                    <strong>{activeModule === 1 ? "74%" : activeModule === 2 ? t.live : "4×"}</strong>
                    <span>
                      {activeModule === 1
                        ? t.metricLabels[3]
                        : activeModule === 2
                          ? t.metricLabels[4]
                          : t.metricLabels[5]}
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
        )}
        <div className="who-row" aria-label={t.alongside}>
          <p>{t.alongside}</p>
        </div>
      </section>

      <section className="showcase-section" id="experience">
        <div className="showcase-wrap">
          <div className="showcase-copy">
            <p className="eyebrow">{t.showcaseLabel}</p>
            <h2>{t.showcaseTitle}</h2>
          </div>
          <div className="gallery-stage">
            <figure className="mockup-card mock-card-left">
              <img
                src="/assets/samavet-members-vargani-dashboard.png"
                alt="SAMAVET members and Vargani management dashboard"
              />
              <figcaption>
                <span>01</span> {t.captions[0]}
              </figcaption>
            </figure>
            <figure className="mockup-card mock-card-center">
              <img
                src="/assets/samavet-vargani-overview.png"
                alt="SAMAVET Vargani slips collection overview"
              />
              <figcaption>
                <span>02</span> {t.captions[1]}
              </figcaption>
            </figure>
            <figure className="mockup-card mock-card-right">
              <img
                src="/assets/samavet-vargani-records.png"
                alt="SAMAVET detailed Vargani receipt records"
              />
              <figcaption>
                <span>03</span> {t.captions[2]}
              </figcaption>
            </figure>
          </div>
          <div className="showcase-progress">
            <span>{t.experience}</span>
            <i />
          </div>
        </div>
      </section>

      <section className="advantage-section">
        <div className="section-count">{t.advantageCount}</div>
        <div className="advantage-layout">
          <div>
            <p className="eyebrow">{t.advantageLabel}</p>
            <h2>{t.advantageTitle}</h2>
          </div>
          <div className="comparison">
            <div className="comparison-card muted">
              <p>{t.without}</p>
              <ul>
                {t.withoutItems.map((item) => (
                  <li key={item}><span>×</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="comparison-card bright">
              <p>{t.with}</p>
              <ul>
                {t.withItems.map((item) => (
                  <li key={item}><span>✓</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-cta">
          <h2>{t.footerReady}</h2>
          <div>
            <a className="footer-email" href="mailto:contact@samavet.in">
              {t.emailLabel}
            </a>
            <a className="footer-button" href="/contact">
              {t.requestDemo} <span>↗</span>
            </a>
          </div>
        </div>
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
          <p>{t.built}</p>
          <a
            href="https://www.bracketdex.com/"
            target="_blank"
            rel="noreferrer"
          >
            {t.powered}
          </a>
        </div>
      </footer>
    </main>
  );
}
