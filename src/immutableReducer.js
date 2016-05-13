/* @flow */

export default function bindDataImmutableReducer(state: mixed, action: mixed): mixed {
  if (state instanceof Object && action instanceof Object && action.meta && action.meta.bindDataPath instanceof Array) {
    let {payload, meta: {reduxPath, bindDataPath}} = action
    return state.setIn([...(reduxPath || []), ...bindDataPath], payload)
  }
  return state
}
