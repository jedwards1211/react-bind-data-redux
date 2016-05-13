import {Map, fromJS, is} from 'immutable'

import immutableReducer from '../src/immutableReducer'
import pojoReducer from '../src/pojoReducer'
import {setField} from '../src/actions'

describe('reducer', () => {
  describe('on immutables', () => {
    beforeEach(function () {
      jasmine.addMatchers({
        is: (util) => ({
          compare(actual, expected) {
            let result = {}
            result.pass = is(actual, expected)
            if (result.pass) {
              result.message = `expected immutable
${JSON.stringify(actual.toJS(), null, 2)}
not to equal immutable
${JSON.stringify(expected.toJS(), null, 2)}
`
            }
            else {
              result.message = `expected immutable
${JSON.stringify(actual.toJS(), null, 2)}
to equal immutable
${JSON.stringify(expected.toJS(), null, 2)}
`
            }
            return result
          }
        })
      })
    })

    it('works for basic case', () => {
      expect(immutableReducer(Map(), setField(['hello', 'world'], 'test'))).is(fromJS({
        hello: {
          world: 'test'
        }
      }))
    })
    it('works when reduxPath is given', () => {
      expect(immutableReducer(Map(), setField(['world'], 'test', {meta: {reduxPath: ['hello']}}))).is(fromJS({
        hello: {
          world: 'test'
        }
      }))
    })
  })
  describe('on pojos', () => {
    it('works for basic case', () => {
      expect(pojoReducer({}, setField(['hello', 'world'], 'test'))).toEqual({
        hello: {
          world: 'test'
        }
      })
    })
    it('works when reduxPath is given', () => {
      expect(pojoReducer({}, setField(['world'], 'test', {meta: {reduxPath: ['hello']}}))).toEqual({
        hello: {
          world: 'test'
        }
      })
    })
  })
  describe('on others', () => {
    it('returns value', () => {
      expect(immutableReducer('string', setField(['world', 'test']))).toEqual('string')
      expect(immutableReducer(24, setField(['world', 'test']))).toEqual(24)
      expect(immutableReducer(null, setField(['world', 'test']))).toEqual(null)
      expect(immutableReducer(undefined, setField(['world', 'test']))).toEqual(undefined)
      expect(pojoReducer('string', setField(['world', 'test']))).toEqual('string')
      expect(pojoReducer(24, setField(['world', 'test']))).toEqual(24)
      expect(pojoReducer(null, setField(['world', 'test']))).toEqual(null)
      expect(pojoReducer(undefined, setField(['world', 'test']))).toEqual(undefined)
    })
  })
})
