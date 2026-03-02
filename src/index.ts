import { setupAction, setupNumbers } from './setups.js'
import { calc, render } from './state.js'
import './key-event.js'

const buttons = document.querySelectorAll<HTMLButtonElement>('button')

buttons.forEach((b) => {
  if (b.classList.contains('num')) {
    if (b.dataset.action === '.') setupAction(b)
    else setupNumbers(b)
    return
  }
  if (b.classList.contains('equ')) {
    b.addEventListener('click', () => {
      calc()
      render()
    })
    return
  }
  setupAction(b)
})

render()
