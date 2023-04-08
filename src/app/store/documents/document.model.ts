export interface Page {
  src: string,
  descriptions?: { x: number, y: number, text: string }[],
  images?: { x: number, y: number, src: string }[]
}
