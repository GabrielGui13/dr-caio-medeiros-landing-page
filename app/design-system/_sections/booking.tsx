"use client";

import * as React from "react";

import { BookingCalendar } from "@/components/booking/booking-calendar";
import {
  CalendarDay,
  CalendarDayEmpty,
} from "@/components/booking/calendar-day";
import {
  ServiceOption,
  ServiceOptionGroup,
} from "@/components/booking/service-option";
import { Step, Stepper } from "@/components/booking/step";
import { TimeSlot, TimeSlotGroup } from "@/components/booking/time-slot";
import {
  IconCalendar,
  IconClinic,
  IconHome,
  IconUser,
  IconVideo,
} from "@/components/icons";
import { RadioGroup } from "radix-ui";

const TODAY = new Date(2026, 9, 18);
const MONTH = new Date(2026, 9, 1);
// Dias sem horário livre (fins de semana e alguns dias úteis)
const isAvailable = (d: Date) =>
  d.getDay() !== 0 && d.getDay() !== 6 && ![21, 22, 28].includes(d.getDate());

const Caption = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 text-body-sm text-on-surface-variant">{children}</p>
);

const Block = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-headline-md text-primary">{title}</h3>
    {children}
  </div>
);

export function BookingSection() {
  const [service, setService] = React.useState("video");
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2026, 9, 20),
  );
  const [time, setTime] = React.useState<string | undefined>("10:00");

  return (
    <section aria-labelledby="ds-booking" className="flex flex-col gap-12">
      <h2 id="ds-booking" className="text-headline-lg text-primary">
        Agendamento
      </h2>

      <Block title="Opção de atendimento">
        <p id="ds-service-label" className="text-body-md">
          Escolha como prefere ser atendido
        </p>
        <ServiceOptionGroup
          aria-labelledby="ds-service-label"
          value={service}
          onValueChange={setService}
          className="max-w-2xl"
        >
          <ServiceOption
            value="casa"
            icon={<IconHome />}
            title="Na sua casa"
            description="O médico vai até você."
            price="R$ 000"
          />
          <ServiceOption
            value="video"
            icon={<IconVideo />}
            title="Por vídeo (telemedicina)"
            description="Consulta online, de onde você estiver."
            price="R$ 000"
          />
          <ServiceOption
            value="clinica"
            icon={<IconClinic />}
            title="No consultório"
            description="Atendimento presencial na clínica."
            price="R$ 000"
          />
        </ServiceOptionGroup>
        <Caption>
          Normal, Selecionada (borda de 2px, selo azul) e Foco (use a tecla Tab
          e as setas).
        </Caption>
      </Block>

      <Block title="Dia do calendário">
        <div className="grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <Caption>Disponível</Caption>
            <CalendarDay date={new Date(2026, 9, 20)} status="available" />
          </div>
          <div>
            <Caption>Sem horário</Caption>
            <CalendarDay date={new Date(2026, 9, 21)} status="full" />
          </div>
          <div>
            <Caption>Passado</Caption>
            <CalendarDay date={new Date(2026, 9, 12)} status="past" />
          </div>
          <div>
            <Caption>Hoje</Caption>
            <CalendarDay date={TODAY} status="available" isToday />
          </div>
          <div>
            <Caption>Selecionado</Caption>
            <CalendarDay
              date={new Date(2026, 9, 23)}
              status="available"
              selected
            />
          </div>
          <div>
            <Caption>Foco (Tab)</Caption>
            <CalendarDay date={new Date(2026, 9, 26)} status="available" />
          </div>
          <div>
            <Caption>Vazio</Caption>
            <CalendarDayEmpty />
          </div>
        </div>
        <Caption>
          Calendário interativo: outubro de 2026 (hoje é 18). Use as setas, Home
          e End.
        </Caption>
        <BookingCalendar
          className="max-w-3xl"
          month={MONTH}
          today={TODAY}
          isAvailable={isAvailable}
          selected={date}
          onSelect={setDate}
        />
      </Block>

      <Block title="Horário">
        <div className="grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          <RadioGroup.Root
            aria-label="Exemplos de estados"
            defaultValue="11:00"
            className="contents"
          >
            <div>
              <Caption>Livre</Caption>
              <TimeSlot value="09:00" />
            </div>
            <div>
              <Caption>Ocupado</Caption>
              <TimeSlot value="09:30" busy />
            </div>
            <div>
              <Caption>Selecionado</Caption>
              <TimeSlot value="11:00" />
            </div>
            <div>
              <Caption>Foco (Tab)</Caption>
              <TimeSlot value="11:30" />
            </div>
          </RadioGroup.Root>
        </div>
        <div className="flex max-w-3xl flex-col gap-6">
          <TimeSlotGroup
            period="Manhã"
            value={time}
            onValueChange={setTime}
            slots={[
              { time: "08:00" },
              { time: "09:00", busy: true },
              { time: "10:00" },
              { time: "11:00", busy: true },
            ]}
          />
          <TimeSlotGroup
            period="Tarde"
            value={time}
            onValueChange={setTime}
            slots={[
              { time: "14:00" },
              { time: "15:00" },
              { time: "16:00", busy: true },
              { time: "17:00" },
            ]}
          />
        </div>
      </Block>

      <Block title="Etapa">
        <Stepper aria-label="Etapas do agendamento">
          <Step status="done" title="Atendimento" icon={<IconUser />} />
          <Step
            status="current"
            title="Data e horário"
            icon={<IconCalendar />}
          />
          <Step status="upcoming" title="Seus dados" icon={<IconUser />} />
        </Stepper>
        <Caption>Concluída, Atual e Futura.</Caption>
      </Block>
    </section>
  );
}
