// Verifica que cn() preserva tokens de tipografia junto de cores de texto.
// Uso: node scripts/check-cn.mjs
import assert from "node:assert/strict"
import { createCn } from "cn/config"

const tokens = ["display","display-mobile","headline-lg","headline-lg-mobile","headline-md","headline-md-mobile","body-lg","body-md","body-sm","label-lg","label-md"]
const cn = createCn({
  extend: { classGroups: { "font-size": [{ text: tokens }], shadow: [{ shadow: ["ambient"] }] } },
})

const colors = ["primary","on-primary","on-surface","on-surface-variant","placeholder","footer","on-footer-muted","secondary","error","on-disabled"]
for (const t of tokens) for (const c of colors) {
  const out = cn(`text-${t} text-${c}`).split(" ").sort().join(" ")
  assert.equal(out, [`text-${t}`, `text-${c}`].sort().join(" "), `${t} + ${c} -> ${out}`)
}
// tamanho mais recente vence; cor mais recente vence
assert.equal(cn("text-body-md text-label-lg"), "text-label-lg")
assert.equal(cn("text-primary text-on-surface"), "text-on-surface")
// sombra customizada convive com cor de sombra/ring e substitui outra sombra
assert.equal(cn("shadow-sm shadow-ambient"), "shadow-ambient")
console.log("check-cn: ok")
