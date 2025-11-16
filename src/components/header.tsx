"use client";

import { cn } from "@midday/ui/cn";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@midday/ui/context-menu";
import { Icons } from "@midday/ui/icons";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import menuAssistantLight from "public/menu-assistant-light.jpg";
import menuAssistantDark from "public/menu-assistant.jpg";
import menuEngineLight from "public/menu-engine-light.png";
import menuEngineDark from "public/menu-engine.png";
import splitLogoLight from "public/light_logo.png";
import splitFavicon from "public/favicon.svg";
import type { ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import {
  MdOutlineDashboardCustomize,
  MdOutlineDescription,
  MdOutlineIntegrationInstructions,
  MdOutlineMemory,
} from "react-icons/md";
import { DynamicImage } from "./dynamic-image";

type PreviewImage = {
  alt: string;
  darkSrc: StaticImageData;
  lightSrc: StaticImageData;
  href?: string;
};

type NavigationLink = {
  title: string;
  path?: string;
  description?: string;
  preview?: PreviewImage;
  children?: {
    path: string;
    title: string;
    icon: ReactNode;
  }[];
};

type ChildNavigationLink = NonNullable<NavigationLink["children"]>[number];

export function Header() {
  const pathname = usePathname();
  const [showBlur, setShowBlur] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const setPixelRatio = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      document.documentElement.style.setProperty(
        "--pixel-ratio",
        `${1 / pixelRatio}`,
      );
    };

    setPixelRatio();
    window.addEventListener("resize", setPixelRatio);

    return () => window.removeEventListener("resize", setPixelRatio);
  }, []);

  const handleOnClick = useCallback(() => {
    setShowBlur(false);
    setHidden(true);

    setTimeout(() => {
      setHidden(false);
    }, 100);
  }, []);

  const links: NavigationLink[] = useMemo(
    () => [
      {
        title: "Features",
        description:
          "Peek at the assistant, vault, and the rest of the Split toolkit.",
        preview: {
          alt: "Assistant",
          darkSrc: menuAssistantDark,
          lightSrc: menuAssistantLight,
          href: "/#assistant",
        },
        children: [
          {
            path: "/overview",
          title: "Overview",
          icon: <Icons.Overview size={20} />,
        },
        {
          path: "/inbox",
          title: "Inbox",
          icon: <Icons.Inbox2 size={20} />,
        },
        {
          path: "/vault",
          title: "Vault",
          icon: <Icons.Files size={20} />,
        },
        {
          path: "/tracker",
          title: "Tracker",
          icon: <Icons.Tracker size={20} />,
        },
        {
          path: "/invoice",
          title: "Invoice",
          icon: <Icons.Invoice size={20} />,
        },
      ],
    },
    {
      title: "Pricing",
      path: "/pricing",
      description: "Compare plans without losing your place on the page.",
    },
    {
      title: "Updates",
      path: "/updates",
      description: "Catch the latest improvements as we ship them.",
    },
    {
      title: "Story",
      path: "/story",
      description: "Learn how Split came to life and where we're headed.",
    },
    {
      title: "Download",
      path: "/download",
      description: "Install Split anywhere you work in just a tap.",
    },
    {
      title: "Developers",
      description: "Dive into docs, components, and the Split engine.",
      preview: {
        alt: "Engine",
        darkSrc: menuEngineDark,
        lightSrc: menuEngineLight,
        href: "/engine",
      },
      children: [
        {
          path: "https://git.new/midday",
          title: "Open Source",
          icon: <FaGithub size={19} />,
        },
        {
          path: "https://docs.midday.ai",
          title: "Documentation",
          icon: <MdOutlineDescription size={20} />,
        },
        {
          path: "/engine",
          title: "Engine",
          icon: <MdOutlineMemory size={20} />,
        },
        {
          title: "Join the community",
          path: "https://go.midday.ai/anPiuRx",
          icon: <FaDiscord size={19} />,
        },
        {
          title: "Apps & Integrations",
          path: "https://docs.midday.ai/integrations",
          icon: <MdOutlineIntegrationInstructions size={20} />,
        },
        {
          path: "/components",
          title: "Components",
          icon: <MdOutlineDashboardCustomize size={20} />,
        },
      ],
    },
    ],
    [handleOnClick],
  );

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <header className="sticky mt-4 top-4 z-50 px-2 md:px-4 md:flex justify-center">
      <nav className="flex items-center px-2 md:px-0 z-20 w-full md:w-auto relative">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Link
              href="/"
              className="flex items-center focus-visible:outline-none"
            >
              <span className="sr-only">Split Logo</span>
              <Image
                alt="Split logo"
                src={splitLogoLight}
                className="h-14 w-auto md:h-24"
                priority
              />
            </Link>
          </ContextMenuTrigger>

          <ContextMenuContent
            className="w-[200px] dark:bg-[#121212] bg-[#fff] rounded-none"
            alignOffset={20}
          >
            <div className="divide-y">
              <ContextMenuItem
                className="flex items-center space-x-2"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.8541 2.6983C15.4799 4.5758 15.4799 6.60604 14.8541 8.48354L14.3118 10.1067L16.3236 8.32414C17.5176 7.26526 18.3366 5.84768 18.6566 4.28424L19.2267 1.49751L20.9604 1.85239L20.3903 4.63913C19.9935 6.578 18.9784 8.33639 17.4977 9.64944L16.2154 10.7862L18.8497 10.2475C20.4134 9.92753 21.8319 9.1087 22.8908 7.91456L24.7781 5.7864L26.1022 6.96044L24.2149 9.0886C22.9018 10.5693 21.1435 11.5845 19.2046 11.9812L17.5244 12.3245L20.0761 13.175C21.5903 13.6797 23.2279 13.6797 24.742 13.175L27.4403 12.2756L28 13.9546L25.3017 14.8541C23.4241 15.4799 21.394 15.4799 19.5165 14.8541L17.8921 14.3118L19.6759 16.3236C20.7347 17.5176 22.1523 18.3355 23.7158 18.6554L26.5025 19.2267L26.1476 20.9604L23.3609 20.3903C21.4219 19.9935 19.6636 18.9784 18.3506 17.4977L17.2149 16.2166L17.7537 18.8497C18.0736 20.4131 18.8915 21.8308 20.0854 22.8896L22.2136 24.7769L21.0396 26.1011L18.9114 24.2138C17.4308 22.9008 16.4155 21.1434 16.0188 19.2046L15.6755 17.5268L14.8261 20.0761C14.3214 21.5902 14.3214 23.2279 14.8261 24.742L15.7256 27.4403L14.0454 28L13.1459 25.3017C12.5201 23.4242 12.5201 21.394 13.1459 19.5165L13.687 17.8898L11.6764 19.6747C10.4822 20.7336 9.6634 22.1522 9.34342 23.7158L8.77327 26.5025L7.03956 26.1464L7.60971 23.3609C8.00648 21.422 9.02157 19.6636 10.5023 18.3506L11.7834 17.2126L9.15027 17.7525C7.58674 18.0725 6.16925 18.8914 5.11037 20.0854L3.22307 22.2136L1.89894 21.0396L3.78624 18.9114C5.09924 17.4307 6.85659 16.4156 8.79538 16.0188L10.4744 15.6744L7.92387 14.825C6.40972 14.3203 4.77213 14.3203 3.25798 14.825L0.559674 15.7244L0 14.0454L2.6983 13.1459C4.57585 12.5201 6.606 12.5201 8.48354 13.1459L10.1067 13.687L8.32414 11.6764C7.26522 10.4823 5.8478 9.66337 4.28424 9.34342L1.49751 8.77327L1.85239 7.03956L4.63913 7.60971C6.57804 8.00648 8.33636 9.0216 9.64944 10.5023L10.7839 11.7822L10.2463 9.15027C9.9264 7.58686 9.10847 6.16923 7.91456 5.11037L5.7864 3.22307L6.96044 1.89777L9.0886 3.78507C10.5694 5.09812 11.5844 6.85651 11.9812 8.79538L12.3245 10.4744L13.175 7.92387C13.6797 6.40976 13.6797 4.77209 13.175 3.25798L12.2756 0.559674L13.9546 0L14.8541 2.6983ZM14 11.2342C12.4732 11.2344 11.2344 12.4732 11.2342 14L11.2493 14.2827C11.3911 15.6767 12.5687 16.7645 14 16.7646C15.4313 16.7645 16.6089 15.6767 16.7507 14.2827L16.7646 14L16.7507 13.7173C16.6185 12.4161 15.5838 11.3817 14.2827 11.2493L14 11.2342Z" fill="white"/>
</svg>
                    `,
                  );
                  } catch {}
                }}
              >
                <Image
                  alt="Split logo"
                  src={splitLogoLight}
                  className="h-6 w-auto"
                />
                <span className="font-medium text-sm">Copy Logo as SVG</span>
              </ContextMenuItem>
              <ContextMenuItem asChild>
                <Link href="/branding" className="flex items-center space-x-2">
                  <Icons.Change />
                  <span className="font-medium text-sm">Branding</span>
                </Link>
              </ContextMenuItem>
              <ContextMenuItem>
                <a
                  href="https://ui.midday.ai"
                  className="flex items-center space-x-2"
                >
                  <Icons.Palette />
                  <span className="font-medium text-sm">Design System</span>
                </a>
              </ContextMenuItem>
            </div>
          </ContextMenuContent>
        </ContextMenu>

        <div className="hidden md:flex items-center ml-6">
          <div className="flex items-center border border-border/80 backdrop-filter backdrop-blur-xl bg-[#FFFFFF]/70 dark:bg-[#121212]/70 rounded-full px-1 py-1 relative">
            <ul className="flex items-center gap-1 font-medium text-sm px-2">
              {links.map(({ path, title, children, preview }) => {
                const previewElement = preview ? (
                  <div className="flex-1 p-4">
                    {preview.href ? (
                      <Link
                        href={preview.href}
                        onClick={handleOnClick}
                        className="block overflow-hidden rounded-3xl border border-border/80"
                      >
                        <DynamicImage
                          alt={preview.alt}
                          darkSrc={preview.darkSrc}
                          lightSrc={preview.lightSrc}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                    ) : (
                      <div className="overflow-hidden rounded-3xl border border-border/80">
                        <DynamicImage
                          alt={preview.alt}
                          darkSrc={preview.darkSrc}
                          lightSrc={preview.lightSrc}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ) : null;

                if (path) {
                  return (
                    <li key={path}>
                      <Link
                        onClick={handleOnClick}
                        href={path}
                        className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-opacity duration-200 hover:opacity-70"
                      >
                        {title}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={title}
                    className="group"
                    onMouseEnter={() => setShowBlur(true)}
                    onMouseLeave={() => setShowBlur(false)}
                  >
                    <span className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-opacity duration-200 hover:opacity-70 cursor-pointer">
                      {title}
                    </span>

                    {children && (
                      <div
                        className={cn(
                          "absolute top-[44px] left-0 -mx-[calc(var(--pixel-ratio)_*_2px)] bg-[#fff] dark:bg-[#121212] flex h-0 group-hover:h-[250px] overflow-hidden transition-all duration-300 ease-in-out border-l border-r",
                          hidden && "hidden",
                        )}
                      >
                        <ul className="p-4 w-[200px] flex-0 space-y-4 mt-2">
                          {children.map((child) => {
                            return (
                              <li key={child.path}>
                                <Link
                                  onClick={handleOnClick}
                                  href={child.path}
                                  className="flex space-x-2 items-center transition-opacity hover:opacity-70 duration-200"
                                >
                                  <span>{child.icon}</span>
                                  <span className="text-sm font-medium">
                                    {child.title}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>

                        {previewElement}
                        <div className="absolute bottom-0 w-full border-b-[1px]" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <a
          className="hidden md:inline-flex items-center ml-6 text-sm font-medium text-secondary-foreground transition-opacity duration-200 hover:opacity-70"
          href="https://app.midday.ai"
        >
          Sign in
        </a>
      </nav>

      <div
        className={cn(
          "fixed w-screen h-screen backdrop-blur-md left-0 top-0 invisible opacity-0 transition-all duration-300 z-10",
          showBlur && "md:visible opacity-100",
        )}
      />
      <MobileNavigationCapsule links={links} />
    </header>
  );
}

function MobileNavigationCapsule({ links }: { links: NavigationLink[] }) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(() => {
    const matched = links.findIndex((link) =>
      link.path ? pathname.startsWith(link.path) : false,
    );

    return matched >= 0 ? matched : 0;
  });
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewTimeout = useRef<NodeJS.Timeout | null>(null);
  const previewActivatedRef = useRef(false);
  const orbitProgress = useMotionValue(0);

  const activeLink = links[activeIndex] ?? links[0];
  const activeChildren = activeLink?.children ?? [];
  const hasChildren = activeChildren.length > 0;

  useEffect(() => {
    const matchedIndex = links.findIndex((link) => {
      if (!link.path) {
        return false;
      }

      if (link.path === "/updates") {
        return pathname.includes("updates");
      }

      return pathname === link.path || pathname.startsWith(`${link.path}/`);
    });

    if (matchedIndex >= 0) {
      setActiveIndex(matchedIndex);
    }
  }, [links, pathname]);

  useEffect(() => {
    const controls = animate(orbitProgress, 1, {
      duration: 32,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => {
      controls.stop();
    };
  }, [orbitProgress]);

  const clearPreviewTimeout = useCallback(() => {
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
      previewTimeout.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearPreviewTimeout();
    };
  }, [clearPreviewTimeout]);

  const handlePointerDown = useCallback(
    (index: number) => {
      previewActivatedRef.current = false;
      clearPreviewTimeout();

      previewTimeout.current = setTimeout(() => {
        setPreviewIndex(index);
        previewActivatedRef.current = true;
      }, 420);
    },
    [clearPreviewTimeout],
  );

  const handlePointerCancel = useCallback(() => {
    previewActivatedRef.current = false;
    clearPreviewTimeout();
  }, [clearPreviewTimeout]);

  const handlePointerUp = useCallback(
    (index: number) => {
      if (previewActivatedRef.current) {
        clearPreviewTimeout();
        previewTimeout.current = setTimeout(() => {
          setPreviewIndex(null);
          previewActivatedRef.current = false;
        }, 1400);

        return;
      }

      clearPreviewTimeout();
      setPreviewIndex(null);
      setActiveIndex(index);
    },
    [clearPreviewTimeout],
  );

  useEffect(() => {
    setPreviewIndex(null);
    previewActivatedRef.current = false;
  }, [activeIndex]);

  const previewLink = previewIndex !== null ? links[previewIndex] : null;
  const previewAsset = previewLink?.preview ?? null;

  const childRingGroups = useMemo(() => {
    if (!hasChildren) {
      return [] as ChildNavigationLink[][];
    }

    if (activeChildren.length <= 4) {
      return [activeChildren] as ChildNavigationLink[][];
    }

    return [
      activeChildren.slice(0, 4),
      activeChildren.slice(4),
    ] as ChildNavigationLink[][];
  }, [activeChildren, hasChildren]);

  return (
    <div className="md:hidden">
      <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-3">
        <div className="relative w-full max-w-[420px]">
          <div className="pointer-events-none absolute inset-x-10 -top-12 h-32 rounded-full bg-gradient-to-t from-background/70 via-background/20 to-transparent" />

          <AnimatePresence>
            {previewLink && previewAsset && (
              <motion.div
                key={previewLink.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-none absolute bottom-[calc(100%+1.25rem)] left-1/2 w-[min(300px,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-3xl border border-border/60 bg-background/85 shadow-[0_20px_60px_rgba(10,10,15,0.2)] backdrop-blur-2xl"
              >
                <DynamicImage
                  alt={previewAsset.alt}
                  darkSrc={previewAsset.darkSrc}
                  lightSrc={previewAsset.lightSrc}
                  className="h-36 w-full object-cover"
                />
                <div className="space-y-2 p-4">
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    {previewLink.title}
                  </p>
                  {previewLink.description && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {previewLink.description}
                    </p>
                  )}
                  {previewAsset.href && (
                    <Link
                      href={previewAsset.href}
                      className="inline-flex items-center rounded-full border border-border/60 bg-background/90 px-3 py-1 text-[11px] font-medium text-foreground transition-opacity"
                    >
                      Open preview
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-auto relative flex flex-col items-center rounded-[999px] border border-border/60 bg-background/80 px-8 pt-6 pb-8 shadow-[0_30px_80px_rgba(12,12,20,0.35)] backdrop-blur-3xl">
            <div className="relative flex h-36 w-full items-center justify-center">
              <div className="pointer-events-none absolute inset-x-6 h-36 rounded-full border border-border/40 bg-gradient-to-br from-background/30 via-background/10 to-transparent" />

              {links.map((link, index) => (
                <OrbitDot
                  key={link.title}
                  link={link}
                  index={index}
                  total={links.length}
                  radius={70}
                  progress={orbitProgress}
                  isActive={index === activeIndex}
                  onPressStart={() => handlePointerDown(index)}
                  onPressEnd={() => handlePointerUp(index)}
                  onPressCancel={handlePointerCancel}
                />
              ))}

              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E6DC]/80 bg-[#D97757] shadow-[0_20px_50px_rgba(217,119,87,0.35)]">
                <Image
                  alt="Split logo"
                  src={splitFavicon}
                  className="h-10 w-auto"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeLink && (
                <motion.div
                  key={activeLink.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="mt-6 flex flex-col items-center gap-3 text-center"
                >
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    {activeLink.title}
                  </span>
                  {activeLink.description && (
                    <p className="max-w-[240px] text-xs leading-relaxed text-muted-foreground">
                      {activeLink.description}
                    </p>
                  )}
                  {activeLink.path && (
                    <Link
                      href={activeLink.path}
                      className="inline-flex items-center rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background shadow-sm transition-opacity hover:opacity-90"
                    >
                      Go to section
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {hasChildren && (
              <motion.div
                key={activeLink.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="pointer-events-auto mx-auto mt-10 flex h-48 w-48 items-center justify-center"
              >
                <div className="absolute h-10 w-10 rounded-full border border-border/50" />
                <div className="absolute h-24 w-24 rounded-full border border-border/40" />
                <div className="absolute h-36 w-36 rounded-full border border-border/30" />

                {childRingGroups.map((group, ringIndex) => (
                  <ChildRing
                    key={`${activeLink.title}-ring-${ringIndex}`}
                    links={group}
                    radius={ringIndex === 0 ? 90 : 138}
                    delayOffset={ringIndex * 0.12}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function OrbitDot({
  link,
  index,
  total,
  radius,
  progress,
  isActive,
  onPressStart,
  onPressEnd,
  onPressCancel,
}: {
  link: NavigationLink;
  index: number;
  total: number;
  radius: number;
  progress: MotionValue<number>;
  isActive: boolean;
  onPressStart: () => void;
  onPressEnd: () => void;
  onPressCancel: () => void;
}) {
  const angle = useMemo(
    () => (total === 0 ? 0 : (index / total) * Math.PI * 2),
    [index, total],
  );
  const x = useTransform(progress, (latest) =>
    Math.cos(angle + latest * Math.PI * 2) * radius,
  );
  const y = useTransform(progress, (latest) =>
    Math.sin(angle + latest * Math.PI * 2) * radius,
  );

  return (
    <motion.button
      layout
      type="button"
      style={{ x, y }}
      className={cn(
        "absolute top-1/2 left-1/2 flex h-11 -translate-x-1/2 -translate-y-1/2 items-center rounded-full border border-border/60 bg-background/85 text-xs font-medium text-foreground/80 shadow-[0_12px_32px_rgba(10,10,15,0.18)] backdrop-blur-2xl transition-colors duration-200",
        isActive ? "gap-2 px-4 pr-5 bg-foreground text-background" : "w-11 justify-center",
      )}
      onPointerDown={onPressStart}
      onPointerUp={onPressEnd}
      onPointerLeave={onPressCancel}
      onPointerCancel={onPressCancel}
      aria-label={link.title}
      aria-pressed={isActive}
    >
      <span
        aria-hidden
        className={cn(
          "block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-foreground/70 to-foreground/30 transition-colors",
          isActive && "bg-background",
        )}
      />
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.span
            key="label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden whitespace-nowrap text-[11px] font-medium tracking-wide"
          >
            {link.title}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ChildRing({
  links,
  radius,
  delayOffset = 0,
}: {
  links: ChildNavigationLink[];
  radius: number;
  delayOffset?: number;
}) {
  const total = links.length || 1;

  return (
    <>
      {links.map((child, index) => {
        const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={child.path}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              delay: delayOffset + index * 0.06,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <Link
              href={child.path}
              aria-label={child.title}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-[0_14px_30px_rgba(10,10,15,0.18)] backdrop-blur-xl transition-opacity hover:opacity-80"
            >
              <span className="text-lg">{child.icon}</span>
            </Link>
            <span className="text-[11px] font-medium text-muted-foreground">
              {child.title}
            </span>
          </motion.div>
        );
      })}
    </>
  );
}
