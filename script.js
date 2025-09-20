const WHATSAPP_NUMBER = "554498104219"; 
const PRODUCT_NAME = "Mel Puro Local";
const CITY = "Cidade Gaúcha — PR";
const PRICES = { "500g": 20.00, "1kg": 45.00 };

const money = n => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const encodeMsg = text => encodeURIComponent(text);
const buildWhatsappLink = msg => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMsg(msg)}`;

function buildOrderMessage(form){
  const size = form.size.value;
  const qty = parseInt(form.qty.value,10) || 1;
  const buyer = form.buyer.value.trim();
  const note = form.note.value.trim();
  const unit = PRICES[size] ?? 0;
  const total = unit * qty;

  let msg = `Olá, tudo bem? Quero pedir *${PRODUCT_NAME}*.\n\n`;
  msg += `• Tamanho: ${size}\n• Quantidade: ${qty}\n• Valor unitário: ${money(unit)}\n• Total: *${money(total)}*\n\n`;
  msg += `• Cidade de retirada: ${CITY}\n`;
  if(buyer) msg += `\n• Nome: ${buyer}\n`;
  if(note) msg += `• Observações: ${note}\n`;
  msg += "\nObrigado!";
  return msg;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const msg = buildOrderMessage(form);
    window.open(buildWhatsappLink(msg), "_blank");
  });

  const ano = document.getElementById("ano");
  if(ano) ano.textContent = new Date().getFullYear();
});
