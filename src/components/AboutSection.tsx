import React from 'react';

export default function AboutSection() {
  return (
    <section className="py-24 bg-transparent border-t border-border/50" id="about">
      <div className="container relative z-10 mx-auto px-4 flex flex-col justify-center items-start text-left">
        <div className="w-full max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary uppercase tracking-tight mb-8 drop-shadow-xl">
            Built by a student, <br/>
            <span className="text-accent-primary">for students.</span>
          </h2>
          <p className="text-text-primary/90 font-sans leading-relaxed text-lg max-w-2xl drop-shadow-md">
            PrintWarriors was started to close the cost gap for classmates whose brilliant project ideas were held back purely by the high cost of prototyping. Run by an engineering student at Heritage Institute of Technology, Kolkata, we are a genuine student-run service dedicated to helping you build and iterate on your designs affordably.
          </p>
        </div>
      </div>
    </section>
  );
}
