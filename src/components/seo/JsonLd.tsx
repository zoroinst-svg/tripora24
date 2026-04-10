// JSON-LD Structured Data for SEO

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Tripora24",
    url: "https://www.tripora24.com",
    logo: "https://www.tripora24.com/trivoralogo.png",
    description: "Tripora24 ist eine Reise-Suchmaschine für Flüge, Hotels und Pauschalreisen — automatisch und in Echtzeit.",
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tripora24",
    url: "https://www.tripora24.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.tripora24.com/fluege?from={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function BlogPostingJsonLd({
  headline,
  description,
  image,
  datePublished,
  url,
}: {
  headline: string
  description: string
  image: string
  datePublished: string
  url: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    image,
    datePublished,
    dateModified: datePublished,
    author: { "@type": "Organization", name: "Tripora24" },
    publisher: {
      "@type": "Organization",
      name: "Tripora24",
      logo: { "@type": "ImageObject", url: "https://www.tripora24.com/trivoralogo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
