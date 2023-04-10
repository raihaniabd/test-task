export interface Page {
  src: string,
  descriptions?: { x: number, y: number, text: string, isActive: boolean }[],
  images?: { x: number, y: number, src: string, isActive: boolean }[]
}
