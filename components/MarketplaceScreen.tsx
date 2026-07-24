"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { ShoppingBagIcon } from "@/components/icons";
import { SeedIcon, FertilizerIcon, PesticideIcon, EquipmentIcon } from "@/components/marketplace-icons";
import {
  getAllMarketplaceItems,
  getMarketplaceItems,
  type MarketplaceItem,
} from "@/lib/mocked/crop-marketplace-items";

type Category = MarketplaceItem["category"];
type CategoryFilter = "all" | Category;

const CATEGORY_KEYS: Record<CategoryFilter, TranslationKey> = {
  all: "marketplace.category.all",
  seed: "marketplace.category.seed",
  fertilizer: "marketplace.category.fertilizer",
  pesticide: "marketplace.category.pesticide",
  equipment: "marketplace.category.equipment",
};

const CATEGORY_VISUALS: Record<Category, { Icon: typeof SeedIcon; bg: string }> = {
  seed: { Icon: SeedIcon, bg: "bg-lime-50" },
  fertilizer: { Icon: FertilizerIcon, bg: "bg-amber-50" },
  pesticide: { Icon: PesticideIcon, bg: "bg-sky-50" },
  equipment: { Icon: EquipmentIcon, bg: "bg-zinc-100" },
};

const CATEGORIES: CategoryFilter[] = ["all", "seed", "fertilizer", "pesticide", "equipment"];

type CartLine = { item: MarketplaceItem; qty: number };

function ProductCard({
  item,
  onAdd,
  addLabel,
  ourPickLabel,
}: {
  item: MarketplaceItem;
  onAdd: (item: MarketplaceItem) => void;
  addLabel: string;
  ourPickLabel: string;
}) {
  const { Icon, bg } = CATEGORY_VISUALS[item.category];
  return (
    <div className="relative flex flex-col rounded-2xl bg-white p-3 shadow-sm">
      {item.recommended && (
        <span className="absolute right-2 top-2 z-10 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
          ★ {ourPickLabel}
        </span>
      )}
      <div className={`flex h-16 w-full items-center justify-center rounded-xl ${bg}`}>
        <Icon className="h-10 w-10" />
      </div>
      <p className="mt-2 text-xs font-semibold text-zinc-800">{item.name}</p>
      <p className="text-xs text-zinc-400">{item.priceRange}</p>
      <button
        onClick={() => onAdd(item)}
        className="mt-2 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white active:scale-95"
      >
        + {addLabel}
      </button>
    </div>
  );
}

export function MarketplaceScreen({ recommendedCrop }: { recommendedCrop: string | null }) {
  const { t } = useLanguage();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const allItems = useMemo(() => getAllMarketplaceItems(), []);
  const recommended = useMemo(
    () => (recommendedCrop ? getMarketplaceItems(recommendedCrop) : []),
    [recommendedCrop],
  );

  const filteredItems = useMemo(
    () =>
      (category === "all" ? allItems : allItems.filter((i) => i.category === category))
        .slice()
        .sort((a, b) => Number(b.recommended) - Number(a.recommended)),
    [allItems, category],
  );

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  function addToCart(item: MarketplaceItem) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.name === item.name);
      if (existing) {
        return prev.map((line) =>
          line.item.name === item.name ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...prev, { item, qty: 1 }];
    });
    showToast(`${item.name} — ${t("marketplace.added")}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 pb-8">
      <header className="flex items-center gap-3 border-b border-zinc-200 bg-white px-4 py-4">
        <Link href="/home" className="text-zinc-500 hover:text-zinc-800">←</Link>
        <h1 className="flex-1 text-base font-semibold text-zinc-900">
          {t("marketplace.pageTitle")}
        </h1>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-700"
        >
          <ShoppingBagIcon className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Recommended for you — driven by the AI crop advisory suggestion */}
      {recommendedCrop && recommended.length > 0 && (
        <div className="border-b border-zinc-200 bg-white px-4 py-4">
          <p className="mb-3 text-sm font-semibold text-emerald-700">
            🌾 {t("marketplace.recommendedFor")} {recommendedCrop}
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {recommended.map((item) => (
              <div key={item.name} className="w-32 shrink-0">
                <ProductCard item={item} onAdd={addToCart} addLabel={t("marketplace.addToCart")} ourPickLabel={t("marketplace.ourPick")} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category filter chips */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              category === c
                ? "bg-emerald-600 text-white"
                : "bg-white text-zinc-600 ring-1 ring-zinc-200"
            }`}
          >
            {t(CATEGORY_KEYS[c])}
          </button>
        ))}
      </div>

      {/* All products grid */}
      <div className="px-4">
        <p className="mb-3 text-sm font-semibold text-zinc-700">{t("marketplace.allProducts")}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {filteredItems.map((item) => (
            <ProductCard key={item.name} item={item} onAdd={addToCart} addLabel={t("marketplace.addToCart")} ourPickLabel={t("marketplace.ourPick")} />
          ))}
        </div>
      </div>

      {/* Cart bottom sheet */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={() => setCartOpen(false)}>
          <div
            className="w-full rounded-t-3xl bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">{t("marketplace.cart")}</p>
              <button onClick={() => setCartOpen(false)} className="text-zinc-400">✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="py-6 text-center text-sm text-zinc-400">{t("marketplace.cartEmpty")}</p>
            ) : (
              <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
                {cart.map((line) => {
                  const { Icon, bg } = CATEGORY_VISUALS[line.item.category];
                  return (
                  <div
                    key={line.item.name}
                    className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-zinc-800">{line.item.name}</p>
                        <p className="text-xs text-zinc-400">{line.item.priceRange}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-zinc-600">×{line.qty}</span>
                  </div>
                  );
                })}
              </div>
            )}
            <button
              onClick={() => showToast(t("marketplace.checkoutComingSoon"))}
              className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white active:scale-95 disabled:opacity-40"
              disabled={cart.length === 0}
            >
              {t("marketplace.checkoutComingSoon")}
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
