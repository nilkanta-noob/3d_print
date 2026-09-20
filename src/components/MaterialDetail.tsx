import React from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import ButtonLink from './ButtonLink';
import { formatRate, type Material } from './content/materials';
import { QUOTE_HREF } from './content/site';

function DetailList({ title, items, icon: Icon }: { title: string; items: string[]; icon: typeof Plus }) {
  return (
    <div>
      <h4 className="label-micro text-text-muted">{title}</h4>
      <ul className="mt-6 space-y-4 text-sm leading-[1.6] text-text-primary">
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
    <article id={material.slug} className="scroll-mt-24 border border-border bg-elevated p-8 md:p-12">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div>
          <h3 className="font-display text-[2.5rem] font-medium leading-[0.95] tracking-[-0.04em] text-text-primary">{material.name}</h3>
          <p className="label-micro mt-5 text-text-muted">
            {material.tag} · {formatRate(standard)}/g{student !== null && ` · student ${formatRate(student)}/g`}
          </p>
        </div>
        <ButtonLink href={QUOTE_HREF} variant="secondary">Get a quote</ButtonLink>
      </div>

      <p className="mt-8 max-w-[62ch] text-base leading-[1.75] text-text-secondary md:text-[17px]">{material.description}</p>

      <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
        <DetailList title="Advantages" items={material.advantages} icon={Plus} />
        <DetailList title="Limitations" items={material.limitations} icon={Minus} />
        <DetailList title="Best applications" items={material.applications} icon={ArrowRight} />
      </div>
    </article>
  );
}
