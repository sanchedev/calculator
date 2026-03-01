import { Operator } from './enums.js'

export function operation(
  first: number,
  second: number,
  operator: Operator,
): number {
  switch (operator) {
    case Operator.ADD:
      return first + second
    case Operator.SUBTRACT:
      return first - second
    case Operator.MULTIPLY:
      return first * second
    case Operator.DIVIDE:
      return first / second
    default:
      return 0
  }
}
