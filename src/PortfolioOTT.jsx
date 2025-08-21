import al from 'src\images\al.webp';
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  Sun,
  Moon,
  ArrowRight,
  ExternalLink,
  Star,
  MapPin,
  Rocket,
  Trophy,
  Code2,
  BookOpen,
  Send,
  Menu,
  X,
  Compass,
  Keyboard,
  Search,
} from "lucide-react";

/**
 * OVER-THE-TOP ONE-FILE PORTFOLIO — FIXED + SUPERCHARGED (Aug 19, 2025)
 * Minor upgrades only (no rewrite). This version also fixes a syntax error in
 * the DATA.projects array and cleans up a duplicate block in DATA.experience.
 *
 * Notes:
 * - React + TailwindCSS
 * - Framer Motion micro-interactions
 * - Canvas particle galaxy background (no extra deps)
 * - Sticky navbar w/ scroll spy + SMOOTH SCROLL + mobile menu
 * - System-aware dark mode (persistent) + keyboard shortcut (T)
 * - Command Palette (⌘/Ctrl+K or "/")
 * - Reading progress bar
 * - Self-tests: press **Ctrl/⌘ + Shift + T** to toggle a tiny in-app test panel
 */

// ====== YOUR DATA HERE ======
const DATA = {
  name: "Hassan Houjazy",
  tagline: "Engineer, Researcher, Builder.",
  roles: [
    "Full‑Stack Developer",
    "Three.js Enthusiast",
    "Chess Enthusiast",
    "IT & SysAdmin",
  ],
  location: "Boston, MA",
  about:
    "I design delightful, performance‑obsessed experiences and ship ambitious projects end‑to‑end. I love crisp UI, clean APIs, and solving real problems with craft.",
  email: "hassan.houjazy@gmail.com",
  phone: "+1 (617) 208‑9892",
  resumeUrl: "https://drive.google.com/file/d/1_fJyOMuqQVkqFzuo1lNOrxbxS8zA7lmg/view?usp=sharing", // swap with your resume link
  socials: {
    github: "https://github.com/Hassansprojects",
    linkedin: "https://www.linkedin.com/in/hassan-houjazy/",
  },
  // ✅ FIXED: Projects array was malformed due to a stray trailing comma/extra block.
  projects: [
    {
      title: "Mona Livery – Interactive 3D Landing",
      blurb:
        "A premium booking site with a star‑field hero, smooth page transitions, and instant quote widget.",
      tags: ["Three.js", "Next.js", "Tailwind", "Stripe"],
      link: "#",
      image: al,
    },
    {
      title: "System Administration Automation Toolkit",
      blurb:
        "Automates user provisioning, backups, patching, and compliance audits across Windows & Linux.",
      tags: ["Bash", "Python", "Ansible", "Windows", "Linux"],
      link: "#",
      image:
        "data:image/svg+xml;utf8,\
        <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'><rect width='100%' height='100%' fill='%23101512'/><g fill='%23a3e635' font-family='monospace' font-size='52'><text x='50' y='120'>SysAdmin</text><text x='50' y='190'>Automation Toolkit</text></g></svg>",
    },
    {
      title: "IT Automation Toolkit",
      blurb:
        "Built a PowerShell toolkit for backup, provisioning, permissions, and audits.",
      tags: ["Java", "Algorithms", "Trie", "REST"],
      link: "#",
      image:
        "data:image/svg+xml;utf8,\
        <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'><rect width='100%' height='100%' fill='%23120b1a'/><g fill='%23f59e0b' font-family='monospace' font-size='52'><text x='50' y='120'>Java</text><text x='50' y='190'>Autocomplete Engine</text></g></svg>",
    },
    {
      title: "CloudTrail Explorer- Cloud Monitoring & Visualization Tool",
      blurb:
        "Consolidated and oversaw logs from various AWS accounts using AWS CloudWatch, improving cloud activity tracking efficiency and halving tracking time",
      tags: ["React", "Flask", "Django", "SQL", "Security"],
      link: "#",
      image:
        "data:image/svg+xml;utf8,\
        <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'><rect width='100%' height='100%' fill='%230b1a12'/><g fill='%2360a5fa' font-family='monospace' font-size='48'><text x='50' y='120'>Full‑Stack CRUD</text><text x='50' y='190'>React · Flask/Django · SQL</text></g></svg>",
    },
  ],
  // ✅ FIXED: Experience contained a duplicate/stray block. Consolidated to Arax only.
  experience: [
    {
      role: "POS & E-Commerce Integration Specialist (Contract)",
      org: "Arax",
      period: "Jan'25 – March '25",
      points: [
        "Streamlined transactions by implementing an innovative point-of-sales system.",
        "Launched an integrated e-commerce platform with a robust online payment API",
        "Worked closely with one colleague to drive system innovation and enhance performance",
      ],
    },
    {
      role: "Contracted Website Build",
      org: "Mona's Airport Livery",
      period: "Jun'25 – Jul'25",
      points: [
        "Designed a fast, mobile-first site with clear “Book Now”, accessible UI, and SEO best practices to drive bookings",
        "Implemented secure, scalable hosting with HTTPS, automated backups, and uptime/performance monitoring",
        "Built a streamlined booking request flow (pickup/dropoff & flight details) with automated email notifications",
      ],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "R",
    "SQL",
    "Tailwind",
    "Three.js",
    "Framer Motion",
    "Docker",
    "Git",
    "Linux",
    "AWS CloudTrail",
  ],
  testimonials: [
    {
      quote:
        "Hassan moves fast without breaking quality. His attention to detail made our product feel handcrafted.",
      name: "Alex",
      title: "Owner",
    },
    {
      quote:
        "From UX to automation, he connected everything end‑to‑end. Huge impact.",
      name: "Hamad",
      title: "Co-worker",
    },
  ],
  stats: [
    { label: "Production Deploys", value: 48 },
    { label: "Projects Shipped", value: 22 },
    { label: "Issues Closed", value: 100 },
    { label: "Cups of Coffee", value: 999 },
  ],
};

// ====== UTILITIES ======
function getSystemTheme() {
  if (typeof window === "undefined") return "dark";
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function useTheme() {
  // Apply early to avoid FOUC
  useLayoutEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initial = saved || getSystemTheme();
    const root = document.documentElement;
    if (initial === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);

  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || getSystemTheme() : "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Keyboard shortcut: press "t" to toggle theme
  useEffect(() => {
    function onKey(e) {
      if (e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setTheme((t) => (t === "dark" ? "light" : "dark"));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { theme, setTheme };
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.55 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

// Smooth scroll helper that accounts for sticky nav height
function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 88; // ~navbar height + padding
  window.scrollTo({ top: y, behavior: "smooth" });
}

// Fancy mouse parallax for cards
function useParallax() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);
  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx);
    y.set(dy);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }
  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

// Canvas galaxy background
function GalaxyBG() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    let particles = [];

    function resize() {
      w = (canvas.width = window.innerWidth);
      h = (canvas.height = Math.max(window.innerHeight, document.body.scrollHeight));
    }

    function init() {
      particles = new Array(220).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const alpha = 0.6 * p.z;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 + p.z * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163, 230, 53, ${alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const o = (1 - dist / 120) * 0.14;
            ctx.strokeStyle = `rgba(163, 230, 53, ${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    }

    resize();
    init();
    step();
    window.addEventListener("resize", () => {
      resize();
      init();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[200vh] w-screen opacity-60 dark:opacity-70"
    />
  );
}

// Typewriter effect
function Typewriter({ words, speed = 80, pause = 1400 }) {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [dir, setDir] = useState(1);
  useEffect(() => {
    const t = setInterval(() => {
      setSub((s) => {
        const target = words[i];
        if (dir > 0 && s >= target.length) {
          setDir(-1);
          clearInterval(t);
          setTimeout(() => setSub((s) => s), pause);
          return s;
        }
        if (dir < 0 && s <= 0) {
          setDir(1);
          setI((i) => (i + 1) % words.length);
          return 0;
        }
        return s + dir;
      });
    }, speed);
    return () => clearInterval(t);
  }, [i, dir, speed, pause, words]);
  const text = words[i].slice(0, sub);
  return (
    <span className="tabular-nums text-lime-300">
      {text}
      <span className="animate-pulse">▌</span>
    </span>
  );
}

// Command Palette
function CommandPalette({ open, setOpen, onGo }) {
  const options = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "testimonials", label: "Love" },
    { id: "contact", label: "Contact" },
  ];
  const [q, setQ] = useState("");
  const filtered = options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    function onKey(e) {
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-start bg-black/40 p-4 pt-24"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-white/80 shadow-2xl backdrop-blur dark:bg-black/60"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 opacity-60" />
              <input
                autoFocus
                placeholder="Search sections… (/, ⌘/Ctrl+K)"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:opacity-60"
              />
            </div>
            <div className="max-h-72 overflow-auto p-2">
              {filtered.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setOpen(false);
                    onGo(o.id);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <Compass className="h-4 w-4 opacity-60" /> {o.label}
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-sm opacity-70">No matches.</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Navbar (minor fixes: correct palette trigger, aria-current, Escape closes drawer)
function Navbar({ active, onToggleTheme, theme, onGo, onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "testimonials", label: "Love" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    function onHashLoad() {
      const id = (window.location.hash || "#home").replace("#", "");
      setTimeout(() => smoothScrollToId(id), 0);
    }
    onHashLoad();
  }, []);

  // shadow on scroll
  const [shadow, setShadow] = useState(false);
  useEffect(() => {
    function onScroll() {
      setShadow(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer with Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(id) {
    setOpen(false);
    onGo(id);
  }

  return (
    <div
      className={`sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/20 ${
        shadow ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button onClick={() => go("home")} className="flex items-center gap-2 font-semibold">
          <Rocket className="h-5 w-5 text-lime-400" />
          <span>Hassan.dev</span>
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              aria-current={active === l.id ? "page" : undefined}
              className={`rounded-full px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10 ${
                active === l.id ? "bg-black/10 dark:bg-white/10" : ""
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={onToggleTheme}
            className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Toggle theme (T)"
            title="Toggle theme (T)"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={onOpenPalette}
            className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Open command palette (⌘/Ctrl+K)"
            title="Command palette (⌘/Ctrl+K)"
          >
            <Keyboard className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-white/10 bg-white/40 p-2 dark:bg-black/30"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                {links.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => go(l.id)}
                    className={`rounded-full px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10 ${
                      active === l.id ? "bg-black/10 dark:bg-white/10" : ""
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={onToggleTheme}
                  className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <button
                  onClick={onOpenPalette}
                  className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <Keyboard className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Project Card
function ProjectCard({ p }) {
  const { rotateX, rotateY, onMouseLeave, onMouseMove } = useParallax();
  return (
    <motion.a
      href={p.link}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/60 p-0 shadow-xl backdrop-blur transition hover:shadow-2xl dark:bg-black/40"
      style={{ perspective: 1000 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -4 }}
    >
      <motion.div style={{ rotateX, rotateY }}>
        <div className="aspect-video w-full overflow-hidden">
          <img
            loading="lazy"
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <ExternalLink className="h-4 w-4 opacity-60" />
          </div>
          <p className="text-sm opacity-80">{p.blurb}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-lime-300/40 bg-lime-300/15 px-2 py-0.5 text-xs text-lime-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-lime-400/10 to-transparent" />
      </div>
    </motion.a>
  );
}

// Counter (KPI)
function Counter({ value, label, delay = 0 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let start;
    const dur = 1200;
    function tick(t) {
      if (!start) start = t;
      const p = Math.min(1, (t - start - delay) / dur);
      if (p >= 0) setV(Math.round(p * value));
      if (p < 1) requestAnimationFrame(tick);
    }
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [value, delay]);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/40 p-5 text-center dark:bg-black/30">
      <div className="text-3xl font-bold tabular-nums text-lime-300">{v}</div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
}

// Timeline item
function TimelineItem({ item, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.05 }}
      className="relative pl-8"
    >
      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-lime-300 bg-lime-300/30" />
      <div className="rounded-xl border border-white/10 bg-white/40 p-4 dark:bg-black/30">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="font-semibold">
            {item.role} · <span className="opacity-80">{item.org}</span>
          </div>
          <div className="text-sm opacity-70">{item.period}</div>
        </div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm opacity-90">
          {item.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Testimonials carousel
function Testimonials({ items }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 4200);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${i * 100}%)` }}>
          {items.map((t, idx) => (
            <div key={idx} className="min-w-full">
              <div className="rounded-2xl border border-white/10 bg-white/40 p-6 text-center dark:bg-black/30">
                <p className="mx-auto max-w-3xl text-lg italic opacity-90">“{t.quote}”</p>
                <div className="mt-3 text-sm opacity-75">— {t.name}, {t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`h-2 w-2 rounded-full ${i === idx ? "bg-lime-300" : "bg-white/30"}`}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </div>
  );
}

// Skills cloud
function SkillsCloud({ skills }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {skills.map((s) => (
        <span
          key={s}
          className="rounded-full border border-white/10 bg-white/30 px-3 py-1 text-sm shadow-sm dark:bg-black/30"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

// Contact form (mailto)
function ContactForm({ email, phone }) {
  const [form, setForm] = useState({ name: "", from: "", message: "" });
  function submit(e) {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.from}>`);
    window.location.href = `mailto:${email}?subject=Portfolio%20Inquiry&body=${body}`;
  }
  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-xl space-y-3">
      <input
        required
        placeholder="Your name"
        className="w-full rounded-xl border border-white/10 bg-white/40 px-4 py-2 outline-none placeholder:opacity-60 focus:ring-2 focus:ring-lime-300 dark:bg-black/30"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        required
        type="email"
        placeholder="you@email.com"
        className="w-full rounded-xl border border-white/10 bg-white/40 px-4 py-2 outline-none placeholder:opacity-60 focus:ring-2 focus:ring-lime-300 dark:bg-black/30"
        value={form.from}
        onChange={(e) => setForm({ ...form, from: e.target.value })}
      />
      <textarea
        required
        rows={5}
        placeholder="Tell me about your project..."
        className="w-full rounded-xl border border-white/10 bg-white/40 px-4 py-2 outline-none placeholder:opacity-60 focus:ring-2 focus:ring-lime-300 dark:bg-black/30"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <div className="flex items-center justify-between">
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/30 px-4 py-2 text-sm dark:bg-black/30"
        >
          <Phone className="h-4 w-4" /> Call me
        </a>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-2 font-semibold text-black shadow hover:brightness-95"
        >
          <Send className="h-4 w-4" /> Send
        </button>
      </div>
    </form>
  );
}

// Section wrapper
function Section({ id, eyebrow, title, icon: Icon, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-24">
      <div className="mb-8 flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-lime-300" />}
        <span className="text-xs uppercase tracking-widest text-lime-300/90">{eyebrow}</span>
      </div>
      <h2 className="mb-8 text-3xl font-bold md:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

// Reading progress bar
function ProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setP(scrolled);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-1 bg-transparent">
      <div className="h-full bg-lime-400/80" style={{ width: `${p}%` }} />
    </div>
  );
}

// ====== SELF-TESTS (basic runtime checks) ======
function runSelfTests() {
  const tests = [];
  // Projects
  tests.push({
    name: "projects: has 4 items",
    pass: Array.isArray(DATA.projects) && DATA.projects.length === 4,
  });
  tests.push({
    name: "projects: each has title/link/image/tags",
    pass: DATA.projects.every(
      (p) => p && p.title && p.link !== undefined && p.image && Array.isArray(p.tags)
    ),
  });
  // Experience
  tests.push({
    name: "experience: all at Arax",
    pass: Array.isArray(DATA.experience) && DATA.experience.every((e) => e.org === "Arax"),
  });
  // Sections exist
  const sectionIds = ["home", "projects", "experience", "skills", "testimonials", "contact"];
  tests.push({
    name: "sections: all anchors present",
    pass: sectionIds.every((id) => document.getElementById(id)),
  });
  return tests;
}

function DevTestPanel() {
  const [visible, setVisible] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setVisible((v) => !v);
        setResults(runSelfTests());
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 z-[70] w-80 rounded-xl border border-white/10 bg-black/70 p-3 text-sm text-white shadow-xl">
      <div className="mb-2 font-semibold">Self‑Tests</div>
      <ul className="space-y-1">
        {results.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-3">
            <span className="opacity-80">{r.name}</span>
            <span className={`rounded px-2 py-0.5 text-xs ${r.pass ? "bg-green-600" : "bg-red-600"}`}>
              {r.pass ? "PASS" : "FAIL"}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 opacity-70">Toggle with Ctrl/⌘+Shift+T</div>
    </div>
  );
}

// Main App
export default function PortfolioOTT() {
  const { theme, setTheme } = useTheme();
  const sections = ["home", "projects", "experience", "skills", "testimonials", "contact"];
  const active = useScrollSpy(sections);
  const [paletteOpen, setPaletteOpen] = useState(false);

  function go(id) {
    if (!id) return;
    history.replaceState(null, "", `#${id}`);
    smoothScrollToId(id);
  }

  // Respond to back/forward hash navigation too
  useEffect(() => {
    function onHashChange() {
      const id = (window.location.hash || "#home").replace("#", "");
      smoothScrollToId(id);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Reduce motion preference: disable smooth behavior
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      // fall back to instant scroll for accessibility
      const _orig = window.scrollTo;
      window.scrollTo = (opts) =>
        _orig(typeof opts === "object" ? { ...opts, behavior: "auto" } : opts);
    }
  }, []);

  return (
    <div className="scroll-smooth text-slate-900 antialiased dark:bg-[#0b0f14] dark:text-slate-100">
      <ProgressBar />
      <GalaxyBG />
      <Navbar
        active={active}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onGo={go}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      {/* HERO */}
      <section
        id="home"
        className="relative mx-auto grid max-w-6xl scroll-mt-24 grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-28"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/30 px-3 py-1 text-xs dark:bg-black/30">
            <MapPin className="h-3.5 w-3.5" /> {DATA.location}
          </div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            {DATA.name}
            <br />
            <span className="opacity-90">{DATA.tagline}</span>
          </h1>
          <p className="max-w-xl opacity-90">{DATA.about}</p>
          <div className="text-lg">
            <Typewriter words={DATA.roles} />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={DATA.resumeUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-2 font-semibold text-black shadow hover:brightness-95"
            >
              <Download className="h-4 w-4" /> Download Résumé
            </a>
            <a
              href={DATA.socials.github}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/30 px-4 py-2 dark:bg-black/30"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={DATA.socials.linkedin}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/30 px-4 py-2 dark:bg-black/30"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={`mailto:${DATA.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/30 px-4 py-2 dark:bg-black/30"
            >
              <Mail className="h-4 w-4" /> Contact
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-lime-400/20 to-transparent p-2 shadow-2xl">
            <div className="absolute inset-0 -z-10 animate-pulse blur-3xl" />
            <div className="grid h-full w-full place-items-center rounded-2xl bg-black/20 dark:bg-black/40">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 130, damping: 14 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="rounded-full border border-lime-400/30 bg-black/40 p-5">
                  <Rocket className="h-10 w-10 text-lime-300" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Let’s build something legendary.</div>
                  <div className="opacity-70">Pixel‑perfect UI • Smooth as butter • Serious speed</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {DATA.stats.map((s, i) => (
            <Counter key={s.label} value={s.value} label={s.label} delay={i * 120} />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="Featured Work" title="Projects that go brrrr 🚀" icon={Code2}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DATA.projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="Track Record" title="Experience" icon={Trophy}>
        <div className="relative space-y-6 border-l border-white/10 pl-2">
          {DATA.experience.map((e, i) => (
            <TimelineItem key={i} i={i} item={e} />
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="Toolkit" title="Skills & Tech I love" icon={BookOpen}>
        <SkillsCloud skills={DATA.skills} />
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials" eyebrow="Nice things people say" title="Testimonials" icon={Star}>
        <Testimonials items={DATA.testimonials} />
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Let’s collaborate" title="Get in touch" icon={Mail}>
        <ContactForm email={DATA.email} phone={DATA.phone} />
      </Section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-2xl border border-white/10 bg-white/30 p-6 text-sm dark:bg-black/30">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <div className="opacity-80">© {new Date().getFullYear()} {DATA.name}. Built with ♥ and a sprinkle of chaos.</div>
            <div className="flex items-center gap-3">
              <a
                href={DATA.socials.github}
                className="rounded-full border border-white/10 bg-white/20 p-2 hover:bg-white/30 dark:bg-black/30"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={DATA.socials.linkedin}
                className="rounded-full border border-white/10 bg-white/20 p-2 hover:bg-white/30 dark:bg-black/30"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${DATA.email}`}
                className="rounded-full border border-white/10 bg-white/20 p-2 hover:bg-white/30 dark:bg-black/30"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button
        onClick={() => smoothScrollToId("home")}
        className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-lime-400 px-4 py-2 font-semibold text-black shadow-xl transition hover:brightness-95"
      >
        <ArrowRight className="h-4 w-4 -rotate-90" /> Top
      </button>

      {/* Command Palette (real instance) */}
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} onGo={go} />

      {/* Dev test panel toggle: Ctrl/⌘+Shift+T */}
      <DevTestPanel />
    </div>
  );
}
