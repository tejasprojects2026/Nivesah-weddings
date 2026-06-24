import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type RefObject } from "react";
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
const WHATSAPP = "918446752571";
const PHONE_DISPLAY = "+91 8446752571";
const WA_MSG = encodeURIComponent(
  "Hello Nivesah Weddings,\n\nI would like to enquire about wedding services.\n\nName:\nWedding Date:\nLocation:\nService Required:\n\nPlease share package details.",
);
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${WA_MSG}`;
const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
] as const;

const SERVICE_MESSAGES = {
  "Wedding Photography":
    "Hello Nivesah Weddings, I would love to enquire about Wedding Photography coverage for our celebration. Please share package details, availability, and the overall experience.",
  Cinematography:
    "Hello Nivesah Weddings, I am interested in Cinematography for our wedding. Please share your film coverage options, deliverables, and pricing.",
  "Pre-Wedding Shoots":
    "Hello Nivesah Weddings, we would like to enquire about a Pre-Wedding Shoot. Please guide us on locations, concepts, and package options.",
  "Candid Photography":
    "Hello Nivesah Weddings, I am looking for Candid Photography coverage for our wedding events. Please share your approach, availability, and pricing.",
  "Wedding Films":
    "Hello Nivesah Weddings, I would like to know more about your Wedding Films service. Please share details on trailers, highlight reels, and full film delivery.",
  "Luxury Albums":
    "Hello Nivesah Weddings, I am interested in your Luxury Albums. Please share album styles, finishes, and package details.",
  "Professional Editing":
    "Hello Nivesah Weddings, I would like to enquire about Professional Editing support for our wedding visuals. Please share details on editing, grading, and delivery timelines.",
  "Event Planning":
    "Hello Nivesah Weddings, we would like to enquire about Event Planning support for our wedding. Please share how your planning service works and what is included.",
} as const;

type ServiceTitle = keyof typeof SERVICE_MESSAGES;

const ABOUT_CAROUSEL = [
  {
    primary: about1,
    secondary: about2,
    altPrimary: "Bride getting ready",
    altSecondary: "Couple at sunset",
    badge: "Est. 2017 · Mumbai",
    kicker: "Bridal Mornings",
    title: "Soft light, heirloom detail, and a story already unfolding.",
  },
  {
    primary: p4,
    secondary: p2,
    altPrimary: "Bride and groom embracing outdoors",
    altSecondary: "Bride smiling during celebration",
    badge: "Destination Stories",
    kicker: "Golden Hour",
    title: "Cinematic portraits that feel intimate, warm, and timeless.",
  },
  {
    primary: p1,
    secondary: p6,
    altPrimary: "Couple portrait in formal wedding attire",
    altSecondary: "Wedding couple in a candid moment",
    badge: "Luxury Coverage",
    kicker: "Editorial Romance",
    title: "Every frame composed with emotion, movement, and grace.",
  },
] as const;

type EnquiryFormState = {
  name: string;
  phone: string;
  date: string;
  location: string;
  service: string;
  message: string;
};

type EnquiryErrors = Partial<Record<keyof EnquiryFormState, string>>;

function useNumeralFont(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const wrapNumerals = (textNode: Text) => {
      const value = textNode.nodeValue;
      const parent = textNode.parentElement;

      if (!value || !/\d/.test(value) || !parent) return;
      if (parent.closest(".font-numerals, script, style, textarea, input, select, option")) return;

      const fragment = document.createDocumentFragment();
      const pattern = /\d+/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = pattern.exec(value)) !== null) {
        if (match.index > lastIndex) {
          fragment.append(document.createTextNode(value.slice(lastIndex, match.index)));
        }

        const numeral = document.createElement("span");
        numeral.className = "font-numerals";
        numeral.textContent = match[0];
        fragment.append(numeral);
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < value.length) {
        fragment.append(document.createTextNode(value.slice(lastIndex)));
      }

      parent.replaceChild(fragment, textNode);
    };

    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        wrapNumerals(node as Text);
        return;
      }

      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];

      while (walker.nextNode()) {
        textNodes.push(walker.currentNode as Text);
      }

      textNodes.forEach(wrapNumerals);
    };

    processNode(root);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "characterData") {
          processNode(mutation.target);
        }

        mutation.addedNodes.forEach(processNode);
      });
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [ref]);
}

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
              <div className="relative">
                <img
                  src={rings}
                  alt="Wedding rings with roses"
                  className="w-full h-[420px] object-cover"
                  width={800}
                  height={1024}
                />
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex size-10 items-center justify-center rounded-full border border-white/55 bg-ivory/78 text-olive shadow-[0_12px_30px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive hover:text-ivory"
                    >
                      <Icon className="size-4" strokeWidth={1.6} />
                    </a>
                  ))}
                </div>
              </div>
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

function AdCarouselSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setActive(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => window.clearInterval(timer);
  }, [api]);

  return (
    <section className="relative py-24 lg:py-32 bg-[oklch(0.975_0.012_82)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="hairline" />
              <span className="eyebrow">Featured Stories</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl">
              A dedicated <em className="text-olive">showcase</em> for your signature wedding ads.
            </h2>
          </div>
          <p className="max-w-md text-foreground/70 font-light leading-relaxed">
            A separate auto carousel that highlights premium wedding frames without interrupting the
            About section.
          </p>
        </div>

        <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="overflow-hidden"
      >
        <CarouselContent className="ml-0">
          {ABOUT_CAROUSEL.map((slide) => (
            <CarouselItem key={slide.title} className="pl-0">
              <article className="relative overflow-hidden bg-[#f4ecdf] p-4 md:p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
                <div className="relative min-h-[520px] md:min-h-[640px]">
                  <div className="absolute left-0 top-8 bottom-8 z-10 hidden md:flex flex-col items-center gap-3 text-olive/80">
                    <span className="h-24 w-px bg-olive/45" />
                    <span
                      className="text-[0.62rem] tracking-[0.42em] uppercase"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      {slide.badge}
                    </span>
                  </div>

                  <div className="relative h-full md:ml-10 md:mr-6 md:mb-12">
                    <img
                      src={slide.primary}
                      alt={slide.altPrimary}
                      className="h-[520px] md:h-[640px] w-full object-cover"
                      loading="lazy"
                    />

                    <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-4 md:hidden">
                      <div className="bg-ivory/88 px-3 py-2 text-[0.62rem] tracking-[0.28em] uppercase text-olive shadow-sm backdrop-blur-sm">
                        {slide.badge}
                      </div>
                    </div>

                    <div className="absolute inset-x-4 bottom-4 bg-ivory/88 p-4 backdrop-blur-sm md:left-8 md:bottom-8 md:max-w-sm">
                      <p className="eyebrow">{slide.kicker}</p>
                      <p className="mt-2 font-display text-2xl leading-[1.02] text-ink md:text-3xl">
                        {slide.title}
                      </p>
                    </div>
                  </div>

                  <div className="relative mx-auto -mt-28 w-[38%] min-w-[170px] max-w-[250px] md:absolute md:right-0 md:bottom-0 md:mt-0 md:w-[42%] md:max-w-[320px]">
                    <img
                      src={slide.secondary}
                      alt={slide.altSecondary}
                      className="h-[220px] w-full border-[10px] border-ivory object-cover shadow-2xl md:h-[300px]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex items-center justify-center gap-3">
        {ABOUT_CAROUSEL.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              active === index ? "w-12 bg-olive" : "w-2.5 bg-olive/25 hover:bg-olive/45"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
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
  {
    icon: Camera,
    title: "Wedding Photography",
    desc: "Editorial portraits, candid moments and timeless frames.",
    image: p1,
  },
  {
    icon: Film,
    title: "Cinematography",
    desc: "Feature-style wedding films with cinematic grading.",
    image: p4,
  },
  {
    icon: Heart,
    title: "Pre-Wedding Shoots",
    desc: "Intimate love stories told across breathtaking locations.",
    image: about2,
  },
  {
    icon: Aperture,
    title: "Candid Photography",
    desc: "Honest emotion, captured between the planned moments.",
    image: p2,
  },
  {
    icon: Sparkles,
    title: "Wedding Films",
    desc: "Trailers, highlight reels and full ceremonial films.",
    image: hero,
  },
  {
    icon: BookOpen,
    title: "Luxury Albums",
    desc: "Hand-bound, archival heirloom albums in fine materials.",
    image: about1,
  },
  {
    icon: Scissors,
    title: "Professional Editing",
    desc: "Color, sound and story crafted in our private studio.",
    image: p6,
  },
  {
    icon: CalendarCheck,
    title: "Event Planning",
    desc: "Coordinated execution so your day flows effortlessly.",
    image: p5,
  },
];

function Services({
  onSelectService,
  selectedService,
}: {
  onSelectService: (service: ServiceTitle | "") => void;
  selectedService: ServiceTitle | "";
}) {
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
          {SERVICES.map(({ icon: Icon, title, desc, image }, i) => (
            <button
              key={title}
              type="button"
              onClick={() => onSelectService(title)}
              className={`group relative isolate overflow-hidden border border-white/35 bg-ivory/82 p-8 lg:p-10 text-left backdrop-blur-[2px] transition-all duration-500 hover:bg-ivory/70 ${
                selectedService === title ? "ring-1 ring-olive/40" : ""
              }`}
            >
              <div className="absolute inset-0 -z-20 overflow-hidden">
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(248,242,233,0.96),rgba(244,237,226,0.94))] transition-all duration-700 group-hover:bg-[linear-gradient(180deg,rgba(248,242,233,0.22),rgba(244,237,226,0.12))]" />
              <div className="absolute inset-0 -z-10 bg-olive/0 transition-colors duration-700 group-hover:bg-olive/5" />
              <span className="absolute top-6 right-6 text-[0.65rem] tracking-[0.3em] text-olive/70 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0">
                / {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative size-14 rounded-full border border-olive/40 flex items-center justify-center mb-8 transition-all duration-500 group-hover:translate-y-3 group-hover:opacity-0">
                <Icon
                  className="size-5 text-olive group-hover:text-ivory transition-colors"
                  strokeWidth={1.4}
                />
              </div>
              <h3 className="relative font-display text-2xl leading-snug transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-0">
                {title}
              </h3>
              <p className="relative mt-3 text-sm text-foreground/70 leading-relaxed font-light transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-0">
                {desc}
              </p>
              <span className="relative block mt-6 h-px w-0 bg-olive transition-all duration-700 group-hover:w-full group-hover:opacity-0" />
            </button>
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
  ["8+", "Years Creative Experience"],
  ["4K", "Cinematic Delivery"],
  ["1:1", "Personalised Storytelling"],
] as const;

function Trust() {
  const ref = useReveal();
  return (
    <section
      ref={ref}
      className="-mt-8 lg:-mt-12 w-full border-y border-border bg-[linear-gradient(180deg,#f8f2e9_0%,#f4ede2_100%)] py-16 lg:py-20"
    >
      <div className="w-full px-0">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 border-y border-border/80"
          data-reveal
        >
          {TRUST.map(([k, v], index) => (
            <div
              key={v}
              className={`flex min-h-[180px] flex-col items-center justify-center px-8 py-10 text-center ${
                index % 2 === 0 ? "border-r border-border/80 lg:border-r" : "lg:border-r border-border/80"
              } ${index === TRUST.length - 1 ? "border-r-0" : ""} ${
                index === 1 ? "border-r-0 lg:border-r" : ""
              }`}
            >
              <div
                className="text-5xl md:text-6xl text-olive leading-none"
                style={{ fontFamily: '"Prata", serif' }}
              >
                {k}
              </div>
              <p className="mt-4 max-w-[16ch] text-[0.72rem] tracking-[0.34em] uppercase text-foreground/60">
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
  {
    img: p1,
    couple: "Aanya & Vihaan",
    loc: "Udaipur, Rajasthan",
    h: "row-span-2",
    gallery: [p1, about1, p6],
  },
  {
    img: p2,
    couple: "Riya & Arjun",
    loc: "Pune, Maharashtra",
    h: "",
    gallery: [p2, about2, p1],
  },
  {
    img: p3,
    couple: "Meera & Kabir",
    loc: "Jaipur Palace",
    h: "",
    gallery: [p3, p5, about2],
  },
  {
    img: p4,
    couple: "Saanvi & Ishaan",
    loc: "Goa Coastline",
    h: "row-span-2",
    gallery: [p4, p6, about1],
  },
  {
    img: p5,
    couple: "Naina & Veer",
    loc: "Mumbai Heritage",
    h: "",
    gallery: [p5, p3, p2],
  },
  {
    img: p6,
    couple: "Anushka & Aarav",
    loc: "Delhi Reception",
    h: "",
    gallery: [p6, p4, p1],
  },
];

function Portfolio() {
  const ref = useReveal();
  const [activeStory, setActiveStory] = useState<(typeof PORTFOLIO)[number] | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const openStory = (story: (typeof PORTFOLIO)[number]) => {
    setActiveStory(story);
    setActiveImage(story.gallery[0]);
  };

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
            <button
              key={i}
              type="button"
              onClick={() => openStory(p)}
              className={`group relative overflow-hidden text-left cursor-pointer ${p.h}`}
              aria-label={`Open ${p.couple} story gallery`}
            >
              <img
                src={p.img}
                alt={p.couple}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-ivory">
                <p className="eyebrow text-champagne flex items-center gap-2">
                  <MapPin className="size-3" /> {p.loc}
                </p>
                <h3 className="font-display text-2xl lg:text-3xl mt-2">{p.couple}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.3em] uppercase opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  View Story <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog
        open={!!activeStory}
        onOpenChange={(open) => {
          if (!open) {
            setActiveStory(null);
            setActiveImage(null);
          }
        }}
      >
        {activeStory ? (
          <DialogContent className="max-w-6xl border-none bg-[oklch(0.965_0.012_78)] p-0 overflow-hidden">
            <DialogTitle className="sr-only">{activeStory.couple} gallery</DialogTitle>
            <div className="grid lg:grid-cols-[minmax(0,1.6fr)_360px]">
              <div className="bg-ink">
                <img
                  src={activeImage ?? activeStory.gallery[0]}
                  alt={activeStory.couple}
                  className="h-[55vh] w-full object-cover lg:h-[80vh]"
                />
              </div>
              <div className="p-6 lg:p-8">
                <p className="eyebrow flex items-center gap-2">
                  <MapPin className="size-3" /> {activeStory.loc}
                </p>
                <h3 className="mt-3 font-display text-4xl leading-none text-ink">
                  {activeStory.couple}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  Explore related frames from the same story. Click any image below to preview it
                  in the main view.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {activeStory.gallery.map((image, index) => {
                    const isActive = (activeImage ?? activeStory.gallery[0]) === image;
                    return (
                      <button
                        key={`${activeStory.couple}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(image)}
                        className={`overflow-hidden border transition-all ${
                          isActive
                            ? "border-olive shadow-[0_0_0_2px_rgba(112,125,76,0.15)]"
                            : "border-border hover:border-olive/50"
                        }`}
                        aria-label={`Show related image ${index + 1} for ${activeStory.couple}`}
                      >
                        <img
                          src={image}
                          alt={`${activeStory.couple} related ${index + 1}`}
                          className="h-28 w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
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

function ContactAndFaq({
  selectedService,
  onSelectService,
}: {
  selectedService: ServiceTitle | "";
  onSelectService: (service: ServiceTitle | "") => void;
}) {
  const ref = useReveal();
  const [open, setOpen] = useState<number | null>(0);
  const [form, setForm] = useState<EnquiryFormState>({
    name: "",
    phone: "",
    date: "",
    location: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const validate = (values: EnquiryFormState) => {
    const nextErrors: EnquiryErrors = {};

    if (values.name.trim().length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^\+?[0-9\s-]{10,15}$/.test(values.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (!values.date) nextErrors.date = "Please select your wedding date.";
    if (!values.location.trim()) nextErrors.location = "Please enter your wedding location.";
    if (!values.service.trim()) nextErrors.service = "Please choose the service you need.";
    if (values.message.trim().length < 20) {
      nextErrors.message = "Please add a short message with a few details.";
    }

    return nextErrors;
  };

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));

    if (name === "service") {
      const matchedService = SERVICES.find((item) => item.title === value);
      if (matchedService) {
        onSelectService(matchedService.title);
      } else {
        onSelectService("");
      }
    }
  };

  useEffect(() => {
    if (!selectedService) return;

    setForm((current) => ({
      ...current,
      service: selectedService,
      message:
        !current.message || current.message === SERVICE_MESSAGES[current.service as keyof typeof SERVICE_MESSAGES]
          ? SERVICE_MESSAGES[selectedService]
          : current.message,
    }));
    setErrors((current) => ({ ...current, service: "", message: "" }));
    document.getElementById("contact-form-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedService]);

  const clearPrefill = () => {
    const serviceBeforeClear = form.service as keyof typeof SERVICE_MESSAGES;
    const isPrefilledMessage =
      serviceBeforeClear && form.message === SERVICE_MESSAGES[serviceBeforeClear];

    setForm((current) => ({
      ...current,
      service: "",
      message: isPrefilledMessage ? "" : current.message,
    }));
    setErrors((current) => ({ ...current, service: "", message: "" }));
    onSelectService("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const msg = encodeURIComponent(
      [
        "Hello Nivesah Weddings,",
        "",
        "I would like to enquire about your wedding services.",
        "",
        `Name: ${form.name.trim()}`,
        `Phone Number: ${form.phone.trim()}`,
        `Wedding Date: ${form.date}`,
        `Wedding Location: ${form.location.trim()}`,
        `Service Required: ${form.service.trim()}`,
        "",
        "Message:",
        form.message.trim(),
      ].join("\n"),
    );

    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

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
          <div id="contact-form-panel" className="bg-ink text-ivory p-8 lg:p-12 grain relative">
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline bg-champagne" />
              <span className="eyebrow text-champagne">Begin Your Story</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl leading-[1.05] mb-8">
              Tell us about your <em className="text-champagne">wedding.</em>
            </h3>
            {selectedService ? (
              <div className="mb-6 flex items-start justify-between gap-4 border border-champagne/30 bg-champagne/10 p-4 text-sm text-ivory/85">
                <div>
                  <p className="eyebrow text-champagne">Prefilled Enquiry</p>
                  <p className="mt-2 leading-relaxed">
                    Your form is prepared for <span className="text-champagne">{selectedService}</span>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearPrefill}
                  className="shrink-0 rounded-full border border-champagne/35 p-2 text-champagne transition-colors hover:bg-champagne hover:text-ink"
                  aria-label="Clear prefilled service"
                >
                  <Minus className="size-4" />
                </button>
              </div>
            ) : null}
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Name" name="name" value={form.name} onChange={handleFieldChange} error={errors.name} />
                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleFieldChange}
                  error={errors.phone}
                />
                <Field
                  label="Wedding Date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleFieldChange}
                  error={errors.date}
                />
                <Field
                  label="Wedding Location"
                  name="location"
                  value={form.location}
                  onChange={handleFieldChange}
                  error={errors.location}
                />
              </div>
              <Field
                label="Service Required"
                name="service"
                value={form.service}
                onChange={handleFieldChange}
                error={errors.service}
                placeholder="Wedding Photography / Cinematography / Event Planning"
              />
              <Field
                label="Message"
                name="message"
                value={form.message}
                onChange={handleFieldChange}
                error={errors.message}
                textarea
                placeholder="Tell us about your wedding vision, function count, venue, and anything special you want us to know."
              />
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
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
}) {
  const cls =
    "w-full bg-transparent border-b border-ivory/30 focus:border-champagne outline-none py-3 text-ivory placeholder:text-ivory/40 transition-colors";
  return (
    <label className="block">
      <span className="text-[0.65rem] tracking-[0.3em] uppercase text-ivory/60">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          className={`${cls} ${error ? "border-terracotta" : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          name={name}
          type={type}
          className={`${cls} ${error ? "border-terracotta" : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={type === "date" ? "off" : name}
        />
      )}
      {error ? <span className="mt-2 block text-xs text-terracotta">{error}</span> : null}
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
            <span className="font-display text-3xl whitespace-nowrap">Nivesah Weddings</span>
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
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="size-11 rounded-full border border-ivory/20 flex items-center justify-center hover:bg-olive hover:border-olive transition-colors"
              >
                <Icon className="size-4" strokeWidth={1.4} />
              </a>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-sm border border-ivory/15 bg-ivory/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1890.5970662561638!2d73.819954!3d18.610336!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c75553a089db%3A0x3cdcb146f9aad2c5!2siFilms%20Media%20Productions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1782292811854!5m2!1sen!2sin"
              title="iFilms Media Productions location"
              className="h-44 w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
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
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_-12px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_24px_60px_-12px_rgba(37,211,102,0.72)]"
    >
      <span className="relative flex items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-white/35 animate-ping" />
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="relative size-[1.55rem] fill-current"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.14 1.6 5.94L0 24l6.36-1.67a11.9 11.9 0 0 0 5.7 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.47-8.4Zm-8.45 18.3h-.01a9.93 9.93 0 0 1-5.06-1.39l-.36-.21-3.77.99 1-3.68-.24-.38a9.9 9.9 0 0 1-1.52-5.28c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.13 1.03 7 2.91a9.84 9.84 0 0 1 2.9 7c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </span>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-ivory opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        WhatsApp Us
      </span>
    </a>
  );
}

export default function App() {
  const appRef = useRef<HTMLElement | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceTitle | "">("");
  useNumeralFont(appRef);

  return (
    <main ref={appRef} className="bg-ivory text-ink">
      <Hero />
      <About />
      <Services onSelectService={setSelectedService} selectedService={selectedService} />
      <Experience />
      <Trust />
      <Portfolio />
      <Testimonials />
      <ContactAndFaq selectedService={selectedService} onSelectService={setSelectedService} />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}

