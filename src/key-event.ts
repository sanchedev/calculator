import { textBox } from './state.js'

const textBoxContainer = textBox.parentNode as HTMLElement
textBoxContainer.addEventListener('click', () => {
  textBoxContainer.focus()
})

textBoxContainer.addEventListener('keydown', (ev) => {
  let element: HTMLElement | null = null

  if (ev.key === 'Enter') {
    element = document.querySelector<HTMLButtonElement>('[data-key="="]')
  } else {
    element = document.querySelector<HTMLButtonElement>(
      '[data-key="' + ev.key.toLowerCase() + '"]',
    )
  }

  if (element == null) return

  ev.preventDefault()

  element.click()
})
