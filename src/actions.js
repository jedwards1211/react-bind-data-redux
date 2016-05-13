/* @flow */

import snakeCase from 'lodash.snakecase'

import type {Action} from './flowtypes/reduxTypes'

export function setField(path: any[],
  newValue: any,
  options?: {
    meta?: Object,
    actionTypePrefix?: string,
  } = {}): Action
{
  if (path.length < 1) throw new Error('path must not be empty')

  let {meta, actionTypePrefix} = options
  let type = 'SET_' + path.filter(p => typeof p !== 'number')
      // flow-issue(react-bind-data-redux)
    .map(p => typeof p === 'symbol'
      ? snakeCase(p).substring(7)
      : snakeCase(p))
    .join('.')
    .toUpperCase()
  if (actionTypePrefix) type = actionTypePrefix + type

  const result: Action = {
    type,
    payload: newValue,
    meta: Object.assign({bindDataPath: path}, meta)
  }
  if (newValue instanceof Error) result.error = true
  return result
}
