import React from 'react';

/*
 * The wordmark's text, shared by the navbar and the footer so the two can never drift apart. It carries
 * no size, colour or tracking of its own — those belong to whichever element it sits in.
 *
 * The W is real text with a mask over it, not an image or an SVG, so "PrintWarriors" is still read,
 * searched and selected as one word.
 */
export default function Wordmark() {
  return (
    <>
      Print
      <span className="text-accent-primary">
        <span className="layered-w">W</span>arriors
      </span>
    </>
  );
}
