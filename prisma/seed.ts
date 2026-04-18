import { PrismaClient } from "@prisma/client";
import {
  demoAuditLogs,
  demoBookings,
  demoJobRequests,
  demoNotifications,
  demoProviders,
  demoQuotes,
  demoVerificationRecords,
} from "../src/lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.bookingMilestone.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.capacityListing.deleteMany();
  await prisma.verificationRecord.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.jobRequest.deleteMany();
  await prisma.providerProfile.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        id: "user-buyer",
        name: "Tariro Moyo",
        email: "buyer@forgenet.demo",
        role: "BUYER",
      },
      {
        id: "user-provider",
        name: "Rutendo Ncube",
        email: "provider@forgenet.demo",
        role: "PROVIDER",
      },
      ...demoProviders
        .filter((provider) => provider.ownerUserId !== "user-provider")
        .map((provider, index) => ({
          id: provider.ownerUserId,
          name: `${provider.companyName} Operator`,
          email: `provider${index + 2}@forgenet.demo`,
          role: "PROVIDER" as const,
        })),
      {
        id: "user-admin",
        name: "Nkosana Dube",
        email: "admin@forgenet.demo",
        role: "ADMIN",
      },
    ],
  });

  for (const provider of demoProviders) {
    await prisma.providerProfile.create({
      data: {
        id: provider.id,
        userId: provider.ownerUserId,
        companyName: provider.companyName,
        slug: provider.slug,
        location: provider.location,
        summary: provider.summary,
        verificationStatus: provider.verificationStatus,
        verificationBadgeLabel: provider.verificationBadgeLabel,
        rating: provider.rating,
        completedJobs: provider.completedJobs,
        utilizationPercent: provider.utilizationPercent,
        capacitySharePercent: provider.capacitySharePercent,
        responseHours: provider.responseHours,
        minimumOrderValue: provider.minimumOrderValue,
        categories: provider.categories,
        listings: {
          create: provider.listings.map((listing) => ({
            id: listing.id,
            title: listing.title,
            category: listing.category,
            city: listing.city,
            region: listing.region,
            availableCapacity: listing.availableCapacity,
            leadTimeDays: listing.leadTimeDays,
            estimatedPriceMin: listing.estimatedPriceMin,
            estimatedPriceMax: listing.estimatedPriceMax,
            unit: listing.unit,
            description: listing.description,
            complianceSummary: listing.complianceSummary,
            verified: listing.verified,
            tags: listing.tags,
          })),
        },
      },
    });
  }

  await prisma.jobRequest.createMany({
    data: demoJobRequests.map((request) => ({
      id: request.id,
      buyerId: request.buyerId,
      title: request.title,
      category: request.category,
      quantity: request.quantity,
      preferredLocation: request.preferredLocation,
      deadline: request.deadline,
      budgetMin: request.budgetMin,
      budgetMax: request.budgetMax,
      notes: request.notes,
      complianceRequirements: request.complianceRequirements,
      status: request.status,
    })),
  });

  await prisma.quote.createMany({
    data: demoQuotes.map((quote) => ({
      id: quote.id,
      jobRequestId: quote.jobRequestId,
      providerId: quote.providerId,
      listingId: quote.listingId,
      price: quote.price,
      currency: quote.currency,
      leadTimeDays: quote.leadTimeDays,
      validUntil: quote.validUntil,
      notes: quote.notes,
      matchScore: quote.matchScore,
      matchExplanation: quote.matchExplanation,
      status: quote.status,
    })),
  });

  for (const booking of demoBookings) {
    await prisma.booking.create({
      data: {
        id: booking.id,
        jobRequestId: booking.jobRequestId,
        quoteId: booking.quoteId,
        buyerId: booking.buyerId,
        providerId: booking.providerId,
        status: booking.status,
        contractAcknowledged: booking.contractAcknowledged,
        issueFlagged: booking.issueFlagged,
        milestoneValue: booking.milestoneValue,
        milestones: {
          create: booking.milestones.map((milestone, index) => ({
            id: milestone.id,
            label: milestone.label,
            description: milestone.description,
            sortOrder: index,
            state: milestone.state,
          })),
        },
      },
    });
  }

  await prisma.verificationRecord.createMany({
    data: demoVerificationRecords,
  });

  await prisma.notification.createMany({
    data: demoNotifications,
  });

  await prisma.auditLog.createMany({
    data: demoAuditLogs,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
