export const locales = ["en", "sn", "nd", "ve"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  sn: "Shona",
  nd: "Ndebele",
  ve: "Venda",
};

export type Role = "buyer" | "provider" | "admin";

export type CapacityCategory =
  | "FABRICATION"
  | "PACKAGING"
  | "WAREHOUSING"
  | "COLD_STORAGE"
  | "LOGISTICS";

export type VerificationStatus = "PENDING" | "REVIEWING" | "VERIFIED" | "FLAGGED";
export type RequestStatus = "DRAFT" | "OPEN" | "MATCHED" | "QUOTED" | "BOOKED";
export type QuoteStatus = "DRAFT" | "SENT" | "ACCEPTED" | "DECLINED";
export type BookingStatus =
  | "REQUEST_SUBMITTED"
  | "PROVIDER_CONFIRMED"
  | "PRODUCTION_SCHEDULED"
  | "IN_PROGRESS"
  | "READY_FOR_DISPATCH"
  | "COMPLETED";
export type MilestoneState = "COMPLETE" | "ACTIVE" | "UPCOMING";

export interface CapacityListing {
  id: string;
  providerId: string;
  title: string;
  category: CapacityCategory;
  city: string;
  region: string;
  availableCapacity: string;
  leadTimeDays: number;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  unit: string;
  description: string;
  complianceSummary: string;
  verified: boolean;
  tags: string[];
}

export interface ProviderProfile {
  id: string;
  ownerUserId: string;
  companyName: string;
  slug: string;
  location: string;
  summary: string;
  verificationStatus: VerificationStatus;
  verificationBadgeLabel: string;
  rating: number;
  completedJobs: number;
  utilizationPercent: number;
  capacitySharePercent: number;
  responseHours: number;
  minimumOrderValue: number;
  categories: CapacityCategory[];
  listings: CapacityListing[];
}

export interface JobRequest {
  id: string;
  buyerId: string;
  title: string;
  category: CapacityCategory;
  quantity: number;
  preferredLocation: string;
  deadline: string;
  budgetMin: number;
  budgetMax: number;
  notes: string;
  complianceRequirements?: string;
  status: RequestStatus;
}

export interface MatchResult {
  listingId: string;
  providerId: string;
  score: number;
  explanation: string;
  estimatedPrice: number;
  leadTimeDays: number;
  proximity: "local" | "regional";
}

export interface Quote {
  id: string;
  jobRequestId: string;
  providerId: string;
  listingId: string;
  price: number;
  currency: "USD";
  leadTimeDays: number;
  validUntil: string;
  notes: string;
  matchScore: number;
  matchExplanation: string;
  status: QuoteStatus;
}

export interface BookingMilestone {
  id: string;
  label: string;
  description: string;
  state: MilestoneState;
}

export interface Booking {
  id: string;
  jobRequestId: string;
  quoteId: string;
  buyerId: string;
  providerId: string;
  status: BookingStatus;
  contractAcknowledged: boolean;
  issueFlagged: boolean;
  milestoneValue: number;
  milestones: BookingMilestone[];
}

export interface VerificationRecord {
  id: string;
  providerId: string;
  title: string;
  status: VerificationStatus;
  notes: string;
  checkedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  detail: string;
  createdAt: string;
}
