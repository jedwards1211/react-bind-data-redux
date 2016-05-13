/* @flow */

import set from 'lodash.set'

export default function bindDataPojoReducer(state: mixed, action: mixed): mixed {
  if (!state) return state
  if (action instanceof Object && action.meta && action.meta.bindDataPath instanceof Array) {
    let {payload, meta: {reduxPath, bindDataPath}} = action
    return set(state, [...reduxPath || [], ...bindDataPath], payload)
  }
  return state
}
