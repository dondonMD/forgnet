import type { Locale } from "./types";

export const messages = {
  en: {
    nav: {
      marketplace: "Marketplace",
      postNeed: "Post need",
      trust: "Trust",
      provider: "Provider dashboard",
      admin: "Operations",
      login: "Demo access",
    },
    common: {
      verified: "Verified",
      requestQuote: "Request quote",
      viewMatches: "View matches",
      getStarted: "Launch demo",
      buyer: "Buyer",
      provider: "Provider",
      admin: "Admin",
      language: "Language",
    },
  },
  sn: {
    nav: {
      marketplace: "Musika",
      postNeed: "Isa chido",
      trust: "Kuvimbika",
      provider: "Dashibhodhi remupi",
      admin: "Mashandiro",
      login: "Kupinda kwedemo",
    },
    common: {
      verified: "Yasimbiswa",
      requestQuote: "Kumbira mutengo",
      viewMatches: "Ona zvinonyatsoenderana",
      getStarted: "Vhura demo",
      buyer: "Mutengi",
      provider: "Mupi",
      admin: "Mutariri",
      language: "Mutauro",
    },
  },
  nd: {
    nav: {
      marketplace: "Imakethe",
      postNeed: "Faka isicelo",
      trust: "Ukwethembeka",
      provider: "Ideshibhodi yomphakeli",
      admin: "Ukuqhuba",
      login: "Ukungena kwedemo",
    },
    common: {
      verified: "Kuqinisekisiwe",
      requestQuote: "Cela intengo",
      viewMatches: "Bona okulinganayo",
      getStarted: "Vula idemo",
      buyer: "Umthengi",
      provider: "Umphakeli",
      admin: "Umqondisi",
      language: "Ulimi",
    },
  },
  ve: {
    nav: {
      marketplace: "Maraga",
      postNeed: "Dzhenisani ṱhoḓea",
      trust: "U fulufhedzea",
      provider: "Dashboard ya mufhi",
      admin: "Operations",
      login: "Demo access",
    },
    common: {
      verified: "Yo khwaṱhisedzwa",
      requestQuote: "Humbelani quote",
      viewMatches: "Vhonani zwi fanaho",
      getStarted: "Vulani demo",
      buyer: "Murei",
      provider: "Mufhi",
      admin: "Admin",
      language: "Luambo",
    },
  },
} as const satisfies Record<
  Locale,
  {
    nav: Record<string, string>;
    common: Record<string, string>;
  }
>;

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.en;
}
