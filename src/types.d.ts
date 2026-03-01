import type { Operator } from './enums'

export interface CalcState {
  firstNum: string
  operator: Operator | null
  secondNum: string | null
}
