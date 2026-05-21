"use client";

import { useState } from "react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  note: string;
};

const LONG_TESTIMONIAL_LENGTH = 150;

export function TestimonialCard({ quote, name, note }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isLong = quote.length > LONG_TESTIMONIAL_LENGTH;
  const isVisible = isExpanded || isClosing;
  const state = isClosing ? "closing" : isExpanded ? "open" : "closed";

  function openTestimonial() {
    setIsClosing(false);
    setIsExpanded(true);
  }

  function closeTestimonial() {
    setIsClosing(true);
    window.setTimeout(() => {
      setIsExpanded(false);
      setIsClosing(false);
    }, 180);
  }

  return (
    <article
      className="testimonial"
      data-expanded={isVisible ? "true" : "false"}
      data-state={state}
    >
      {isVisible ? (
        <button
          aria-label="Fechar depoimento completo"
          className="testimonial-backdrop"
          type="button"
          onClick={closeTestimonial}
        />
      ) : null}
      <div className="testimonial-surface">
        <p className={isLong && !isVisible ? "testimonial-quote is-clamped" : "testimonial-quote"}>
          “{quote}”
        </p>
        {isLong ? (
          <button
            className="testimonial-toggle"
            type="button"
            aria-expanded={isVisible}
            onClick={isVisible ? closeTestimonial : openTestimonial}
          >
            {isVisible ? "Mostrar menos" : "Ler depoimento completo"}
          </button>
        ) : null}
        <span>{name}</span>
        <small>{note}</small>
      </div>
    </article>
  );
}
