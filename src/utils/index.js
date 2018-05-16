function Pixel({
  x,
  y,
  fill
}) {
  return `<rect x="${x}" y="${y}" width="${1}" height="${1}" fill="${fill}" ></rect>`
}

export {
  Pixel
}
