"use client";

import React, { useState } from 'react';
import ScrollPrintSequence from './ScrollPrintSequence';
import QueryFormModal from './QueryForm';

// The existing hero, unchanged, plus the quote modal its "Get Instant Quote" button opens.
// Kept in this small client wrapper so the rest of the home page can render on the server.
export default function HomeHero() {
  const [isQueryFormOpen, setIsQueryFormOpen] = useState(false);

  return (
    <>
      <ScrollPrintSequence onOpenQuery={() => setIsQueryFormOpen(true)} />
      <QueryFormModal isOpen={isQueryFormOpen} onClose={() => setIsQueryFormOpen(false)} />
    </>
  );
}
