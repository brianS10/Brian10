export function generarLinkWhatsApp(nombrePerfume: string): string {
  const numero = "525510244418"; // +52 México
  const mensaje = encodeURIComponent(
    `Hola! Me interesa el perfume *${nombrePerfume}*. ¿Me puedes dar más información y el precio?`
  );
  return `https://wa.me/${numero}?text=${mensaje}`;
}
