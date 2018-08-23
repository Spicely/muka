const scrollLock = function () {
    let lastY: number = 0
    const node: HTMLBodyElement | null = document.querySelector('body')
    if (node) {
        const scrollStart = function (event: any) {
            lastY = event.changedTouches[0].clientY
        }
        const scrollMove = function (event: any) {
            let y: number = event.changedTouches[0].clientY
            let st: number = node.scrollTop
            if (st === 0 && y >= lastY) {
                event.preventDefault()
            }
        }
        node.addEventListener('touchstart', scrollStart, { passive: false })
        node.addEventListener('touchmove', scrollMove, { passive: false })
    }
}

export default scrollLock