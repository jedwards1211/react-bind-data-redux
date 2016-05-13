/* @flow */

import type {Dispatch} from './flowtypes/reduxTypes'

import {setField} from './actions'

export default function dispatchFieldChanges(dispatch: Dispatch, options?: {meta?: Object, actionTypePrefix?: string})
  : (path: any[], newValue: any, options?: {actionTypePrefix?: string, meta?: Object}) => any
{
  return (path, newValue) => dispatch(setField(path, newValue, options))
}
