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
import insta1 from "@/assets/instagram/insta-1.jpg";
import insta2 from "@/assets/instagram/insta-2.jpg";
import insta3 from "@/assets/instagram/insta-3.jpg";
import insta4 from "@/assets/instagram/insta-4.jpg";
import insta5 from "@/assets/instagram/insta-5.jpg";
import insta6 from "@/assets/instagram/insta-6.jpg";
import insta7 from "@/assets/instagram/insta-7.jpg";
import insta8 from "@/assets/instagram/insta-8.jpg";
import insta9 from "@/assets/instagram/insta-9.jpg";
import insta10 from "@/assets/instagram/insta-10.jpg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
const WHATSAPP = "918446752571";
const PHONE_DISPLAY = "84467 52571";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@nivesahweddings3728";
const YOUTUBE_CHANNEL_ID = "UCyQPjkbkF8GfzyXDfR8hnwg";
const YOUTUBE_UPLOADS_PLAYLIST_ID = `UU${YOUTUBE_CHANNEL_ID.slice(2)}`;
const WA_MSG = encodeURIComponent(
  "Hello Nivesah Weddings,\n\nI would like to enquire about wedding services.\n\nName:\nWedding Date:\nLocation:\nService Required:\n\nPlease share package details.",
);
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${WA_MSG}`;
const INSTAGRAM_URL = "https://www.instagram.com/nivesahweddings/";
const SOCIALS = [
  { icon: Instagram, href: INSTAGRAM_URL, label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/nivesahweddings/", label: "Facebook" },
  { icon: Youtube, href: YOUTUBE_CHANNEL_URL, label: "YouTube" },
] as const;

const INSTAGRAM_SHOWCASE = [
  {
    shortcode: "DZ7hpg1CIvP",
    href: "https://www.instagram.com/p/DZ7hpg1CIvP/",
    image: insta1,
    label: "Feature Post",
    title: "Two hearts. One promise. Endless memories.",
    caption:
      "Capturing the beautiful moments of a Sakharpuda filled with love, laughter, and the excitement of forever.",
    meta: "382 likes",
  },
  {
    shortcode: "DZ4utliIDnh",
    href: "https://www.instagram.com/p/DZ4utliIDnh/",
    image: insta2,
    label: "Booking Update",
    title: "Forever starts with a single date.",
    caption:
      "Wedding slots are filling fast. Secure yours and let the story be captured beautifully from the beginning.",
    meta: "16 likes",
  },
  {
    shortcode: "DZZ5juRI66E",
    href: "https://www.instagram.com/reel/DZZ5juRI66E/",
    image: insta3,
    label: "Instagram Reel",
    title: "And the story continues. Let's begin yours.",
    caption:
      "A cinematic reel built around movement, emotion, and the beginning of a new wedding story.",
    meta: "350 likes",
  },
  {
    shortcode: "DY6gZL7iKsK",
    href: "https://www.instagram.com/p/DY6gZL7iKsK/",
    image: insta4,
    label: "Intimate Story",
    title: "In the simplest moments, we found the beginning.",
    caption:
      "A quiet yes, a lifetime ahead, and an intimate celebration captured with a documentary softness.",
    meta: "19 likes",
  },
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
    badge: "Est. 2017 Â· Mumbai",
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

const YOUTUBE_FEATURED_VIDEOS = [
  {
    id: "0_MNBs54zlI",
    title: "Samarpan X Esha | Cinematic Engagement Highlight",
    note: "A polished engagement highlight with cinematic rhythm and warm celebration frames.",
    label: "Feature Film",
    location: "Engagement Story",
  },
  {
    id: "WaXRJXUzXr4",
    title: "Samarpan & Esha | Engagement Teaser",
    note: "A teaser cut designed for emotion, energy, and a more intimate editorial pace.",
    label: "Editorial Cut",
    location: "Teaser Edit",
  },
  {
    id: "IOQxk5LSNi8",
    title: "Anoop & Liza | Cinematic Wedding Highlight Film",
    note: "A wedding highlight film built around movement, ceremony details, and atmosphere.",
    label: "Signature Reel",
    location: "Wedding Highlight",
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

function useCountUp(active: boolean, target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (target <= 0) {
      setValue(target);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;

    const tick = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, duration, target]);

  return value;
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
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
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
            Weddings Â· iFilms
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
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`group relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 lg:hidden ${
            scrolled
              ? "border-olive/20 bg-ivory/80 text-ink backdrop-blur-md"
              : "border-white/20 bg-black/10 text-ivory backdrop-blur-md"
          } ${open ? "rotate-180 scale-105" : "rotate-0 scale-100"}`}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative h-4 w-4">
            <span
              className={`absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current transition-all duration-500 ${
                open ? "rotate-0" : "rotate-90"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current transition-all duration-500 ${
                open ? "rotate-0" : "rotate-0"
              }`}
            />
          </span>
        </button>
      </div>
      <div
        className={`fixed inset-0 z-40 bg-ink/30 backdrop-blur-[2px] transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div
          className={`absolute right-0 top-0 flex h-[100svh] w-[min(88vw,360px)] flex-col overflow-hidden border-l border-white/40 bg-[linear-gradient(180deg,rgba(248,242,233,0.98),rgba(240,231,218,0.96))] shadow-[-24px_0_60px_-28px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(205,181,135,0.22),transparent_42%)]" />
          <div className="relative flex items-center justify-between border-b border-olive/12 px-5 py-5">
            <div>
              <p className="eyebrow text-olive">Navigation</p>
              <p className="mt-2 font-display text-2xl text-ink">Explore</p>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-olive/20 bg-white/40 text-ink transition-colors hover:bg-olive hover:text-ivory"
            >
              <Minus className="size-4" />
            </button>
          </div>

          <div className="relative flex-1 px-5 py-4">
            {links.map(([l, h], index) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className={`group flex items-center justify-between border-b border-olive/12 py-4 text-ink transition-all duration-500 last:border-b-0 ${
                  open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${index * 80 + 90}ms` : "0ms" }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-numerals text-xs text-olive/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm tracking-[0.28em] uppercase text-ink/80 transition-colors duration-300 group-hover:text-olive">
                    {l}
                  </span>
                </div>
                <ArrowUpRight className="size-3.5 text-olive/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>

          <div className="relative border-t border-olive/12 px-5 py-5">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-olive"
            >
              Book Now <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden grain bg-ink">
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

      <div className="relative z-10 flex min-h-[100svh] items-end sm:items-center">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 pt-28 pb-14 sm:px-6 sm:pb-24 lg:grid-cols-12 lg:px-10 lg:pt-32 lg:pb-20">
          <div className="text-ivory animate-reveal lg:col-span-8">
            <div className="mb-6 hidden items-center gap-4 sm:flex sm:mb-8">
              <span className="hairline bg-champagne" />
              <span className="eyebrow text-champagne">Nivesah Weddings</span>
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.35rem,10vw,7.5rem)] leading-[0.95] tracking-tight">
              Your Wedding,
              <br />
              <span className="italic text-champagne">Told</span> Like Cinema
            </h1>
            <p className="mt-5 max-w-[34ch] text-[0.92rem] text-ivory/85 leading-relaxed font-light sm:mt-8 sm:max-w-xl sm:text-base lg:text-lg">
              We turn your wedding into timeless memories, captured with warmth, beauty, and a
              cinematic eye wherever your celebration takes place across India.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <a
                href="#contact"
                className="btn-primary w-full sm:w-auto bg-champagne text-ink border-champagne hover:bg-transparent hover:text-champagne"
              >
                Book Your Story
              </a>
              <a href="#portfolio" className="btn-ghost w-full sm:w-auto">
                View Films
              </a>
            <a
              href={`tel:${WHATSAPP}`}
              className="hidden flex-wrap items-center gap-3 text-sm text-ivory/90 transition-colors sm:flex sm:pl-2 hover:text-champagne"
            >
              <Phone className="size-4" />
              <span className="tracking-[0.3em] sm:tracking-[0.38em]">{PHONE_DISPLAY}</span>
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
    <section className="relative bg-[oklch(0.975_0.012_82)] py-10 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="hairline" />
              <span className="eyebrow">Featured Stories</span>
            </div>
            <h2 className="max-w-3xl font-display text-3xl leading-[1.05] md:text-5xl lg:text-6xl">
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
              <article className="relative overflow-hidden bg-[#f4ecdf] p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] sm:p-4 md:p-6">
                <div className="relative min-h-[430px] sm:min-h-[520px] md:min-h-[640px]">
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
                      className="h-[430px] w-full object-cover sm:h-[520px] md:h-[640px]"
                      loading="lazy"
                    />

                    <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-4 md:hidden">
                      <div className="bg-ivory/88 px-3 py-2 text-[0.62rem] tracking-[0.28em] uppercase text-olive shadow-sm backdrop-blur-sm">
                        {slide.badge}
                      </div>
                    </div>

                    <div className="absolute inset-x-3 bottom-3 bg-ivory/88 p-4 backdrop-blur-sm md:left-8 md:bottom-8 md:max-w-sm">
                      <p className="eyebrow">{slide.kicker}</p>
                      <p className="mt-2 font-display text-2xl leading-[1.02] text-ink md:text-3xl">
                        {slide.title}
                      </p>
                    </div>
                  </div>

                  <div className="relative mx-auto -mt-20 hidden w-[46%] min-w-[140px] max-w-[220px] sm:block sm:-mt-28 sm:w-[38%] sm:min-w-[170px] sm:max-w-[250px] md:absolute md:right-0 md:bottom-0 md:mt-0 md:w-[42%] md:max-w-[320px]">
                    <img
                      src={slide.secondary}
                      alt={slide.altSecondary}
                      className="h-[180px] w-full border-[8px] border-ivory object-cover shadow-2xl sm:h-[220px] sm:border-[10px] md:h-[300px]"
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
  const slides = [
    {
      primary: about1,
      secondary: about2,
      altPrimary: "Bride getting ready",
      altSecondary: "Couple at sunset",
    },
    {
      primary: p4,
      secondary: p2,
      altPrimary: "Bride and groom embracing outdoors",
      altSecondary: "Bride smiling during celebration",
    },
    {
      primary: p1,
      secondary: p6,
      altPrimary: "Couple portrait in formal wedding attire",
      altSecondary: "Wedding couple in a candid moment",
    },
  ] as const;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="about" ref={ref} className="relative bg-ivory py-10 lg:py-16">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-6 relative" data-reveal>
          <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[560px]">
            {slides.map((slide, index) => (
              <img
                key={slide.primary}
                src={slide.primary}
                alt={slide.altPrimary}
                className={`absolute inset-0 h-full w-full object-cover shadow-2xl transition-opacity duration-[1400ms] ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            ))}
          </div>
          <div className="hidden md:block absolute -bottom-12 -right-6 h-[340px] w-[260px]">
            {slides.map((slide, index) => (
              <img
                key={slide.secondary}
                src={slide.secondary}
                alt={slide.altSecondary}
                className={`absolute inset-0 h-full w-full border-8 border-ivory object-cover shadow-2xl transition-opacity duration-[1400ms] ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline" />
            <span className="eyebrow">About the Studio</span>
          </div>
          <h2 className="font-display text-3xl leading-[1.05] md:text-5xl lg:text-6xl">
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
              covered by us â€” so you can be sure your celebration is captured to perfection and
              runs smoothly.
            </p>
          </div>

          <figure className="mt-10 max-w-lg border-l-2 border-olive pl-5 sm:mt-12 sm:pl-6">
            <blockquote className="font-display text-xl leading-snug text-ink italic md:text-3xl">
              "Every celebration has a soul. We preserve it beautifully."
            </blockquote>
            <figcaption className="mt-3 eyebrow">â€” The Nivesah Atelier</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function InstagramShowcase() {
  const ref = useReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = INSTAGRAM_SHOWCASE[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % INSTAGRAM_SHOWCASE.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="stories"
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f0e6_0%,#f2eadf_52%,#f7f0e6_100%)] py-10 lg:py-16"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(129,116,70,0.12),_transparent_70%)]" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div
          className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="hairline" />
              <span className="eyebrow">Instagram Journal</span>
            </div>
            <h2 className="max-w-3xl font-display text-3xl leading-[1.05] md:text-5xl lg:text-6xl">
              Real moments, pulled from <em className="text-olive">@nivesahweddings</em>.
            </h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_minmax(220px,0.52fr)] lg:gap-6" data-reveal>
          <article className="overflow-hidden border border-border/70 bg-white/60 shadow-[0_28px_80px_-50px_rgba(0,0,0,0.32)] backdrop-blur-sm">
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.75fr)]">
              <a
                href={activeStory.href}
                target="_blank"
                rel="noreferrer"
                className="relative block min-h-[360px] overflow-hidden sm:min-h-[440px] lg:min-h-[560px]"
              >
                {INSTAGRAM_SHOWCASE.map((story, index) => (
                  <img
                    key={story.shortcode}
                    src={story.image}
                    alt={story.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${
                      activeIndex === index ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    }`}
                    loading="lazy"
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[0.62rem] uppercase tracking-[0.34em] text-white backdrop-blur-sm sm:left-6 sm:top-6">
                  @nivesahweddings
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-6 lg:p-8">
                  <p className="eyebrow text-champagne">{activeStory.label}</p>
                  <h3 className="mt-3 max-w-[12ch] font-display text-3xl leading-[0.98] sm:text-4xl lg:text-5xl">
                    {activeStory.title}
                  </h3>
                </div>
              </a>

              <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8">
                <div>
                  <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-olive/75">
                    <Instagram className="size-4" /> Live Instagram Post
                  </div>
                  <p className="mt-6 max-w-md font-display text-2xl leading-[1.08] text-ink sm:text-3xl lg:text-[2.2rem]">
                    {activeStory.title}
                  </p>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/70 sm:text-[0.98rem]">
                    {activeStory.caption}
                  </p>
                  <a
                    href={activeStory.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.28em] text-olive transition-all hover:gap-3"
                  >
                    View Original Post <ArrowUpRight className="size-4" />
                  </a>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 border-t border-border/70 pt-5 text-[0.68rem] uppercase tracking-[0.28em] text-foreground/55 sm:max-w-md">
                  <div>
                    <p className="text-foreground/45">Post Type</p>
                    <p className="mt-2 text-olive">{activeStory.meta}</p>
                  </div>
                  <div>
                    <p className="text-foreground/45">Source</p>
                    <p className="mt-2 text-olive">Instagram</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1 lg:gap-4">
            {INSTAGRAM_SHOWCASE.map((story, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={story.shortcode}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group overflow-hidden border bg-white/55 text-left transition-all duration-500 ${
                    isActive
                      ? "border-olive shadow-[0_20px_60px_-36px_rgba(0,0,0,0.42)] lg:-translate-x-2"
                      : "border-border/70 hover:border-olive/45"
                  }`}
                >
                  <div className="flex gap-3 p-2.5 sm:p-3">
                    <div className="h-20 w-16 shrink-0 overflow-hidden sm:h-24 sm:w-20">
                      <img
                        src={story.image}
                        alt={story.label}
                        className={`h-full w-full object-cover transition-transform duration-700 ${
                          isActive ? "scale-105" : "group-hover:scale-105"
                        }`}
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 py-1">
                      <p className="text-[0.62rem] uppercase tracking-[0.28em] text-olive/70">0{index + 1}</p>
                      <p className="mt-2 font-display text-lg leading-tight text-ink">{story.label}</p>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/60 sm:text-[0.82rem]">
                        {story.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Camera,
    title: "Wedding Photography",
    desc: "Editorial portraits and candid frames.",
    image: insta1,
  },
  {
    icon: Film,
    title: "Cinematography",
    desc: "Feature-style films with cinematic grading.",
    image: insta3,
  },
  {
    icon: Heart,
    title: "Pre-Wedding Shoots",
    desc: "Intimate love stories across beautiful locations.",
    image: insta4,
  },
  {
    icon: Aperture,
    title: "Candid Photography",
    desc: "Honest emotion between planned moments.",
    image: insta2,
  },
  {
    icon: Sparkles,
    title: "Wedding Films",
    desc: "Trailers, reels and ceremonial films.",
    image: insta5,
  },
  {
    icon: BookOpen,
    title: "Luxury Albums",
    desc: "Hand-bound archival heirloom albums.",
    image: insta6,
  },
  {
    icon: Scissors,
    title: "Professional Editing",
    desc: "Color, sound and story refinement.",
    image: insta10,
  },
  {
    icon: CalendarCheck,
    title: "Event Planning",
    desc: "Coordinated execution for a seamless day.",
    image: insta8,
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
      className="relative overflow-hidden bg-[oklch(0.97_0.012_80)] py-10 lg:py-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src={about2}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.12] scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,242,233,0.9),rgba(247,242,233,0.95))]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="relative mb-8 md:mb-10" data-reveal>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline" />
              <span className="eyebrow">Our Services</span>
            </div>
            <h2 className="max-w-2xl font-display text-3xl leading-[1.05] md:text-5xl lg:text-6xl">
              Crafted with <em className="text-olive">intention.</em>
              <br />
              Delivered with poise.
            </h2>
          </div>
        </div>

        <div
          className="relative mb-8 flex flex-col items-start gap-3 border border-olive/15 bg-ivory/70 px-4 py-4 text-sm text-foreground/75 backdrop-blur-sm sm:mb-10 sm:flex-row sm:items-center sm:gap-4 sm:px-6"
          data-reveal
        >
          <div className="flex items-center gap-3 text-olive">
            <MapPin className="size-4" />
            <span className="eyebrow text-olive">Pan India Coverage</span>
          </div>
          <p className="font-light leading-relaxed">
            Available across India for photography, films, albums, and planning.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {SERVICES.map(({ icon: Icon, title, desc, image }, i) => (
            <button
              key={title}
              type="button"
              onClick={() => onSelectService(title)}
              aria-pressed={selectedService === title}
              className={`group relative isolate min-h-[248px] overflow-hidden border border-white/35 bg-ivory/82 p-6 text-left backdrop-blur-[2px] transition-all duration-500 active:bg-ivory/70 [touch-action:manipulation] sm:min-h-[290px] sm:p-8 lg:min-h-[340px] lg:p-10 md:hover:bg-ivory/70 ${
                selectedService === title ? "ring-1 ring-olive/40" : ""
              }`}
            >
              <div className="absolute inset-0 -z-20 overflow-hidden">
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full scale-110 object-cover opacity-0 transition-all duration-700 md:group-hover:scale-100 md:group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(248,242,233,0.96),rgba(244,237,226,0.94))] transition-all duration-700 md:group-hover:bg-[linear-gradient(180deg,rgba(248,242,233,0.22),rgba(244,237,226,0.12))]" />
              <div className="absolute inset-0 -z-10 bg-olive/0 transition-colors duration-700 md:group-hover:bg-olive/5" />
              <span className="absolute right-5 top-5 text-[0.62rem] tracking-[0.28em] text-olive/70 transition-all duration-500 md:group-hover:translate-y-2 md:group-hover:opacity-0 sm:right-6 sm:top-6 sm:text-[0.65rem]">
                / {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative mb-7 flex size-12 items-center justify-center rounded-full border border-olive/40 transition-all duration-500 md:group-hover:translate-y-3 md:group-hover:opacity-0 sm:mb-8 sm:size-14">
                <Icon
                  className="size-4 text-olive transition-colors md:group-hover:text-ivory sm:size-5"
                  strokeWidth={1.4}
                />
              </div>
              <h3 className="relative pr-10 font-display text-[1.85rem] leading-[1.1] transition-all duration-500 md:group-hover:translate-y-4 md:group-hover:opacity-0 sm:pr-12 sm:text-2xl">
                {title}
              </h3>
              <p className="relative mt-3 max-w-[22rem] text-sm leading-relaxed text-foreground/70 transition-all duration-500 font-light md:group-hover:translate-y-4 md:group-hover:opacity-0">
                {desc}
              </p>
              <span className="relative mt-6 block h-px w-full bg-olive/35 transition-all duration-700 md:w-0 md:bg-olive md:group-hover:w-full md:group-hover:opacity-0" />
              <span className="relative mt-5 inline-flex text-[0.62rem] uppercase tracking-[0.3em] text-olive/80 sm:hidden">
                Tap to enquire
              </span>
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
    <section id="experience" ref={ref} className="relative bg-ink py-10 text-ivory grain lg:py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10" data-reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="hairline bg-champagne" />
            <span className="eyebrow text-champagne">The Signature Experience</span>
            <span className="hairline bg-champagne" />
          </div>
          <h2 className="font-display text-3xl leading-[1.05] md:text-5xl lg:text-6xl">
            Five chapters. <em className="text-champagne">One</em> unforgettable story.
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-5 md:gap-4" data-reveal>
          <svg
            className="hidden md:block absolute top-12 left-[3%] right-[3%] h-12 text-champagne/40"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
          >
            <path
              d="M0 22 C 120 2, 220 2, 320 16 S 520 34, 640 18 S 840 2, 1000 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
          </svg>
          {STAGES.map(([n, t, d]) => (
            <div key={n} className="relative text-center md:text-left">
              <div className="flex items-center justify-center gap-4 md:block">
                <span className="font-display text-4xl text-champagne sm:text-5xl md:text-6xl">{n}</span>
              </div>
              <div className="mt-2 md:mt-6">
                <h3 className="font-display text-xl sm:text-2xl">{t}</h3>
                <p className="mt-2 max-w-[22ch] mx-auto text-sm text-ivory/65 leading-relaxed md:mx-0 md:max-w-[18ch]">
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
  {
    target: 100,
    label: "Weddings Captured",
    format: (value: number) => `${value}+`,
  },
  {
    target: 8,
    label: "Years Creative Experience",
    format: (value: number) => `${value}+`,
  },
  {
    target: 4,
    label: "Cinematic Delivery",
    format: (value: number) => `${value}K`,
  },
  {
    target: 1,
    label: "Personalised Storytelling",
    format: (value: number) => `${value}:1`,
  },
] as const;

function TrustStat({
  active,
  target,
  label,
  format,
}: {
  active: boolean;
  target: number;
  label: string;
  format: (value: number) => string;
}) {
  const value = useCountUp(active, target);

  return (
    <>
      <div
        className="text-4xl text-olive leading-none sm:text-5xl md:text-6xl"
        style={{ fontFamily: '"Prata", serif' }}
      >
        {format(value)}
      </div>
      <p className="mt-3 max-w-[16ch] text-[0.65rem] tracking-[0.28em] uppercase text-foreground/60 sm:mt-4 sm:text-[0.72rem] sm:tracking-[0.34em]">
        {label}
      </p>
    </>
  );
}

function Trust() {
  const ref = useReveal();
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="-mt-2 w-full border-y border-border bg-[linear-gradient(180deg,#f8f2e9_0%,#f4ede2_100%)] py-8 lg:-mt-4 lg:py-10"
    >
      <div className="w-full px-0">
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 border-y border-border/80"
          data-reveal
        >
          {TRUST.map(({ target, label, format }, index) => (
            <div
              key={label}
              className={`flex min-h-[150px] flex-col items-center justify-center px-4 py-8 text-center sm:min-h-[180px] sm:px-8 sm:py-10 ${
                index % 2 === 0 ? "border-r border-border/80 lg:border-r" : "lg:border-r border-border/80"
              } ${index === TRUST.length - 1 ? "border-r-0" : ""} ${
                index === 1 ? "border-r-0 lg:border-r" : ""
              }`}
            >
              <TrustStat active={isCounting} target={target} label={label} format={format} />
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
    h: "sm:row-span-2",
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
    h: "sm:row-span-2",
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
    <section id="portfolio" ref={ref} className="bg-ivory py-10 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div
          className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-6"
          data-reveal
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline" />
              <span className="eyebrow">Selected Stories</span>
            </div>
            <h2 className="max-w-2xl font-display text-3xl leading-[1.05] md:text-5xl lg:text-6xl">
              A portfolio of <em className="text-olive">love,</em> light and legacy.
            </h2>
          </div>
        </div>

        <div
          className="grid auto-rows-[240px] gap-4 sm:grid-cols-2 sm:auto-rows-[280px] lg:grid-cols-3 lg:gap-6"
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
              <div className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-6 lg:p-8">
                <p className="eyebrow text-champagne flex items-center gap-2">
                  <MapPin className="size-3" /> {p.loc}
                </p>
                <h3 className="mt-2 font-display text-xl sm:text-2xl lg:text-3xl">{p.couple}</h3>
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
          <DialogContent className="max-h-[90svh] max-w-[calc(100vw-1.5rem)] overflow-auto border-none bg-[oklch(0.965_0.012_78)] p-0 sm:max-w-6xl sm:overflow-hidden">
            <DialogTitle className="sr-only">{activeStory.couple} gallery</DialogTitle>
            <div className="grid lg:grid-cols-[minmax(0,1.6fr)_360px]">
              <div className="bg-ink">
                <img
                  src={activeImage ?? activeStory.gallery[0]}
                  alt={activeStory.couple}
                  className="h-[42svh] w-full object-cover sm:h-[55vh] lg:h-[80vh]"
                />
              </div>
              <div className="p-5 sm:p-6 lg:p-8">
                <p className="eyebrow flex items-center gap-2">
                  <MapPin className="size-3" /> {activeStory.loc}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-none text-ink sm:text-4xl">
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

function YouTubeFeedSection() {
  const ref = useReveal();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const activeVideo = YOUTUBE_FEATURED_VIDEOS[activeVideoIndex];

  useEffect(() => {
    setIsVideoPlaying(false);
  }, [activeVideoIndex]);

  return (
    <section
      id="youtube"
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#14110d_0%,#1a1611_40%,#f3ebdd_40%,#f3ebdd_100%)] py-12 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(211,186,139,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(112,125,76,0.08),transparent_28%)]" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div
          className="relative mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-6"
          data-reveal
        >
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="hairline bg-champagne" />
              <span className="eyebrow text-champagne">Film Room</span>
            </div>
            <h2 className="max-w-3xl font-display text-3xl leading-[1.02] text-ivory md:text-5xl lg:text-6xl">
              A curated <em className="text-champagne">screening room</em> for our wedding films.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/70 sm:text-base">
              Explore signature edits, destination highlights, and cinematic cuts from the Nivesah
              Weddings channel.
            </p>
          </div>
        </div>

        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_420px]" data-reveal>
          <div className="overflow-hidden border border-white/10 bg-[#181410] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
            <div className="border-b border-white/10 px-5 py-4 text-ivory sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-champagne/75">
                    {activeVideo.label}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
                    {activeVideo.title}
                  </h3>
                </div>
                <span className="hidden text-[0.7rem] uppercase tracking-[0.28em] text-ivory/45 sm:block">
                  {activeVideo.location}
                </span>
              </div>
            </div>
            <div className="aspect-video">
              {isVideoPlaying ? (
                <iframe
                  key={activeVideo.id + activeVideoIndex}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(true)}
                  className="group relative h-full w-full overflow-hidden text-left"
                  aria-label={`Play ${activeVideo.title}`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${activeVideo.id}/maxresdefault.jpg`}
                    alt={activeVideo.title}
                    className="h-full w-full object-cover object-top transition-transform duration-[1400ms] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.45))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-[0.62rem] uppercase tracking-[0.28em] backdrop-blur-sm">
                      <Youtube className="size-3.5" />
                      Play Film
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d91921] text-white shadow-[0_18px_40px_-18px_rgba(217,25,33,0.8)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_24px_56px_-20px_rgba(217,25,33,0.9)]">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-8 w-8 fill-current">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {YOUTUBE_FEATURED_VIDEOS.map((video, index) => {
              const isActive = index === activeVideoIndex;
              return (
                <button
                  key={`${video.id}-${index}`}
                  type="button"
                  onClick={() => setActiveVideoIndex(index)}
                  className={`group relative overflow-hidden border p-0 text-left transition-all duration-500 ${
                    isActive
                      ? "border-olive bg-[linear-gradient(180deg,rgba(248,242,233,1),rgba(242,233,220,0.96))] shadow-[0_26px_70px_-42px_rgba(0,0,0,0.45)]"
                      : "border-border bg-ivory/95 hover:-translate-y-1 hover:border-olive/40"
                  }`}
                >
                  <div className="grid min-h-[168px] grid-cols-[92px_1fr] sm:min-h-[190px]">
                    <div className="relative overflow-hidden">
                      <img
                        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-transparent" />
                      <div className="absolute left-3 top-3 font-numerals text-2xl text-ivory/85">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between p-4 sm:p-5">
                      <div>
                        <p className="text-[0.64rem] uppercase tracking-[0.3em] text-olive/75">
                          {video.label}
                        </p>
                        <h3 className="mt-3 font-display text-xl leading-[1.08] text-ink transition-colors group-hover:text-olive">
                          {video.title}
                        </h3>
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-[0.22em] text-foreground/50">
                          {video.location}
                        </p>
                        <span
                          className={`inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.26em] transition-all ${
                            isActive ? "text-olive" : "text-foreground/55 group-hover:text-olive"
                          }`}
                        >
                          Play Cut <ArrowUpRight className="size-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
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
      "They captured the soul of our days â€” the laughter, the tears, the tiny in-between glances. Pure magic.",
  },
];

function Testimonials() {
  const ref = useReveal();
  return (
    <section id="testimonials" ref={ref} className="bg-[oklch(0.97_0.012_80)] py-10 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10" data-reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="hairline" />
            <span className="eyebrow">Love Letters</span>
            <span className="hairline" />
          </div>
          <h2 className="font-display text-3xl leading-[1.05] md:text-5xl lg:text-6xl">
            Words from our <em className="text-olive">couples.</em>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:gap-8" data-reveal>
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="relative border border-border bg-ivory p-6 sm:p-8 lg:p-10">
              <div className="flex gap-1 text-champagne mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="font-display text-lg italic leading-snug text-ink sm:text-xl lg:text-2xl">
                "{t.quote}"
              </p>
              <div className="mt-8 border-t border-border pt-6 text-left">
                <p className="font-display text-lg leading-none">{t.name}</p>
                <p className="mt-1 text-[0.7rem] tracking-[0.25em] uppercase text-foreground/55">
                  {t.loc}
                </p>
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
    a: "Absolutely â€” within India and abroad. Travel and accommodation are quoted transparently in your bespoke package.",
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
    a: "Yes â€” hand-bound archival albums and full cinematic films with highlight trailers and ceremonial cuts.",
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
    <section id="contact" ref={ref} className="bg-ivory py-10 lg:py-16">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <div className="lg:col-span-6" data-reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="hairline" />
            <span className="eyebrow">Frequently Asked</span>
          </div>
          <h2 className="mb-8 font-display text-3xl leading-[1.05] md:mb-10 md:text-5xl">
            Everything you'd like to <em className="text-olive">know.</em>
          </h2>
          <div className="border-t border-border">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6"
                  >
                      <span className="font-display text-lg leading-snug transition-colors group-hover:text-olive sm:text-xl md:text-2xl">
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
                    <p className="pb-5 pr-4 text-foreground/70 font-light leading-relaxed sm:pb-6 sm:pr-12">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal>
          <div id="contact-form-panel" className="relative bg-ink p-6 text-ivory grain sm:p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline bg-champagne" />
              <span className="eyebrow text-champagne">Begin Your Story</span>
            </div>
            <h3 className="mb-6 font-display text-2xl leading-[1.05] sm:text-3xl md:mb-8 md:text-4xl">
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
              <div className="grid gap-5 md:grid-cols-2">
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
    "w-full bg-transparent border-b border-ivory/30 focus:border-champagne outline-none py-3 text-sm text-ivory placeholder:text-ivory/40 focus:placeholder:text-transparent transition-colors";
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
    <footer className="bg-ink pt-16 pb-10 text-ivory grain sm:pt-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-6 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-5">
          <div className="flex flex-col gap-4">
            <img
              src={nivesahLogo}
              alt="Nivesah Weddings by iFilms Media"
              className="h-16 w-[220px] rounded-sm bg-white p-2 object-contain object-left sm:h-20 sm:w-[280px]"
            />
            <span className="font-display text-2xl sm:text-3xl">Nivesah Weddings</span>
          </div>
          <p className="mt-6 max-w-sm text-ivory/60 font-light leading-relaxed">
            A boutique atelier preserving wedding stories with dedication, precision and a personal
            approach.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <a
              href={`tel:${WHATSAPP}`}
              className="inline-flex items-center gap-3 font-display text-xl text-champagne transition-colors hover:text-ivory sm:text-2xl"
            >
              <Phone className="size-5" />
              <span className="tracking-[0.28em] sm:tracking-[0.36em]">{PHONE_DISPLAY}</span>
            </a>
            <a
              href="mailto:connect@nivesahweddings.in"
              className="text-xs tracking-[0.12em] text-ivory/70 transition-colors hover:text-champagne sm:text-sm"
            >
              connect@nivesahweddings.in
            </a>
          </div>
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
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col gap-3 border-t border-ivory/10 px-5 pt-6 sm:px-6 md:mt-14 md:flex-row md:items-center md:justify-between lg:px-10">
        <p className="font-sans text-[0.7rem] font-medium leading-none uppercase tracking-[0.3em] text-ivory/38">
          © {new Date().getFullYear()} iFilms Media Productions Pvt. Ltd. All rights reserved.
        </p>
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
      className="fixed bottom-4 right-4 z-50 group flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_-12px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_24px_60px_-12px_rgba(37,211,102,0.72)] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
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
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-ivory opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        WhatsApp Us
      </span>
    </a>
  );
}

function HeroBanner() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[oklch(0.975_0.008_82)] px-4 pt-5 pb-0 sm:px-6 lg:px-8"
    >
      <Nav />
      <div className="mx-auto max-w-[1540px]">
        <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#f4f0ea_0%,#efe9df_100%)] px-5 pb-8 pt-28 shadow-[0_35px_90px_-40px_rgba(0,0,0,0.22)] sm:px-8 lg:px-12 lg:pt-30">
          <div className="absolute inset-[14px] rounded-[18px] bg-white/62 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65)]" />
          <div className="absolute inset-x-[14px] top-[92px] bottom-[14px] overflow-hidden rounded-[14px] sm:top-[104px] lg:top-[116px]">
            <img
              src={about2}
              alt="Wedding couple at sunset"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,240,0.08),rgba(37,22,12,0.18)_55%,rgba(48,28,16,0.42)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),transparent_46%)]" />
          </div>
          <div className="relative z-10 hidden items-center justify-between px-8 pb-8 pt-1 text-[#7f6450] lg:flex">
            <img
              src={nivesahLogo}
              alt="Nivesah Weddings by iFilms Media"
              className="h-12 w-[165px] rounded-xl bg-white/88 p-1 object-contain object-left shadow-[0_14px_30px_-20px_rgba(0,0,0,0.22)]"
            />
            <nav className="flex items-center gap-12 text-[0.72rem] uppercase tracking-[0.28em]">
              {NAV_LINKS.map(([label, href]) => (
                <a key={href} href={href} className="transition-colors hover:text-[#a28062]">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="relative z-10 mx-auto flex min-h-[76svh] max-w-[1120px] flex-col items-center justify-end pb-24 text-center text-ivory sm:min-h-[82svh] lg:min-h-[78svh] lg:pb-28">
            <div className="mb-6 hidden items-center gap-4 sm:flex">
              <span className="hairline bg-ivory/60" />
              <span className="eyebrow text-ivory/90">Nivesah Weddings</span>
              <span className="hairline bg-ivory/60" />
            </div>
            <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.3rem,6vw,5.45rem)] leading-[0.94] tracking-[-0.02em]">
              Your Wedding,
              <br />
              <span className="italic text-champagne">Told</span> Like Cinema
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed font-light text-ivory/88 sm:mt-6 sm:text-base lg:max-w-3xl lg:text-lg">
              We help you turn your special day into unforgettable memories to be treasured for a
              lifetime. Every wedding has its own unique narrative, and Nivesah Weddings ensures
              it is captured in the most delightful manner, wherever your celebration takes place
              across India.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5">
              <a
                href="#contact"
                className="btn-primary w-full sm:w-auto bg-white text-ink border-white hover:bg-transparent hover:text-white"
              >
                Book Your Story
              </a>
              <a
                href="#portfolio"
                className="btn-ghost w-full sm:w-auto border-white/75 text-white hover:bg-white hover:text-ink"
              >
                View Films
              </a>
              <a
                href={`tel:${WHATSAPP}`}
                className="hidden flex-wrap items-center justify-center gap-3 text-sm text-ivory/95 transition-colors sm:flex hover:text-champagne"
              >
                <Phone className="size-4" />
                <span className="tracking-[0.3em] sm:tracking-[0.38em]">{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-[14px] bottom-[14px] z-10 h-[110px] overflow-hidden sm:h-[140px] lg:h-[200px]">
            <div className="absolute inset-x-[-18%] bottom-[-78px] h-[190px] rounded-[50%] bg-[oklch(0.975_0.008_82)] sm:bottom-[-98px] sm:h-[230px] lg:bottom-[-122px] lg:h-[290px]" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center lg:bottom-12">
            <div className="rounded-full bg-white/78 px-5 py-3 text-[0.62rem] uppercase tracking-[0.34em] text-olive shadow-[0_20px_40px_-25px_rgba(0,0,0,0.22)] backdrop-blur-sm">
              Since 2017
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <InstagramShowcase />
      <Services onSelectService={setSelectedService} selectedService={selectedService} />
      <Experience />
      <Trust />
      <Portfolio />
      <YouTubeFeedSection />
      <Testimonials />
      <ContactAndFaq selectedService={selectedService} onSelectService={setSelectedService} />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}



