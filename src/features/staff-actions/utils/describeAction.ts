import {
  ACTION_TEXTS,
  STAFF_ACTIONS_CONTENT,
} from '../data/staffActionsContent'
import type { StaffAction } from '../services/staffActionsApi'

const SIGN_IN = 'POST /api/auth/sign-in/email'
const FORBIDDEN = 403

/**
 * done: it went through; rejected: a refused sign-in; refused: the API said no to anything else
 * (a conflict, a wrong current password); denied: no permission.
 */
export type ActionOutcome = 'done' | 'rejected' | 'refused' | 'denied'

export interface DescribedAction {
  text: string
  outcome: ActionOutcome
}

/** The name of an account or a city the screen already knows, by its id. */
export type TargetNames = ReadonlyMap<string, string>

const outcomeOf = ({
  action,
  succeeded,
  statusCode,
}: StaffAction): ActionOutcome => {
  if (succeeded) return 'done'
  if (statusCode === FORBIDDEN) return 'denied'
  return action === SIGN_IN ? 'rejected' : 'refused'
}

const textOf = (action: StaffAction, names: TargetNames) => {
  // A refused sign-in is logged under the account someone tried, not under whoever tried it.
  if (action.action === SIGN_IN && !action.succeeded)
    return STAFF_ACTIONS_CONTENT.signInRefused
  const describe = ACTION_TEXTS[action.action]
  if (describe) {
    return describe(action.targetId && names.get(action.targetId))
  }
  // Reads only reach the log when they are denied.
  return action.action.startsWith('GET ')
    ? STAFF_ACTIONS_CONTENT.deniedRead
    : STAFF_ACTIONS_CONTENT.unknownAction
}

export const describeAction = (
  action: StaffAction,
  names: TargetNames
): DescribedAction => ({
  text: textOf(action, names),
  outcome: outcomeOf(action),
})
