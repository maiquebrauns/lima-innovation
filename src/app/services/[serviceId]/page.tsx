import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { LIMA_CONFIG } from "@/data/content";
import { ServiceDetailExperience } from "@/components/ServiceDetailExperience";

export function generateStaticParams() {
  return LIMA_CONFIG.services.map((service) => ({
    serviceId: service.id,
  }));
}

interface ServicePageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = LIMA_CONFIG.services.find((s) => s.id === resolvedParams.serviceId);
  if (!service) return { title: "Service Not Found | Lima Innovations" };

  return {
    title: `${service.title} | ${LIMA_CONFIG.company.brandName}`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = LIMA_CONFIG.services.find((s) => s.id === resolvedParams.serviceId);

  if (!service) {
    notFound();
  }

  return <ServiceDetailExperience key={service.id} service={service} />;
}
