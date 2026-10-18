"use client"

import { FormField } from "@/components/form-field"
import { IconCalendar } from "@/components/icons"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CheckboxField } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioField, RadioGroup } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

const variants = [
  { variant: "default", name: "Primário", icon: <IconCalendar aria-hidden="true" />, label: "Agendar consulta" },
  { variant: "secondary", name: "Secundário", icon: <IconCalendar aria-hidden="true" />, label: "Ver horários" },
  { variant: "whatsapp", name: "WhatsApp", icon: <WhatsAppIcon />, label: "Chamar no WhatsApp" },
  { variant: "light", name: "Claro sobre fundo escuro", icon: <IconCalendar aria-hidden="true" />, label: "Agendar consulta" },
] as const

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-body-sm text-on-surface-variant">{children}</p>
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-headline-md text-primary">{title}</h3>
      {children}
    </div>
  )
}

/* Vitrine dos controles: cada variante × cada estado. Foco e hover: use o teclado e o mouse. */
export function ControlsSection() {
  return (
    <section className="flex flex-col gap-12" aria-labelledby="controles">
      <h2 id="controles" className="text-headline-lg text-primary">
        Controles
      </h2>

      <Block title="Botões">
        <p className="text-body-md text-on-surface-variant">
          Passe o mouse, clique e use Tab para ver hover, pressionado e foco reais.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {variants.map((v) => {
            const dark = v.variant === "light"
            return (
              <div
                key={v.variant}
                className={dark ? "rounded bg-footer p-6 text-on-footer-muted" : "p-6"}
              >
                <p className="mb-4 text-label-lg">{v.name}</p>
                <div className="flex flex-wrap items-end gap-4">
                  <div>
                    <Caption>Padrão</Caption>
                    <Button variant={v.variant} icon={v.icon}>{v.label}</Button>
                  </div>
                  <div>
                    <Caption>Desativado</Caption>
                    <Button variant={v.variant} icon={v.icon} disabled>{v.label}</Button>
                  </div>
                  <div>
                    <Caption>Carregando</Caption>
                    <Button variant={v.variant} icon={v.icon} loading>{v.label}</Button>
                  </div>
                  <div>
                    <Caption>Carregando (sem ícone)</Caption>
                    <Button variant={v.variant} loading>{v.label}</Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div>
          <Caption>Somente ícone (56 × 56) e como link (asChild)</Caption>
          <div className="flex flex-wrap gap-4">
            <Button size="icon" aria-label="Agendar"><IconCalendar aria-hidden="true" /></Button>
            <Button asChild variant="secondary">
              <a href="#controles">Ir para o início da seção</a>
            </Button>
          </div>
        </div>
      </Block>

      <Block title="Campos de texto">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Caption>Vazio, com ajuda</Caption>
            <FormField label="Nome completo" id="ds-nome" hint="Como está no seu documento.">
              {(p) => <Input placeholder="Digite seu nome" autoComplete="off" {...p} />}
            </FormField>
          </div>
          <div>
            <Caption>Preenchido, opcional</Caption>
            <FormField label="Telefone" id="ds-tel" optional>
              {(p) => <Input defaultValue="(11) 91234-5678" {...p} />}
            </FormField>
          </div>
          <div>
            <Caption>Erro</Caption>
            <FormField label="E-mail" id="ds-email" error="Confira o e-mail: faltou o @.">
              {(p) => <Input defaultValue="maria.gmail.com" {...p} />}
            </FormField>
          </div>
          <div>
            <Caption>Desativado</Caption>
            <FormField label="Convênio" id="ds-conv">
              {(p) => <Input defaultValue="Particular" disabled {...p} />}
            </FormField>
          </div>
          <div>
            <Caption>Texto longo, vazio</Caption>
            <FormField label="Mensagem" id="ds-msg" hint="Conte o motivo da consulta.">
              {(p) => <Textarea placeholder="Escreva aqui" {...p} />}
            </FormField>
          </div>
          <div>
            <Caption>Texto longo, erro</Caption>
            <FormField label="Observações" id="ds-obs" error="Escreva pelo menos uma frase.">
              {(p) => <Textarea {...p} />}
            </FormField>
          </div>
          <div>
            <Caption>Texto longo, desativado</Caption>
            <FormField label="Histórico" id="ds-hist">
              {(p) => <Textarea defaultValue="Campo bloqueado para edição." disabled {...p} />}
            </FormField>
          </div>
        </div>
      </Block>

      <Block title="Caixa de seleção e opções">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Caption>Caixa de seleção: desmarcada, marcada, desativada</Caption>
            <CheckboxField id="ds-c1" label="Aceito o uso dos meus dados para o agendamento" />
            <CheckboxField id="ds-c2" label="Quero receber lembretes por WhatsApp" defaultChecked />
            <CheckboxField id="ds-c3" label="Opção indisponível" disabled />
            <CheckboxField id="ds-c4" label="Opção indisponível marcada" disabled defaultChecked />
          </div>
          <div>
            <Caption>Opções (rádio): nenhuma marcada, marcada, desativada</Caption>
            <RadioGroup aria-label="Exemplo sem seleção">
              <RadioField id="ds-r1" value="a" label="Presencial" />
              <RadioField id="ds-r2" value="b" label="Por vídeo" />
            </RadioGroup>
            <RadioGroup defaultValue="x" aria-label="Exemplo com seleção" className="mt-4">
              <RadioField id="ds-r3" value="x" label="Marcada" />
              <RadioField id="ds-r4" value="y" label="Desativada" disabled />
            </RadioGroup>
          </div>
        </div>
      </Block>

      <Block title="Acordeão">
        <Caption>Um item aberto e outros fechados. Use Tab e Enter/Espaço.</Caption>
        <Accordion type="single" collapsible defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>Preciso levar algum documento?</AccordionTrigger>
            <AccordionContent>
              Leve um documento com foto e a carteirinha do convênio, se tiver.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Como remarco minha consulta?</AccordionTrigger>
            <AccordionContent>Fale conosco pelo WhatsApp ou por telefone.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Block>
    </section>
  )
}
