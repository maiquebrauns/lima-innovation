import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { LIMA_CONFIG } from "@/data/content";
import { ProjectDetailExperience } from "@/components/ProjectDetailExperience";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return LIMA_CONFIG.projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = LIMA_CONFIG.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found | Lima Innovations" };

  return {
    title: `${project.title} | ${LIMA_CONFIG.company.brandName}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = LIMA_CONFIG.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailExperience project={project} />;
}
