export default function happypillz(ctx) {
  ctx.tone = 'bright';
  ctx.energy = (ctx.energy || 0) + 1;
  return ctx;
}
