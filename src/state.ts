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

/** Función que renderiza el estado de la calculadora a un texto usado en el nodo `#textbox` en el DOM. */
export function render() {
  // Se crea una variable que contendrá el texto
  let string = calcState.firstNum

  // Si hay operador se añade al texto
  if (calcState.operator != null) {
    string += ' ' + calcState.operator
  }

  // Si hay segundo número se añade al texto
  if (calcState.secondNum != null) {
    string += ' ' + calcState.secondNum
  }

  // Se reemplaza el texto interno de la
  // caja de texto con la variable de texto
  textBox.innerText = string
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
