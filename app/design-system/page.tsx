import type { Metadata } from "next";

import { BookingSection } from "./_sections/booking";
import { ControlsSection } from "./_sections/controls";
import {
  ColorsSection,
  EffectsSection,
  IconsSection,
  LayoutSection,
  TypographySection,
} from "./_sections/foundations";

export const metadata: Metadata = {
  title: "Design System — Dr. Caio Medeiros",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-24 px-4 py-12 lg:px-8 lg:py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-display-mobile text-primary lg:text-display">
          Design System
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Dr. Caio Medeiros — tokens e componentes (v2).
        </p>
      </header>
      <ColorsSection />
      <TypographySection />
      <EffectsSection />
      <IconsSection />
      <ControlsSection />
      <BookingSection />
      <LayoutSection />
    </main>
  );
}
