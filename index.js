import { fromEvent, switchMap, takeUntil, map, interval } from './operators.js'
const output = document.getElementById('output')
const log = (value) => output.innerText ='\n' + value

fromEvent(document.body, 'mousedown')
    .pipeThrough(
        switchMap(mouseDownEvent =>
            fromEvent(document.body, 'mousemove')
                .pipeThrough(
                    takeUntil(
                        fromEvent(document.body, 'mouseup')
                    )
                ),
            { pairwise: true }
        )
    )
    .pipeThrough(
        map(([mouseDown, mouseMove]) => {
            return {
                from: mouseDown.clientX,
                to: mouseMove.clientX
            }
        })
    )
    .pipeTo(
        new WritableStream({
            write({ from, to }) {
                log(
                    `you moved your mouse from ${from} to ${to}`
                )
            }
        })
    )

// interval(200)
//     .pipeThrough(
//         takeUntil(
//             fromEvent(document.body, 'click')
//         )
//     )
//     .pipeThrough(
//         map(function (time) {
//             this.counter = this.counter ?? 0
//             return ++this.counter
//         })
//     )
//     .pipeTo(
//         new WritableStream({
//             write(counter) {
//                 log(counter)
//             }
//         })
//     )




// fromEvent(document.body, 'mousedown')
//     .pipeThrough(
//         switchMap(mouseDownEvent =>
//             fromEvent(document.body, 'mousemove')
//             .pipeThrough(
//                 takeUntil(
//                     fromEvent(document.body, 'mouseup')
//                 )
//             ),
//             { pairwise: true }
//         )
//     )
//     .pipeTo(
//         new WritableStream({
//             write([mouseDown, mouseMove]) {
//                 log(
//                     `you moved your mouse from ${mouseDown.clientX} to ${mouseMove.clientX}`
//                 )
//             }
//         })
//     )

// fromEvent(document.body, 'mousedown')
//     .pipeThrough(
//         switchMap(mouseDownEvent =>
//             fromEvent(document.body, 'mousemove'),
//             { pairwise: true }
//         )
//     )
//     .pipeTo(
//         new WritableStream({
//             write([mouseDown, mouseMove]) {
//                 log(
//                     `you moved your mouse from ${mouseDown.clientX} to ${mouseMove.clientX}`
//                 )
//             }
//         })
//     )

// fromEvent(document.body, 'mousedown')
//     .pipeTo(
//         new WritableStream({
//             write(data) {
//                 log('mousedown', data.clientX, data.clientY)
//             }
//         })
//     )

// fromEvent(document.body, 'mousedown')
//     .pipe(
//         switchMap(() => {
//             return fromEvent(document.body, 'mousemove')
//                 .pipe(
//                     takeUntil(fromEvent(document.body, 'mouseup')),
//                     pairwise()
//                 )
//         })
//     )
//     .pipe(
//         map(([mouseDown, mouseMove]) => {
//             return { from: mouseDown.clientX, to: mouseMove.clientX }
//         })
//     )
//     .subscribe(e =>
//         log(`you held the mouse click from ${e.from} to ${e.to}`)
//     )

// fromEvent(document.body, 'click')
//     .pipe(
//         map(e =>
//             ({ x: e.clientX, y: e.clientY })
//         )
//     )
//     .subscribe(e =>
//         log(`you clicked here: X: ${e.x}, Y: ${e.y}`)
//     )



// let _drawing, _lastPosition, _currentPos;

// document.body.addEventListener("mousedown", (e) => {
//     _drawing = true;
//     _lastPosition = { x: e.clientX, y: e.clientY }
// });

// document.body.addEventListener("mouseup", (e) => {
//     _drawing = false;
// });

// document.body.addEventListener("mousemove", (e) => {
//     _currentPos = { x: e.clientX, y: e.clientY }
// });
// setInterval(() => {
//     if (!_drawing) return
//     log(`you held the mouse click from
//         ${_lastPosition.x} to ${_currentPos.x}`)
// }, 100)


