import 'babel-polyfill'
import {setField} from '../src/actions'

describe('actions.setField', () => {
  it('creates action type from path correctly', () => {
    expect(setField(['helloWorld', 2, Symbol('someSymbol')], 3).type).toBe('SET_HELLO_WORLD.SOME_SYMBOL')
  })
  it('puts newValue arg in payload', () => {
    expect(setField(['path'], 3).payload).toBe(3)
  })
  it('puts path arg in meta', () => {
    expect(setField(['path'], 3).meta.bindDataPath).toEqual(['path'])
  })
  it('adds error flag if newValue is an error', () => {
    expect(setField(['path'], new Error()).error).toBe(true)
  })
  it('throws if path is empty', () => {
    expect(() => setField([], 'blah')).toThrow()
  })
  it('prepends actionTypePrefix if given', () => {
    expect(setField(['field'], 3, {actionTypePrefix: 'MY_COMP.'}).type).toBe('MY_COMP.SET_FIELD')
  })
  it('puts reduxPath in meta if given', () => {
    expect(setField(['field'], 3, {reduxPath: ['reduxPath']}).meta.reduxPath).toEqual(['reduxPath'])
  })
})
