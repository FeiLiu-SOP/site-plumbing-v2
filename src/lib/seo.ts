import type { ActiveCollectionKey } from "../active-collection";
import type { ParsedLocation } from "./location";
import { normalizePhoneE164, siteConfig } from "../site-config";

export type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_BY_COLLECTION: Record<ActiveCollectionKey, FaqItem[]> = {
  roofing: [
    {
      question: "Do you offer emergency roofing repairs?",
      answer:
        "Yes. We coordinate local emergency roofing response for leak mitigation and urgent storm-damage inspections.",
    },
    {
      question: "How quickly can a roofer arrive?",
      answer:
        "Most service areas support same-day dispatch windows depending on technician availability and weather conditions.",
    },
    {
      question: "Can you inspect roof leaks before full replacement?",
      answer:
        "Yes. We prioritize inspection-first recommendations so homeowners can compare repair vs replacement options.",
    },
    {
      question: "Do you handle storm and wind roof damage?",
      answer:
        "Yes. We help with common storm damage scenarios including missing shingles, flashing issues, and active leaks.",
    },
    {
      question: "Are estimates available for local roofing service?",
      answer:
        "Yes. Availability varies by city, but transparent estimate options are provided before work is scheduled.",
    },
    {
      question: "Can you inspect flashing and vent penetrations?",
      answer:
        "Yes. Inspection requests often include flashing, vent boots, ridge caps, and other leak-prone transitions.",
    },
    {
      question: "Do you work with asphalt shingle roofs?",
      answer:
        "Yes. Asphalt shingle systems are among the most common residential roofing requests in many service areas.",
    },
    {
      question: "Can roof repairs help after hail exposure?",
      answer:
        "Yes. Many calls involve impact checks, missing granules, and moisture entry after hail or wind events.",
    },
    {
      question: "Will you explain repair versus replacement options?",
      answer:
        "Yes. Homeowners are usually given a scope review so they can compare targeted repair and full replacement paths.",
    },
    {
      question: "Are emergency tarping options available?",
      answer:
        "In some service areas, temporary weather protection may be available while a permanent repair plan is arranged.",
    },
    {
      question: "Can roof issues affect attic moisture conditions?",
      answer:
        "Yes. Ongoing leaks and ventilation issues can contribute to attic moisture, insulation damage, and interior staining.",
    },
    {
      question: "Do you provide written scope details before scheduling?",
      answer:
        "Yes. Scope, material notes, and scheduling expectations are typically reviewed before work is confirmed.",
    },
    {
      question: "Can you check roof decking for soft spots?",
      answer:
        "Yes. When accessible, service teams may check for soft decking areas or visible moisture-related concerns.",
    },
    {
      question: "Do you offer guidance on ventilation and intake/exhaust balance?",
      answer:
        "In many cases, yes. Ventilation notes are often part of a broader inspection conversation.",
    },
    {
      question: "Can you help with gutter-related overflow contributing to leaks?",
      answer:
        "Yes. Water management issues can contribute to roof and fascia concerns in certain scenarios.",
    },
    {
      question: "Do you handle chimney flashing leak points?",
      answer:
        "Yes. Chimney transitions are common leak-prone areas and are often checked during inspection requests.",
    },
    {
      question: "Can you document findings with photos when available?",
      answer:
        "Often, yes. Some technicians provide photos of visible issues to help explain recommendations.",
    },
    {
      question: "Are warranty details reviewed before approval?",
      answer:
        "Yes. When applicable, warranty scope and exclusions are typically discussed before work is scheduled.",
    },
    {
      question: "Can seasonal ice or wind patterns affect roofing wear?",
      answer:
        "Yes. Seasonal conditions can influence wear patterns and may be mentioned during service discussions.",
    },
    {
      question: "Will you confirm timeline expectations before dispatch?",
      answer:
        "Yes. Service windows and timing expectations are usually shared based on coverage and demand.",
    },
  ],
  plumbing: [
    {
      question: "Do you provide emergency plumber service?",
      answer:
        "Yes. Emergency plumbing support is available for urgent leak, backup, and water flow issues.",
    },
    {
      question: "Can you help with leaky pipe and clogged drain problems?",
      answer:
        "Yes. Local technicians handle pipe leaks, drain clogs, and standard residential plumbing repairs.",
    },
    {
      question: "Are same-day plumbing appointments available?",
      answer:
        "In many cities, same-day scheduling is available based on demand and technician coverage.",
    },
    {
      question: "Do you service both kitchen and bathroom plumbing?",
      answer:
        "Yes. Typical service includes sinks, toilets, faucets, supply lines, and drain line troubleshooting.",
    },
    {
      question: "Will I get pricing details before work starts?",
      answer:
        "Yes. Service teams provide scope and pricing details before work begins whenever possible.",
    },
    {
      question: "Can you inspect water heater supply and drain connections?",
      answer:
        "Yes. Water heater checks often include supply lines, shutoff valves, drain pans, and visible leak points.",
    },
    {
      question: "Do you help with garbage disposal and sink line issues?",
      answer:
        "Yes. Many service calls involve kitchen sink backups, disposal jams, and under-sink connection leaks.",
    },
    {
      question: "Can low water pressure be diagnosed on site?",
      answer:
        "Yes. Pressure complaints are commonly reviewed for valve restrictions, fixture issues, or supply-side problems.",
    },
    {
      question: "Do you handle toilet seal and flange leak concerns?",
      answer:
        "Yes. Toilet leaks can involve wax ring failure, flange movement, or supply connection issues.",
    },
    {
      question: "Can recurring drain clogs indicate a deeper line issue?",
      answer:
        "Yes. Repeated backups may point to branch-line buildup or a larger drain line obstruction requiring inspection.",
    },
    {
      question: "Are shutoff valve and fixture checks part of routine service?",
      answer:
        "Often, yes. Shutoff valves, supply connections, and visible fixture wear are common parts of a service review.",
    },
    {
      question: "Can plumbing leaks damage drywall or flooring quickly?",
      answer:
        "Yes. Even moderate leaks can spread into cabinets, drywall, or flooring if left unresolved.",
    },
    {
      question: "Do you handle faucet cartridge and valve leak repairs?",
      answer:
        "Yes. Many calls involve faucet drips, valve wear, and replacement of common internal components.",
    },
    {
      question: "Can you inspect supply lines for corrosion or wear?",
      answer:
        "Yes. Visible supply connections are commonly checked for wear, corrosion, or slow seepage.",
    },
    {
      question: "Is drain odor troubleshooting included in service?",
      answer:
        "In some cases, yes. Odors may be evaluated for trap issues, venting, or buildup depending on symptoms.",
    },
    {
      question: "Do you help with shower and tub drain backups?",
      answer:
        "Yes. Bathroom drain backups are common and may be assessed for local clogs or branch-line issues.",
    },
    {
      question: "Can you review shutoff access and labeling best practices?",
      answer:
        "Often, yes. Technicians may point out shutoff access considerations during service visits.",
    },
    {
      question: "Are follow-up recommendations provided after urgent service?",
      answer:
        "Yes. After urgent stabilization, additional recommendations may be provided to reduce repeat problems.",
    },
    {
      question: "Can hard water contribute to fixture wear over time?",
      answer:
        "Yes. Mineral buildup can contribute to reduced flow and fixture wear depending on local water conditions.",
    },
    {
      question: "Do you handle visible pipe joint leaks under sinks?",
      answer:
        "Yes. Under-sink joint leaks and connection issues are common service items in many homes.",
    },
  ],
  pestcontrol: [
    {
      question: "Do you provide fast pest control service?",
      answer:
        "Yes. Local service teams support rapid scheduling for urgent pest concerns in most coverage areas.",
    },
    {
      question: "Can you treat ants, roaches, and rodents?",
      answer:
        "Yes. Common treatment requests include ants, cockroaches, and rodent activity in residential properties.",
    },
    {
      question: "Are recurring pest treatment plans available?",
      answer:
        "Yes. Many areas offer recurring treatment plans to reduce reinfestation risks over time.",
    },
    {
      question: "Is inspection included before treatment?",
      answer:
        "Yes. A basic inspection is typically performed first to identify hotspots and treatment scope.",
    },
    {
      question: "Do you provide prevention recommendations?",
      answer:
        "Yes. Technicians usually provide practical prevention steps for sanitation, entry points, and moisture control.",
    },
    {
      question: "Can you identify likely entry points around the home?",
      answer:
        "Yes. Entry-point reviews often include gaps near doors, utility penetrations, vents, and foundation transitions.",
    },
    {
      question: "Do treatment plans vary by pest type and activity level?",
      answer:
        "Yes. Treatment scope is typically adjusted based on the pest involved, visible activity, and affected areas.",
    },
    {
      question: "Can moisture issues make pest activity worse?",
      answer:
        "Yes. Damp crawlspaces, leaks, and standing water can increase conditions that attract certain pests.",
    },
    {
      question: "Do you inspect garages, attics, and exterior edges?",
      answer:
        "Yes. Many inspections include garages, attic access points, exterior perimeters, and common harborage zones.",
    },
    {
      question: "Can recurring service reduce reinfestation risk?",
      answer:
        "Yes. Ongoing monitoring and scheduled treatment can help reduce repeat pest pressure over time.",
    },
    {
      question: "Will technicians explain prep steps before treatment?",
      answer:
        "Yes. Prep guidance is often provided so residents know what to move, clean, or secure before service.",
    },
    {
      question: "Can rodent activity affect insulation or wiring areas?",
      answer:
        "Yes. Rodents may disturb insulation and travel through wall or utility areas if access points remain open.",
    },
    {
      question: "Do you advise on sealing gaps around doors and windows?",
      answer:
        "Yes. Basic exclusion guidance often includes sealing gaps and maintaining door sweeps where appropriate.",
    },
    {
      question: "Can food storage practices impact pest recurrence?",
      answer:
        "Yes. Food storage and sanitation habits can influence pest pressure and reinfestation risk over time.",
    },
    {
      question: "Do you inspect crawlspaces and utility penetrations?",
      answer:
        "Yes. Crawlspaces and utility entry points are common areas reviewed during an inspection.",
    },
    {
      question: "Can exterior vegetation contribute to pest harborages?",
      answer:
        "Yes. Dense vegetation near the structure can provide harborage zones for certain pests.",
    },
    {
      question: "Are treatment products and timelines explained before work begins?",
      answer:
        "Yes. Product type and timeline expectations are commonly reviewed before treatment proceeds.",
    },
    {
      question: "Can monitoring traps be used as part of ongoing control?",
      answer:
        "In some scenarios, yes. Monitoring tools may be used to assess activity over time.",
    },
    {
      question: "Do you provide guidance for reducing moisture sources?",
      answer:
        "Yes. Moisture control notes may be provided when conditions suggest increased pest pressure.",
    },
    {
      question: "Can gaps near vents and soffits be evaluated?",
      answer:
        "Yes. Vent and soffit edges may be checked as potential access points depending on the situation.",
    },
  ],
};

export function getFaqByCollection(collection: ActiveCollectionKey): FaqItem[] {
  return FAQ_BY_COLLECTION[collection];
}

export function buildLocalBusinessSchema(params: {
  collection: ActiveCollectionKey;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  location?: ParsedLocation | null;
}) {
  const { collection, pageTitle, pageDescription, pageUrl, location } = params;
  const serviceType = siteConfig.nicheLabel;
  const telephone = normalizePhoneE164(siteConfig.phoneE164);

  const areaServed = location
    ? {
        "@type": "Place",
        name: `${location.city}, ${location.state}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: location.city,
          addressRegion: location.state,
          postalCode: location.zip,
          addressCountry: "US",
        },
      }
    : {
        "@type": "Country",
        name: "US",
      };

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${serviceType} Service`,
    description: pageDescription,
    url: pageUrl,
    telephone,
    areaServed,
    serviceType,
    slogan: pageTitle,
    knowsAbout: [collection, serviceType, "Emergency service"],
  };
}

export function buildFaqSchema(faqItems: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

