// Centralized icon exports — Heroicons (primary) + Lucide (fallbacks)
// All icons re-exported from here for consistent styling
// Heroicons: 24px outline (professional, used by GitHub, Netflix, Coinbase)
// Lucide: where Heroicons has no equivalent

export {
  // Navigation & Actions
  MagnifyingGlassIcon as SearchIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon as SwapIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  XMarkIcon as CloseIcon,
  Bars3Icon as MenuIcon,
  ArrowTopRightOnSquareIcon as ExternalLinkIcon,

  // Travel
  GlobeAltIcon as GlobeIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  UsersIcon,
  HeartIcon,
  StarIcon,

  // Communication
  BellIcon,
  EnvelopeIcon as MailIcon,
  QuestionMarkCircleIcon as HelpIcon,
  BookOpenIcon,
  SparklesIcon,
  ShieldCheckIcon as ShieldIcon,

  // UI
  CheckIcon,
  PlusIcon,
  MinusIcon,
  SunIcon,
  MoonIcon,
  ExclamationCircleIcon as AlertIcon,
  FireIcon as FlameIcon,
  FunnelIcon as FilterIcon,

  // Transport
  BuildingOfficeIcon as BuildingIcon,

} from "@heroicons/react/24/outline"

// Solid variants for filled icons
export {
  StarIcon as StarSolidIcon,
  CheckIcon as CheckSolidIcon,
} from "@heroicons/react/24/solid"

// Lucide-only icons (no Heroicon equivalent)
export {
  Plane as PlaneIcon,
  Hotel as HotelIcon,
  Package as PackageIcon,
  Car as CarIcon,
  Cookie as CookieIcon,
  Loader2 as SpinnerIcon,
  Luggage as LuggageIcon,
  BaggageClaim as BaggageIcon,
} from "lucide-react"
