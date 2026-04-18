import type { Locale } from "./types";

export const messages = {
  en: {
    nav: {
      marketplace: "Marketplace",
      postNeed: "Post Requirement",
      trust: "Trust & Governance",
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
      reset: "Reset filters",
      noResults: "No capacity listings match the current filters.",
      backToFlow: "Return to buyer flow",
      demoRole: "Demo role",
    },
    footer: {
      description:
        "Industrial capacity exchange for fabrication, packaging, warehousing, cold storage, and return-load logistics.",
      marketplace: "Marketplace",
      request: "Post a requirement",
      trust: "Trust and compliance",
      login: "Demo access",
      note: "Built for demo credibility: mocked payments, mocked verification checks, real product structure.",
    },
    login: {
      badge: "Demo access",
      title: "Switch roles instantly for the investor walkthrough.",
      description:
        "Authentication is intentionally simplified so the demo can move from buyer to provider to operations without friction.",
    },
  },
  sn: {
    nav: {
      marketplace: "Musika",
      postNeed: "Isa chikumbiro",
      trust: "Kuvimbika & kutongwa",
      provider: "Dashboard yemupi",
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
      reset: "Dzorerazve mafirita",
      noResults: "Hapana vanopa capacity vanowirirana nemafirita aya.",
      backToFlow: "Dzokera kuflow yemutengi",
      demoRole: "Basa redemo",
    },
    footer: {
      description:
        "Musika weindustrial capacity wemafabrication, packaging, warehousing, cold storage, nelogistics.",
      marketplace: "Musika",
      request: "Isa chikumbiro",
      trust: "Kuvimbika nekutevedzera",
      login: "Kupinda kwedemo",
      note: "Yakagadzirirwa demo yakasimba: payments nedzimwe checks zvakangomokwa asi product structure yakakwana.",
    },
    login: {
      badge: "Kupinda kwedemo",
      title: "Chinja mabasa nekukurumidza pademo remari kana pitch.",
      description:
        "Kupinda kwakarerutswa kuti buyer, provider, neoperations zvionekwe pasina kukanganisa demo flow.",
    },
  },
  nd: {
    nav: {
      marketplace: "Imakethe",
      postNeed: "Faka isicelo",
      trust: "Ukuthembeka lokulawulwa",
      provider: "I-dashboard yomphakeli",
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
      reset: "Setha kutsha ama-filter",
      noResults: "Akula ma-listing ahambelana lama-filter akhona.",
      backToFlow: "Buyela ku buyer flow",
      demoRole: "Indima yedemo",
    },
    footer: {
      description:
        "Imakethe yeindustrial capacity ye-fabrication, packaging, warehousing, cold storage, kanye le-logistics.",
      marketplace: "Imakethe",
      request: "Faka isicelo",
      trust: "Ukuthembeka lokuhambisana",
      login: "Ukungena kwedemo",
      note: "Idizayinelwe idemo eqinileyo: ama-payment rails ayimock, kodwa ukwakheka komkhiqizo kuyakholeka.",
    },
    login: {
      badge: "Ukungena kwedemo",
      title: "Tshintsha indima masinyane ku walkthrough yeMVP.",
      description:
        "Ukungena kwenziwe lula ukuze buyer, provider, kanye le-operations kubonakale ngaphandle kokuphazamisa i-demo.",
    },
  },
  ve: {
    nav: {
      marketplace: "Marketplace",
      postNeed: "Rumelani khumbelo",
      trust: "Trust & compliance",
      provider: "Dashboard ya provider",
      admin: "Operations",
      login: "Demo access",
    },
    common: {
      verified: "Zwo khwathisedzwa",
      requestQuote: "Humbelani quote",
      viewMatches: "Vhonani zwi fanaho",
      getStarted: "Vulani demo",
      buyer: "Buyer",
      provider: "Provider",
      admin: "Admin",
      language: "Luambo",
      reset: "Dzudzanyani filters",
      noResults: "A huna listings dzi elanaho na filters dza zwino.",
      backToFlow: "Humelani kha buyer flow",
      demoRole: "Role ya demo",
    },
    footer: {
      description:
        "Industrial capacity exchange ya fabrication, packaging, warehousing, cold storage, na logistics.",
      marketplace: "Marketplace",
      request: "Rumelani khumbelo",
      trust: "Trust na compliance",
      login: "Demo access",
      note: "Yo lugiselwa demo: payments na verification ya vhukuma a zwi khou itwa, fhedzi product structure i a pfesesea.",
    },
    login: {
      badge: "Demo access",
      title: "Shandukisani role nga u tavhanya kha walkthrough ya MVP.",
      description:
        "Login yo leluwaho u itela uri buyer, provider, na operations zwi kone u sumbedzwa nga u tavhanya.",
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
