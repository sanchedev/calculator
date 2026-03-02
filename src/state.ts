import { operation } from './operation.js'
import type { CalcState } from './types.js'

export const calcState: CalcState = {
  firstNum: '0',
  operator: null,
  secondNum: null,
}

const textBox = document.querySelector<HTMLDivElement>('#textbox')!

if (textBox == null) throw new Error('Error')

export { textBox }

const parseNumber = (num: string, length: number = 4) => {
  if (num.length <= length) return num
  return num.slice(0, length - 1) + '…'
}

const MAX_LENGTH = 11

function parseState(maxLength: number = MAX_LENGTH) {
  const firstNum = calcState.firstNum
  const operator = calcState.operator
  const secondNum = calcState.secondNum

  if (operator == null) return parseNumber(firstNum, maxLength)
  if (secondNum == null)
    return `${parseNumber(firstNum, maxLength - 2)} ${operator}`
  const firstNumLength = Math.max(
    Math.min(4, firstNum.length),
    maxLength - (3 + secondNum.length),
  )
  const secondNumLength = maxLength - (3 + firstNumLength)

  return `${parseNumber(firstNum, firstNumLength)} ${operator} ${parseNumber(secondNum, secondNumLength)}`
}
/** Función que renderiza el estado de la calculadora a un texto usado en el nodo `#textbox` en el DOM. */
export function render() {
  textBox.innerText = parseState()
  textBox.ariaLabel = parseState(Infinity)
}

/** Función que calcula con base a los números del estado un número resultado que reemplazará al primer número en este. Además limpiará el estado para próximas operaciones. */
export function calc() {
  // Si no hay operador
  // no debe haber un segundo número
  if (calcState.operator == null) {
    calcState.secondNum = null
    return
  }
  // Si no hay segundo número
  // se limpiará el operador
  if (calcState.secondNum == null) {
    calcState.operator = null
    return
  }

  // Se transforman los números que son `string`s
  // a `number`
  const first = Number(calcState.firstNum)
  const second = Number(calcState.secondNum)

  // Se realiza la operación
  const result = operation(first, second, calcState.operator)

  // Se pone un límite de 4 decimales
  const parsedResult = Math.round(result * 1000) / 1000

  // Se transforma el número a `string`
  const stringResult = parsedResult.toString()

  // Se limpia el estado
  // Se establece el resultado en el
  // primer número del estado
  calcState.firstNum = stringResult
  calcState.operator = null
  calcState.secondNum = null
}
