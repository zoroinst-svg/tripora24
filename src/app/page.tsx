import { SearchHero } from "@/components/search/SearchHero"
import { QuickActions } from "@/components/sections/QuickActions"
import { PromoBanner } from "@/components/sections/PromoBanner"
import { TrendingDeals } from "@/components/deals/TrendingDeals"
import { PopularDestinations } from "@/components/deals/PopularDestinations"
import { HowItWorks } from "@/components/deals/HowItWorks"
import { BlogPreview } from "@/components/sections/BlogPreview"
import { FAQ } from "@/components/sections/FAQ"

export default function Home() {
  return (
    <>
      <SearchHero />
      <QuickActions />
      <TrendingDeals />
      <PromoBanner />
      <PopularDestinations />
      <HowItWorks />
      <BlogPreview />
      <FAQ />
    </>
  )
}
