// src/app/students/store/merch/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NotifyMeButton from "../../components/NotifyMeButton";

type MerchItem = {
  key: string;
  name: string;
  tag: string;
  blurb: string;
  priceLabel: string;
  images: { src: string; alt: string }[];
  stripePriceId?: string; // if present, enables Stripe checkout
  interestOnly?: boolean; // e.g. future items
};

// All image paths live under: public/assets/lounge/store/merch/...
const MERCH_ITEMS: MerchItem[] = [
  {
    key: "art-hoodie",
    name: "808 Art Hoodie",
    tag: "Hoodie • Made to Order",
    blurb:
      "Heavyweight hoodie with full-color artwork and 808 Academy lockup. Built for late-night sessions.",
    priceLabel: "$89",
    stripePriceId: "price_1Sd28kDgVrA91WNOFJj4TFB2", // STRIPE_PRICE_ART_HOODIE
    images: [
      {
        src: "/assets/lounge/store/merch/art-hoodie-prod.jpg",
        alt: "808 Academy art hoodie front and back",
      },
      {
        src: "/assets/lounge/store/merch/art-hoodie-mod.jpg",
        alt: "808 art hoodie on a model",
      },
    ],
  },
  {
    key: "black-logo-hoodie",
    name: "808 Logo Hoodie (Black)",
    tag: "Hoodie • Made to Order",
    blurb:
      "Clean black hoodie with neon 808 chest logo. Simple, loud, and studio-ready.",
    priceLabel: "$79",
    stripePriceId: "price_1Sd2Z4DgVrA91WNOo5zGLwdC", // STRIPE_PRICE_BLACK_LOGO_HOODIE
    images: [
      {
        src: "/assets/lounge/store/merch/black-hoodie-prod.jpg",
        alt: "Black 808 logo hoodie front and back",
      },
      {
        src: "/assets/lounge/store/merch/black-hoodie-mod.jpg",
        alt: "Black 808 hoodie on a model",
      },
    ],
  },
  {
    key: "art-tee",
    name: "808 Art Tee",
    tag: "T-Shirt",
    blurb:
      "Soft tee with the 808 artwork front hit. Designed to look good on stage or in the room.",
    priceLabel: "$39",
    stripePriceId: "price_1Sd2AaDgVrA91WNO0pelyMKN", // STRIPE_PRICE_ART_TEE
    images: [
      {
        src: "/assets/lounge/store/merch/art-t-prod.jpg",
        alt: "808 art tee flat lay",
      },
      {
        src: "/assets/lounge/store/merch/art-t-mod.jpg",
        alt: "808 art tee on a model",
      },
    ],
  },
  {
    key: "white-logo-tee",
    name: "808 Logo Tee (White)",
    tag: "T-Shirt",
    blurb:
      "White tee with the 808 Academy logo. Clean, minimal, and easy to layer.",
    priceLabel: "$39",
    stripePriceId: "price_1Sd2IADgVrA91WNOhq2XT7ux", // STRIPE_PRICE_WHITE_LOGO_TEE
    images: [
      {
        src: "/assets/lounge/store/merch/white-t-prod.jpg",
        alt: "White 808 logo t-shirt flat lay",
      },
      {
        src: "/assets/lounge/store/merch/white-t-mod.jpg",
        alt: "White 808 logo t-shirt on a model",
      },
    ],
  },
  {
    key: "black-logo-tee",
    name: "808 Logo Tee (Black)",
    tag: "T-Shirt",
    blurb:
      "Black tee with the cyan 808 Academy logo. Everyday uniform for producers.",
    priceLabel: "$39",
    stripePriceId: "price_1Sd2R9DgVrA91WNOYvxUX1UF", // STRIPE_PRICE_BLACK-LOGO-TEE
    images: [
      {
        src: "/assets/lounge/store/merch/black-t-prod.jpg",
        alt: "Black 808 logo t-shirt flat lay",
      },
      {
        src: "/assets/lounge/store/merch/black-t-mod.jpg",
        alt: "Black 808 logo t-shirt on a model",
      },
    ],
  },
  {
    key: "dad-cap",
    name: "808 Dad Cap",
    tag: "Cap",
    blurb:
      "Curved-brim dad hat with embroidered 808 mark. Low-key flex for studio days and errands.",
    priceLabel: "$39",
    stripePriceId: "price_1Sd2T2DgVrA91WNOOUqAJ7eZ", // STRIPE_PRICE_DAD_CAP
    images: [
      {
        src: "/assets/lounge/store/merch/cap-prod.jpg",
        alt: "808 Academy dad cap product shot",
      },
      {
        src: "/assets/lounge/store/merch/cap-mod.jpg",
        alt: "808 Academy dad cap close-up",
      },
    ],
  },
  {
    key: "sticker-pack",
    name: "808 Sticker Pack",
    tag: "Stickers",
    blurb:
      "Die-cut 808 Academy stickers for laptops, road cases, controllers, and more.",
    priceLabel: "$12",
    stripePriceId: "price_1Sd2VMDgVrA91WNOkJWZFgh1", // STRIPE_PRICE_STICKER_PK
    images: [
      {
        src: "/assets/lounge/store/merch/sticker-prod.jpg",
        alt: "808 Academy sticker pack",
      },
    ],
  },
  {
    key: "session-notebook",
    name: "808 Session Notebook",
    tag: "Studio Tool • Interest",
    blurb:
      "Hardcover notebook for take-after-take notes, lyrics, mix recalls, and session ideas.",
    priceLabel: "$24 (TBD)",
    interestOnly: true,
    images: [
      {
        src: "/assets/lounge/store/merch/art-t-prod.jpg", // placeholder until you shoot it
        alt: "Placeholder image for 808 Session Notebook",
      },
    ],
  },
];

// ---------- Stripe checkout helper ----------

async function startCheckout(priceId: string) {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, quantity: 1, mode: "payment", source: "merch" }),
    });

    if (!res.ok) {
      console.error("Checkout error:", res.status);
      alert("Could not start checkout. Please try again.");
      return;
    }

    const json = await res.json();
    if (json?.url) {
      window.location.href = json.url;
    } else {
      alert("Checkout session missing URL. Please try again.");
    }
  } catch (err) {
    console.error("Checkout exception", err);
    alert("Something went wrong starting checkout.");
  }
}

// ---------- Card component with mini slider ----------

function MerchCard({ item }: { item: MerchItem }) {
  const [imageIndex, setImageIndex] = useState(0);
  const hasMultipleImages = item.images.length > 1;

  const currentImage = item.images[imageIndex];

  const goPrev = () => {
    if (!hasMultipleImages) return;
    setImageIndex((i) => (i - 1 + item.images.length) % item.images.length);
  };

  const goNext = () => {
    if (!hasMultipleImages) return;
    setImageIndex((i) => (i + 1) % item.images.length);
  };

  const handleBuyClick = () => {
    if (!item.stripePriceId) return;
    void startCheckout(item.stripePriceId);
  };

  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-[#00FFF7]/70 hover:bg-white/10">
      {/* Image slider */}
      <div className="relative mb-4 h-64 w-full overflow-hidden rounded-2xl bg-black/40">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />

        {hasMultipleImages && (
          <div className="pointer-events-auto absolute bottom-3 left-0 right-0 flex items-center justify-between px-4">
            {/* slider dots */}
            <div className="flex items-center gap-1">
              {item.images.map((img, idx) => (
                <button
                  key={img.src}
                  onClick={() => setImageIndex(idx)}
                  className={`h-1.5 w-4 rounded-full transition ${
                    idx === imageIndex ? "bg-[#00FFF7]" : "bg-white/30"
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                />
              ))}
            </div>

            {/* prev/next */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white/70 hover:bg-black/90 hover:text-[#00FFF7]"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white/70 hover:bg-black/90 hover:text-[#00FFF7]"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Text + actions */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/60">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00FFF7]" />
            <span>{item.tag}</span>
          </div>

          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="mt-2 text-sm text-white/75">{item.blurb}</p>

          <p className="mt-3 text-sm font-semibold text-[#00FFF7]">
            {item.priceLabel}{" "}
            {!item.interestOnly && (
              <span className="text-xs text-white/60">+ tax &amp; shipping</span>
            )}
          </p>
          <p className="mt-1 text-[11px] text-white/50">
            Final pricing and sizing will be confirmed before we open full runs.
            Early access goes to students on this list.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {!item.interestOnly && item.stripePriceId && (
              <button
                type="button"
                onClick={handleBuyClick}
                className="rounded-lg bg-[#00FFF7] px-4 py-2 text-xs font-semibold text-black transition hover:scale-105"
              >
                Pre-order with Stripe
              </button>
            )}

            <NotifyMeButton kind="merch" item={item.name} />
          </div>

          <span className="text-[11px] text-white/50">
            Expected lead time ~2–3 weeks after order.
          </span>
        </div>
      </div>
    </article>
  );
}

export default function MerchStorePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* HERO */}
      <header className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFF7]">
              Student Merch
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              808 Academy Apparel
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              Hoodies, tees, caps, and stickers for enrolled students. Initial
              runs are made-to-order so you can grab pieces before we commit to
              big batches.
            </p>
            <p className="mt-2 text-xs text-white/60">
              Hoodies from <span className="font-semibold">$79–89</span> •
              Tees &amp; caps <span className="font-semibold">$39</span> •
              Stickers <span className="font-semibold">$12</span>
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70">
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#00FFF7]" />
              Pre-Launch
            </span>
            <Link
              href="/students/store"
              className="text-xs text-white/70 hover:text-white/100"
            >
              ← Back to Store Hub
            </Link>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-black/40 px-4 py-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
          Made-to-order • Limited runs • Student access first
        </div>
      </header>

      {/* GRID */}
      <section className="grid gap-6 sm:grid-cols-2">
        {MERCH_ITEMS.map((item) => (
          <MerchCard key={item.key} item={item} />
        ))}
      </section>
    </div>
  );
}
