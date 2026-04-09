import { SearchHero } from "@/components/search/SearchHero"
import { TrendingDeals } from "@/components/deals/TrendingDeals"
import { HowItWorks } from "@/components/deals/HowItWorks"
import { PopularDestinations } from "@/components/deals/PopularDestinations"

export default function Home() {
  return (
    <>
      <SearchHero />
      <TrendingDeals />
      <HowItWorks />
      <PopularDestinations />
    </>
  )
}
