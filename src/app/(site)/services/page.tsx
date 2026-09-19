import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import CtaBanner from '@/components/CtaBanner';
import { SERVICES } from '@/components/content/services';
import { QUOTE_HREF } from '@/components/content/site';

export const metadata: Metadata = {
  title: 'Services | PrintWarriors',
  description: 'Rapid prototyping, college projects, custom parts and product development support — 3D printing from Kolkata, delivered across India.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we print"
        description="From a single college part to repeated design revisions — the same per-gram pricing and human file review for every order."
      />

      <Section tone="band">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Have a part in mind?"
        description="Upload your CAD file and we'll review it and email your quote — usually within the hour."
        primary={{ href: QUOTE_HREF, label: 'Get a quote' }}
        secondary={{ href: '/contact', label: 'Contact us' }}
      />
    </>
  );
}
