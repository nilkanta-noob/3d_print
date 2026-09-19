import React from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import ButtonLink from './ButtonLink';
import { formatRate, type Material } from './content/materials';
import { QUOTE_HREF } from './content/site';

function DetailList({ title, items, icon: Icon }: { title: string; items: string[]; icon: typeof Plus }) {
  return (
    <div>
      <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-text-primary">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Icon className="mt-0.5 size-4 shrink-0 text-text-muted" strokeWidth={2} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Full write-up for one material on the Materials page. The id lets other pages link straight to it.
export default function MaterialDetail({ material }: { material: Material }) {
  const { standard, student } = material.pricePerGram;

  return (
    <article id={material.slug} className="scroll-mt-24 rounded-2xl border border-border bg-elevated p-7 md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-3xl font-bold text-text-primary">{material.name}</h3>
          <p className="mt-2 text-sm text-text-muted">
            {material.tag} · {formatRate(standard)}/g{student !== null && ` · student ${formatRate(student)}/g`}
          </p>
        </div>
        <ButtonLink href={QUOTE_HREF} variant="secondary">Get a quote</ButtonLink>
      </div>

      <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-text-secondary">{material.description}</p>

      <div className="mt-8 grid gap-8 border-t border-border pt-8 md:grid-cols-3">
        <DetailList title="Advantages" items={material.advantages} icon={Plus} />
        <DetailList title="Limitations" items={material.limitations} icon={Minus} />
        <DetailList title="Best applications" items={material.applications} icon={ArrowRight} />
      </div>
    </article>
  );
}
