import { textBox } from './state.js'

const textBoxContainer = textBox.parentNode as HTMLElement
textBoxContainer.addEventListener('click', () => {
  textBoxContainer.focus()
})

textBoxContainer.addEventListener('keydown', (ev) => {
  ev.preventDefault()

  if (ev.key === 'Enter') {
    document.querySelector<HTMLButtonElement>('[data-key="="]')?.click()
    return
  }

  document
    .querySelector<HTMLButtonElement>(
      '[data-key="' + ev.key.toLowerCase() + '"]',
    )
    ?.click()
})
