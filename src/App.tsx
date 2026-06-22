import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Film,
  Heart,
  Sparkles,
  BookOpen,
  Scissors,
  CalendarCheck,
  Aperture,
  Phone,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Plus,
  Minus,
  Star,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import rings from "@/assets/rings.jpg";
import about1 from "@/assets/about1.jpg";
import about2 from "@/assets/about2.jpg";
import nivesahLogo from "@/assets/Nivesah 4K-3.png";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
const WHATSAPP = "918446752571";
const PHONE_DISPLAY = "+91 8446752571";
const WA_MSG = encodeURIComponent(
  "Hello Nivesah Weddings,\n\nI would like to enquire about wedding services.\n\nName:\nWedding Date:\nLocation:\nService Required:\n\nPlease share package details.",
);
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${WA_MSG}`;

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animation =
              "reveal 1s cubic-bezier(.2,.7,.2,1) both";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => {
      n.style.opacity = "0";
      io.observe(n);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

function Particles() {
  const items = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = (i * 53) % 100;
        const size = 3 + ((i * 7) % 6);
        const delay = (i * 0.8) % 14;
        const dur = 14 + ((i * 3) % 12);
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: `-10px`,
              width: size,
              height: size,
              background:
                "radial-gradient(circle, rgba(255,235,200,0.9), rgba(255,235,200,0) 70%)",
              animation: `drift ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Experience", "#experience"],
    ["Portfolio", "#portfolio"],
    ["Stories", "#testimonials"],
    ["Contact", "#contact"],
  ] as const;
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        <a
          href="#top"
          className="shrink-0"
        >
          <img
            src={nivesahLogo}
            alt="Nivesah Weddings by iFilms Media"
            className={`h-11 w-[125px] sm:w-[135px] lg:w-[145px] object-contain object-left rounded-xl bg-white/95 p-1 transition-all duration-500 ${
              scrolled ? "shadow-sm" : "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.85)]"
            }`}
          />
          <span className="hidden">
            Weddings · iFilms
          </span>
        </a>
        <nav
          className={`hidden lg:flex items-center gap-9 text-xs tracking-[0.22em] uppercase ${
            scrolled ? "text-ink/80" : "text-ivory/90"
          }`}
        >
          {links.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-olive transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className={`hidden lg:inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase px-5 py-3 border transition-all duration-500 ${
            scrolled
              ? "border-olive text-olive hover:bg-olive hover:text-ivory"
              : "border-ivory/70 text-ivory hover:bg-ivory hover:text-ink"
          }`}
        >
          Book Now <ArrowUpRight className="size-3.5" />
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className={`lg:hidden ${scrolled ? "text-ink" : "text-ivory"}`}
        >
          {open ? <Minus className="size-6" /> : <Plus className="size-6 rotate-45" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-ivory/95 backdrop-blur-xl border-t border-border mt-3">
          <div className="px-6 py-6 flex flex-col gap-4 text-sm tracking-[0.2em] uppercase">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="text-ink/80">
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden grain bg-ink">
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Luxury wedding couple in golden light"
          className="w-full h-full object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.6)_100%)]" />
      </div>
      <Particles />

      <Nav />

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-10 items-center pt-32 pb-20">
          <div className="lg:col-span-8 text-ivory animate-reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="hairline bg-champagne" />
              <span className="eyebrow text-champagne">Nivesah · iFilms Media</span>
            </div>
            <h1 className="font-display text-[clamp(2.8rem,7.5vw,7.5rem)] leading-[0.95] tracking-tight">
              Your Wedding,
              <br />
              <span className="italic text-champagne">Told</span> Like Cinema
            </h1>
            <p className="mt-10 max-w-xl text-ivory/85 text-base lg:text-lg leading-relaxed font-light">
              We help you turn your special day into unforgettable memories to be treasured for a
              lifetime. Every wedding has its own unique narrative — and Nivesah Weddings ensures
              it is captured in the most delightful manner.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <a
                href="#contact"
                className="btn-primary bg-champagne text-ink border-champagne hover:bg-transparent hover:text-champagne"
              >
                Book Your Story
              </a>
              <a href="#portfolio" className="btn-ghost">
                View Films
              </a>
              <a
                href={`tel:${WHATSAPP}`}
                className="flex items-center gap-3 text-ivory/90 hover:text-champagne transition-colors pl-2"
              >
                <Phone className="size-4" />
                <span className="tracking-[0.2em] text-sm">{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="glass rounded-sm bg-ivory/88 border border-white/60 p-3 animate-float">
              <img
                src={rings}
                alt="Wedding rings with roses"
                className="w-full h-[420px] object-cover"
                width={800}
                height={1024}
              />
              <div className="px-2 pt-4 pb-2 flex items-center justify-between text-ink">
                <div>
                  <p className="eyebrow text-olive">Vol. 01</p>
                  <p className="font-display text-xl mt-1">Forever, Captured</p>
                </div>
                <Sparkles className="size-5 text-olive" />
              </div>
            </div>
            <div className="absolute -top-8 -left-10 glass rounded-sm bg-ivory/88 border border-white/60 px-5 py-4 text-ink hidden xl:block">
              <p className="eyebrow text-olive">Since 2017</p>
              <p className="font-display text-2xl leading-none mt-2">100+ Weddings</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 inset-x-0 flex justify-center text-ivory/70 text-[0.65rem] tracking-[0.4em] uppercase">
          <span className="flex items-center gap-3">
            <span className="hairline bg-ivory/40" /> Scroll{" "}
            <span className="hairline bg-ivory/40" />
          </span>
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useReveal();
  return (
    <section id="about" ref={ref} className="relative py-28 lg:py-40 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6 relative" data-reveal>
          <img
            src={about1}
            alt="Bride getting ready"
            className="w-full h-[560px] object-cover shadow-2xl"
            loading="lazy"
          />
          <img
            src={about2}
            alt="Couple at sunset"
            className="hidden md:block absolute -bottom-12 -right-6 w-[260px] h-[340px] object-cover border-8 border-ivory shadow-2xl"
            loading="lazy"
          />
          <div className="absolute -left-6 top-10 hidden md:flex flex-col items-center gap-2 text-olive">
            <span className="h-24 w-px bg-olive/50" />
            <span
              className="text-[0.6rem] tracking-[0.4em] uppercase"
              style={{ writingMode: "vertical-rl" }}
            >
              Est. 2017 · Mumbai
            </span>
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline" />
            <span className="eyebrow">About the Studio</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            A house of <em className="text-olive">timeless</em> wedding storytelling.
          </h2>
          <div className="mt-8 space-y-5 text-foreground/75 leading-relaxed font-light max-w-xl">
            <p>
              We help you turn your special day into unforgettable memories to be treasured for a
              lifetime. To make your wedding beautiful is our responsibility.
            </p>
            <p>
              We specialize in photography, cinematography and capturing candid emotions,
              meaningful connections, and memorable moments with creativity and poise.
            </p>
            <p>
              All aspects of event planning, execution, and professional post-production are
              covered by us — so you can be sure your celebration is captured to perfection and
              runs smoothly.
            </p>
          </div>

          <figure className="mt-12 border-l-2 border-olive pl-6 max-w-lg">
            <blockquote className="font-display italic text-2xl md:text-3xl leading-snug text-ink">
              "Every celebration has a soul. We preserve it beautifully."
            </blockquote>
            <figcaption className="mt-3 eyebrow">— The Nivesah Atelier</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Camera, title: "Wedding Photography", desc: "Editorial portraits, candid moments and timeless frames." },
  { icon: Film, title: "Cinematography", desc: "Feature-style wedding films with cinematic grading." },
  { icon: Heart, title: "Pre-Wedding Shoots", desc: "Intimate love stories told across breathtaking locations." },
  { icon: Aperture, title: "Candid Photography", desc: "Honest emotion, captured between the planned moments." },
  { icon: Sparkles, title: "Wedding Films", desc: "Trailers, highlight reels and full ceremonial films." },
  { icon: BookOpen, title: "Luxury Albums", desc: "Hand-bound, archival heirloom albums in fine materials." },
  { icon: Scissors, title: "Professional Editing", desc: "Color, sound and story crafted in our private studio." },
  { icon: CalendarCheck, title: "Event Planning", desc: "Coordinated execution so your day flows effortlessly." },
];

function Services() {
  const ref = useReveal();
  return (
    <section
      id="services"
      ref={ref}
      className="relative overflow-hidden py-28 lg:py-40 bg-[oklch(0.97_0.012_80)]"
    >
      <div className="absolute inset-0">
        <img
          src={about2}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.12] scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,242,233,0.9),rgba(247,242,233,0.95))]" />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          data-reveal
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline" />
              <span className="eyebrow">Our Services</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl max-w-2xl leading-[1.05]">
              Crafted with <em className="text-olive">intention.</em>
              <br />
              Delivered with poise.
            </h2>
          </div>
          <p className="md:max-w-sm text-foreground/70 font-light leading-relaxed">
            A complete creative atelier for couples who want their wedding remembered like a film —
            and presented like a magazine.
          </p>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60" data-reveal>
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <article
              key={title}
              className="group relative border border-white/35 bg-ivory/72 p-8 lg:p-10 backdrop-blur-[2px] transition-all duration-500 hover:bg-ivory/88"
            >
              <span className="absolute top-6 right-6 text-[0.65rem] tracking-[0.3em] text-olive/70">
                / {String(i + 1).padStart(2, "0")}
              </span>
              <div className="size-14 rounded-full border border-olive/40 flex items-center justify-center mb-8 group-hover:bg-olive group-hover:border-olive transition-colors">
                <Icon
                  className="size-5 text-olive group-hover:text-ivory transition-colors"
                  strokeWidth={1.4}
                />
              </div>
              <h3 className="font-display text-2xl leading-snug">{title}</h3>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed font-light">{desc}</p>
              <span className="block mt-6 h-px w-0 bg-olive group-hover:w-full transition-all duration-700" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const STAGES = [
  ["01", "Discovery Call", "We listen to your story, your vision, your aesthetic."],
  ["02", "Story Planning", "A bespoke creative direction, moodboard and shot list."],
  ["03", "Wedding Coverage", "Our discreet team captures every emotion as it unfolds."],
  ["04", "Cinematic Editing", "Color, sound and narrative crafted in our private studio."],
  ["05", "Final Delivery", "Heirloom albums, 4K films and a private online gallery."],
] as const;

function Experience() {
  const ref = useReveal();
  return (
    <section id="experience" ref={ref} className="relative py-28 lg:py-40 bg-ink text-ivory grain">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-20" data-reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="hairline bg-champagne" />
            <span className="eyebrow text-champagne">The Signature Experience</span>
            <span className="hairline bg-champagne" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Five chapters. <em className="text-champagne">One</em> unforgettable story.
          </h2>
        </div>

        <div className="relative grid md:grid-cols-5 gap-10 md:gap-4" data-reveal>
          <svg
            className="hidden md:block absolute top-12 left-[10%] right-[10%] h-12 text-champagne/40"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
          >
            <path
              d="M0 20 C 200 -10, 300 50, 500 20 S 800 -10, 1000 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
          </svg>
          {STAGES.map(([n, t, d]) => (
            <div key={n} className="text-center md:text-left relative">
              <div className="flex md:block items-center gap-4 justify-center">
                <span className="font-display text-5xl md:text-6xl text-champagne">{n}</span>
              </div>
              <div className="md:mt-6 mt-2">
                <h3 className="font-display text-2xl">{t}</h3>
                <p className="mt-2 text-sm text-ivory/65 font-light leading-relaxed max-w-[18ch] mx-auto md:mx-0">
                  {d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  ["100+", "Weddings Captured"],
  ["50+", "Happy Couples"],
  ["8+", "Years Creative Experience"],
  ["4K", "Cinematic Delivery"],
  ["Pro", "Editing Workflow"],
  ["1:1", "Personalised Storytelling"],
] as const;

function Trust() {
  const ref = useReveal();
  return (
    <section ref={ref} className="-mt-8 lg:-mt-12 py-24 bg-ivory border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-border"
          data-reveal
        >
          {TRUST.map(([k, v]) => (
            <div key={v} className="px-6 py-4 text-center">
              <div
                className="text-4xl md:text-5xl text-olive leading-none"
                style={{ fontFamily: '"Prata", serif' }}
              >
                {k}
              </div>
              <p className="mt-2 text-[0.7rem] tracking-[0.28em] uppercase text-foreground/60">
                {v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PORTFOLIO = [
  { img: p1, couple: "Aanya & Vihaan", loc: "Udaipur, Rajasthan", h: "row-span-2" },
  { img: p2, couple: "Riya & Arjun", loc: "Pune, Maharashtra", h: "" },
  { img: p3, couple: "Meera & Kabir", loc: "Jaipur Palace", h: "" },
  { img: p4, couple: "Saanvi & Ishaan", loc: "Goa Coastline", h: "row-span-2" },
  { img: p5, couple: "Naina & Veer", loc: "Mumbai Heritage", h: "" },
  { img: p6, couple: "Anushka & Aarav", loc: "Delhi Reception", h: "" },
];

function Portfolio() {
  const ref = useReveal();
  return (
    <section id="portfolio" ref={ref} className="py-28 lg:py-40 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14"
          data-reveal
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline" />
              <span className="eyebrow">Selected Stories</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl max-w-2xl leading-[1.05]">
              A portfolio of <em className="text-olive">love,</em> light and legacy.
            </h2>
          </div>
          <a
            href="#contact"
            className="self-start md:self-end inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-olive hover:gap-4 transition-all"
          >
            View Full Archive <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-4 lg:gap-6"
          data-reveal
        >
          {PORTFOLIO.map((p, i) => (
            <figure key={i} className={`group relative overflow-hidden ${p.h}`}>
              <img
                src={p.img}
                alt={p.couple}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-ivory">
                <p className="eyebrow text-champagne flex items-center gap-2">
                  <MapPin className="size-3" /> {p.loc}
                </p>
                <h3 className="font-display text-2xl lg:text-3xl mt-2">{p.couple}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.3em] uppercase opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  View Story <ArrowUpRight className="size-3.5" />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    name: "Aanya & Vihaan",
    loc: "Udaipur Wedding",
    quote:
      "Nivesah turned our wedding into a film we will cherish forever. Every frame feels like a memory we can step back into.",
  },
  {
    name: "Riya & Arjun",
    loc: "Pune Wedding",
    quote:
      "Beyond beautiful. The team was poised, invisible when needed, and the album is a true heirloom.",
  },
  {
    name: "Saanvi & Ishaan",
    loc: "Goa Destination",
    quote:
      "They captured the soul of our days — the laughter, the tears, the tiny in-between glances. Pure magic.",
  },
];

function Testimonials() {
  const ref = useReveal();
  return (
    <section id="testimonials" ref={ref} className="py-28 lg:py-40 bg-[oklch(0.97_0.012_80)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16" data-reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="hairline" />
            <span className="eyebrow">Love Letters</span>
            <span className="hairline" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Words from our <em className="text-olive">couples.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8" data-reveal>
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="bg-ivory p-8 lg:p-10 border border-border relative">
              <div className="flex gap-1 text-champagne mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="font-display italic text-xl lg:text-2xl leading-snug text-ink">
                "{t.quote}"
              </p>
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-champagne to-blush flex items-center justify-center font-display text-lg text-ink">
                  {t.name.split(" ")[0][0]}
                </div>
                <div>
                  <p className="font-display text-lg leading-none">{t.name}</p>
                  <p className="text-[0.7rem] tracking-[0.25em] uppercase mt-1 text-foreground/55">
                    {t.loc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What services do you provide?",
    a: "Wedding photography, cinematography, pre-wedding shoots, candid coverage, films, luxury albums, professional editing and full event planning.",
  },
  {
    q: "Do you cover destination weddings?",
    a: "Absolutely — within India and abroad. Travel and accommodation are quoted transparently in your bespoke package.",
  },
  {
    q: "Can we customize packages?",
    a: "Yes. Every Nivesah experience is tailored to your celebration, scale and creative vision.",
  },
  {
    q: "How early should we book?",
    a: "We recommend reserving your date 6 to 9 months in advance. Peak season dates often fill earlier.",
  },
  {
    q: "Do you provide albums and wedding films?",
    a: "Yes — hand-bound archival albums and full cinematic films with highlight trailers and ceremonial cuts.",
  },
];

function ContactAndFaq() {
  const ref = useReveal();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="contact" ref={ref} className="py-28 lg:py-40 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-6" data-reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline" />
            <span className="eyebrow">Frequently Asked</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-10">
            Everything you'd like to <em className="text-olive">know.</em>
          </h2>
          <div className="border-t border-border">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span className="font-display text-xl md:text-2xl leading-snug group-hover:text-olive transition-colors">
                      {f.q}
                    </span>
                    <span className="shrink-0 size-9 rounded-full border border-olive/40 flex items-center justify-center text-olive">
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{ maxHeight: isOpen ? 200 : 0 }}
                  >
                    <p className="pb-6 pr-12 text-foreground/70 font-light leading-relaxed">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal>
          <div className="bg-ink text-ivory p-8 lg:p-12 grain relative">
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline bg-champagne" />
              <span className="eyebrow text-champagne">Begin Your Story</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl leading-[1.05] mb-8">
              Tell us about your <em className="text-champagne">wedding.</em>
            </h3>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(WA_LINK, "_blank");
              }}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Name" name="name" />
                <Field label="Phone Number" name="phone" type="tel" />
                <Field label="Wedding Date" name="date" type="date" />
                <Field label="Wedding Location" name="location" />
              </div>
              <Field label="Service Required" name="service" />
              <Field label="Message" name="message" textarea />
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 mt-2 px-10 py-4 bg-champagne text-ink text-xs tracking-[0.35em] uppercase border border-champagne hover:bg-transparent hover:text-champagne transition-all duration-500"
              >
                Send Enquiry <ArrowUpRight className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full bg-transparent border-b border-ivory/30 focus:border-champagne outline-none py-3 text-ivory placeholder:text-ivory/40 transition-colors";
  return (
    <label className="block">
      <span className="text-[0.65rem] tracking-[0.3em] uppercase text-ivory/60">{label}</span>
      {textarea ? (
        <textarea name={name} rows={3} className={cls} required={name === "name"} />
      ) : (
        <input
          name={name}
          type={type}
          className={cls}
          autoComplete={type === "date" ? "off" : undefined}
          defaultValue={type === "date" ? "" : undefined}
          required={name === "name" || name === "phone"}
        />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-ivory pt-20 pb-10 grain">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex flex-col gap-4">
            <img
              src={nivesahLogo}
              alt="Nivesah Weddings by iFilms Media"
              className="h-20 w-[280px] object-contain object-left rounded-sm bg-white p-2"
            />
            <span className="font-display text-3xl">Nivesah</span>
            <span className="eyebrow text-champagne mt-2">Weddings · iFilms Media</span>
          </div>
          <p className="mt-6 max-w-sm text-ivory/60 font-light leading-relaxed">
            A boutique atelier preserving wedding stories with dedication, precision and a personal
            approach.
          </p>
          <a
            href={`tel:${WHATSAPP}`}
            className="mt-8 inline-flex items-center gap-3 font-display text-2xl text-champagne hover:text-ivory transition-colors"
          >
            <Phone className="size-5" /> {PHONE_DISPLAY}
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-champagne mb-5">Explore</p>
          <ul className="space-y-3 text-sm text-ivory/75">
            {["About", "Services", "Experience", "Portfolio", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-champagne transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-champagne mb-5">Follow the Stories</p>
          <div className="flex gap-3">
            {[
              { I: Instagram, h: "https://instagram.com" },
              { I: Facebook, h: "https://facebook.com" },
              { I: Youtube, h: "https://youtube.com" },
            ].map(({ I, h }, i) => (
              <a
                key={i}
                href={h}
                target="_blank"
                rel="noreferrer"
                className="size-11 rounded-full border border-ivory/20 flex items-center justify-center hover:bg-olive hover:border-olive transition-colors"
              >
                <I className="size-4" strokeWidth={1.4} />
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs text-ivory/50 leading-relaxed">
            Studio by appointment.
            <br /> Mumbai · Pan India · Destinations Worldwide.
          </p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-14 pt-6 border-t border-ivory/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[0.7rem] tracking-[0.25em] uppercase text-ivory/40">
        <p>© {new Date().getFullYear()} Nivesah Weddings by iFilms Media. All rights reserved.</p>
        <p>Crafted with devotion.</p>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(37,211,102,0.6)] transition-all hover:-translate-y-0.5"
    >
      <span className="relative">
        <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
        <MessageCircle className="size-5 relative" />
      </span>
      <span className="text-xs tracking-[0.25em] uppercase">Chat With Us</span>
    </a>
  );
}

export default function App() {
  return (
    <main className="bg-ivory text-ink">
      <Hero />
      <About />
      <Services />
      <Experience />
      <Trust />
      <Portfolio />
      <Testimonials />
      <ContactAndFaq />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
