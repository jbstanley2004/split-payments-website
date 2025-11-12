"use client";
import React from 'react';

type Props = { id: string; className?: string; children: React.ReactNode };

export default function ScrollSection({ id, className, children }: Props) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}
