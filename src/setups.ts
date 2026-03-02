import { Operator } from './enums.js'
import { calc, calcState, render } from './state.js'

/** Hace la configuración inicial para los botones anclados a los números [0-9] */
export function setupNumbers(button: HTMLButtonElement) {
  // Obtiene el numero de data-action
  const num = Number(button.dataset.action)

  button.addEventListener('click', () => {
    // Si el número actual es 0, NaN o Infinity
    //   se reemplazará por el número pulsado
    // Sino
    //   el número pulsado se agregará al final
    uniaction((n) => {
      if (n === '0') return num.toString()
      if (n === 'NaN') return num.toString()
      if (n === 'Infinity') return num.toString()
      if (n === '-Infinity') return num.toString()
      return n + num
    })
    // Siempre que se modifique el estado
    // aparecerá esta función
    render()
  })
}

const operators = Object.values(Operator)
export function setupAction(button: HTMLButtonElement) {
  const action = button.dataset.action // Acción

  // Si no hay acción entonces se ignora el resto
  if (action == null) return

  // Si la acción está entre los operadores
  // entonces se configura como operador
  if (operators.includes(action as Operator)) {
    setupOperator(button, action as Operator)
    return
  }

  // Si no es un operador entonces tendrá
  // un trato más específico
  setupGeneralAction(button, action)
}

/** Hace la configuración inical de para los botones con función de operadores (+, -, × y ÷) */
export function setupOperator(button: HTMLButtonElement, operator: Operator) {
  button.addEventListener('click', () => {
    const n = Number(calcState.firstNum)

    if (isNaN(n) || !isFinite(n)) {
      // Si el primer número no es un número válido entonces se ignora el operador
      return
    }

    if (calcState.secondNum != null) {
      // Si el estado ya estaba lleno entonces
      // se va a calcular el resultado y se
      // limpia.
      calc()
    }
    // Se reemplaza el operador anterior con
    // el nuevo
    calcState.operator = operator
    // Se renderiza
    render()
  })
}

/** Hace la configuración inicial para los botones más específicos que no se pueden tratar en grupo. */
export function setupGeneralAction(button: HTMLButtonElement, action: string) {
  switch (action) {
    case 'C':
      button.addEventListener('click', () => {
        // Se limpia todo el estado
        calcState.firstNum = '0'
        calcState.operator = null
        calcState.secondNum = null
        render()
      })
      break
    case '±':
      button.addEventListener('click', () => {
        // Se cambia al número actual
        // Si es 0 no se modifica.
        // Si es negativo pasa a positivo
        // Si es positivo pasa a negativo
        uniaction((num) => {
          if (num === '0') return num
          if (num.startsWith('-')) {
            return num.slice(1)
          } else {
            return '-' + num
          }
        })
        render()
      })
      break
    case '%':
      button.addEventListener('click', () => {
        // Se divide el número actual entre 100
        uniaction((num) => {
          const number = Number(num)
          return (number / 100).toString()
        })
        render()
      })
      break
    case '.':
      button.addEventListener('click', () => {
        // Se modifica el número actual.
        // Si termina en . entonces se elimina
        // Si ya tiene un punto no se hace nada
        // Si no tiene punto se le añade al final
        uniaction((num) => {
          if (num.endsWith('.')) return num.slice(0, -1)
          if (num.includes('.')) return num
          return num + '.'
        })
        render()
      })
      break
    case 'b':
      button.addEventListener('click', () => {
        uniaction((num) => {
          if (num === '0') {
            calcState.operator = null
            return num
          }
          return num.slice(0, -1) || '0'
        })
        if (calcState.operator == null) {
          calcState.secondNum = null
        }
        if (calcState.secondNum === '0') {
          calcState.secondNum = null
        }
        render()
      })
      break
    default:
      break
  }
}

/** Es una función que recibe de parámetro una función transformadora, de entrada le va a llegar el primer número si no hay operador o el segundo número si es que si lo hay y con lo que la función devuelva se establecerá el número.
 *
 * El siguiente ejemplo muestra la función usada en la acción de pulsar un botón de número. Al presionarlo modificará el número **actual**.
 * @example
 * const num = Number(action) // número presionado
 * uniaction((n) => {
 *   if (n === '0') return num.toString()
 *   return n + num
 * })
 */
function uniaction(fun: (num: string) => string) {
  const parse = (num: string) => {
    const n = Number(calcState.firstNum)

    if (isNaN(n) || !isFinite(n)) {
      return '0'
    }

    return num
  }

  if (calcState.operator != null) {
    calcState.secondNum = fun(parse(calcState.secondNum ?? '0'))
  } else {
    calcState.firstNum = fun(parse(calcState.firstNum))
  }
}
