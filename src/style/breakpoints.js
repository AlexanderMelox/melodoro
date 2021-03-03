const emify = (px) => px / 16

export const tabletEm = emify(768)
export const desktopEm = emify(1440)

export const media = {
  tablet: `(min-width: ${tabletEm}em)`,
  desktop: `(min-width: ${desktopEm}em)`,
}

export const breakpoints = {
  tablet: `@media only screen and ${media.tablet} `,
  desktop: `@media only screen and  ${media.desktop}`,
}
