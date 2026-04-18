import type { Locale } from "./types";

export const messages = {
  en: {
    nav: {
      marketplace: "Marketplace",
      postNeed: "Post Requirement",
      trust: "Trust & Governance",
      provider: "Provider dashboard",
      admin: "Operations",
      login: "Account access",
    },
    common: {
      verified: "Verified",
      requestQuote: "Request quote",
      viewMatches: "View matches",
      getStarted: "Get started",
      buyer: "Buyer",
      provider: "Provider",
      admin: "Admin",
      language: "Language",
      reset: "Reset filters",
      noResults: "No capacity listings match the current filters.",
      backToFlow: "Return to buyer flow",
      demoRole: "Access level",
    },
    footer: {
      description:
        "Industrial capacity exchange for fabrication, packaging, warehousing, cold storage, and return-load logistics.",
      marketplace: "Marketplace",
      request: "Post a requirement",
      trust: "Trust and compliance",
      login: "Account access",
      note: "Industrial-grade capacity exchange: verified providers, secure matching, and transparent milestone tracking.",
    },
    login: {
      badge: "Account access",
      title: "Authorize your account to enter the platform.",
      description:
        "Select your industrial role to continue with the production workflow.",
    },
  },
  sn: {
    nav: {
      marketplace: "Musika",
      postNeed: "Isa chikumbiro",
      trust: "Kuvimbika & kutongwa",
      provider: "Dashboard yemupi",
      admin: "Mashandiro",
      login: "Kupinda",
    },
    common: {
      verified: "Yasimbiswa",
      requestQuote: "Kumbira mutengo",
      viewMatches: "Ona zvinonyatsoenderana",
      getStarted: "Tanga pano",
      buyer: "Mutengi",
      provider: "Mupi",
      admin: "Mutariri",
      language: "Mutauro",
      reset: "Dzorerazve mafirita",
      noResults: "Hapana vanopa capacity vanowirirana nemafirita aya.",
      backToFlow: "Dzokera kuflow yemutengi",
      demoRole: "Chinzvimbo",
    },
    footer: {
      description:
        "Musika weindustrial capacity wemafabrication, packaging, warehousing, cold storage, nelogistics.",
      marketplace: "Musika",
      request: "Isa chikumbiro",
      trust: "Kuvimbika nekutevedzera",
      login: "Kupinda",
      note: "Musika weindustrial capacity: vanopa vakasimbiswa, kutarisa kwakakwana, nekutevera mashandiro.",
    },
    login: {
      badge: "Chiratidzo chekupinda",
      title: "Pinda mune chinzvimbo chako kuti utange basa.",
      description:
        "Sarudza chinzvimbo chako cheindustrial kuti uenderere mberi neproduction workflow.",
    },
  },
  nd: {
    nav: {
      marketplace: "Imakethe",
      postNeed: "Faka isicelo",
      trust: "Ukuthembeka lokulawulwa",
      provider: "I-dashboard yomphakeli",
      admin: "Ukuqhuba",
      login: "Ukungena",
    },
    common: {
      verified: "Kuqinisekisiwe",
      requestQuote: "Cela intengo",
      viewMatches: "Bona okulinganayo",
      getStarted: "Qalisa",
      buyer: "Umthengi",
      provider: "Umphakeli",
      admin: "Umqondisi",
      language: "Ulimi",
      reset: "Setha kutsha ama-filter",
      noResults: "Akula ma-listing ahambelana lama-filter akhona.",
      backToFlow: "Buyela ku buyer flow",
      demoRole: "Isigaba sokungena",
    },
    footer: {
      description:
        "Imakethe yeindustrial capacity ye-fabrication, packaging, warehousing, cold storage, kanye le-logistics.",
      marketplace: "Imakethe",
      request: "Faka isicelo",
      trust: "Ukuthembeka lokuhambisana",
      login: "Ukungena",
      note: "Imakethe ye-industrial capacity: abaphakeli abaqinisekisiweyo, ukuhambelana okuphephileyo, lokulandelela inqubo.",
    },
    login: {
      badge: "Isigaba sokungena",
      title: "Ngena endimeni yakho ukuze uqalise umsebenzi.",
      description:
        "Khetha indima yakho ye-industrial ukuze uqhubeke lenqubo yokuvelisa.",
    },
  },
  ve: {
    nav: {
      marketplace: "Marketplace",
      postNeed: "Rumelani khumbelo",
      trust: "Trust & compliance",
      provider: "Dashboard ya provider",
      admin: "Operations",
      login: "Login",
    },
    common: {
      verified: "Zwo khwathisedzwa",
      requestQuote: "Humbelani quote",
      viewMatches: "Vhonani zwi fanaho",
      getStarted: "Tangani",
      buyer: "Buyer",
      provider: "Provider",
      admin: "Admin",
      language: "Luambo",
      reset: "Dzudzanyani filters",
      noResults: "A huna listings dzi elanaho na filters dza zwino.",
      backToFlow: "Humelani kha buyer flow",
      demoRole: "Access level",
    },
    footer: {
      description:
        "Industrial capacity exchange ya fabrication, packaging, warehousing, cold storage, na logistics.",
      marketplace: "Marketplace",
      request: "Rumelani khumbelo",
      trust: "Trust na compliance",
      login: "Login",
      note: "Industrial capacity exchange: providers vho khwathisedzwaho, matching yo tsireledzeaho, na u londa milestones.",
    },
    login: {
      badge: "Access level",
      title: "Dzhibulani account yanu u itela u tanga.",
      description:
        "Nangani role yanu ya industrial u itela u bvelele phanda na production workflow.",
    },
  },
} as const satisfies Record<
  Locale,
  {
    nav: Record<string, string>;
    common: Record<string, string>;
    footer: Record<string, string>;
    login: Record<string, string>;
  }
>;

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.en;
}
