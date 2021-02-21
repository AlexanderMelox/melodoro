import { KUMBH_SANS, ROBOTO_SLAB, SPACE_MONO } from '../constants'

export const minutesToMilliseconds = (minutes) => {
  const oneMinuteInMilliseconds = 60000
  return minutes * oneMinuteInMilliseconds
}

export const formatTime = (milliseconds) => {
  const oneMinuteInMilliseconds = 60000
  const minutes = Math.floor(milliseconds / oneMinuteInMilliseconds)
  const seconds = ((milliseconds % oneMinuteInMilliseconds) / 1000).toFixed(0)

  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

  return formattedTime
}

export const fontTypeToCSSFontFamily = (font) => {
  const fontMap = {
    [KUMBH_SANS]: `'Kumbh sans', sans-serif`,
    [ROBOTO_SLAB]: `'Roboto Slab', serif`,
    [SPACE_MONO]: `'Space Mono', monospace`,
  }
  return fontMap[font]
}
