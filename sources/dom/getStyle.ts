function getStyle(el: Element, attr: string, pseudoElt?: string | null | undefined): string {
    const val: any = getComputedStyle(el, pseudoElt)
    return val[attr]
}
export default getStyle
