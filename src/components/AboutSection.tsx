import React from 'react';

export default function AboutSection() {
  return (
    <section className="py-24 bg-transparent border-t border-border/50" id="about">
      <div className="container relative z-10 mx-auto px-4 flex flex-col justify-center items-start text-left">
        <div className="w-full max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary uppercase tracking-tight mb-8 drop-shadow-xl">
            Built to bring your <br/>
            <span className="text-accent-primary">ideas to life.</span>
          </h2>
          <p className="text-text-primary/90 font-sans leading-relaxed text-lg max-w-2xl drop-shadow-md">
            PrintWarriors was started to make 3D printing more accessible for anyone with an idea worth building. Founded by an engineering student at Heritage Institute of Technology, Kolkata, we understand the challenges of turning digital designs into physical prototypes without spending a fortune. Whether you're working on a college project, developing a prototype, creating a custom part, or simply bringing an idea to life, we provide affordable and reliable 3D printing to help you build, test, and iterate with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
