// tslint:disable-next-line: only-arrow-functions
const scrollLock = function () {
    let lastY: number = 0
    const node: HTMLBodyElement | null = document.querySelector('body')
    if (node) {
        // tslint:disable-next-line: only-arrow-functions
        const scrollStart = function (event: any) {
            lastY = event.changedTouches[0].clientY
        }
        // tslint:disable-next-line: only-arrow-functions
        const scrollMove = function (event: any) {
            const y: number = event.changedTouches[0].clientY
            const st: number = node.scrollTop
            if (st === 0 && y >= lastY) {
                event.preventDefault()
            }
        }
        node.addEventListener('touchstart', scrollStart, { passive: false })
        node.addEventListener('touchmove', scrollMove, { passive: false })
    }
}

export default scrollLock
