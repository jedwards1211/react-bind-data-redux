import React, {Component, PropTypes} from 'react'
import * as Immutable from 'immutable'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {mount} from 'enzyme'

import BindData from 'react-bind-data'
import {immutableReducer, dispatchFieldChanges} from '../src/index'

class TestForm extends Component {
  static propTypes = {
    data: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  onFieldChange = (...args) => {
    const {dispatch} = this.props
    dispatchFieldChanges(dispatch, {meta: {reduxPath: ['user']}})(...args)
  };
  render() {
    const {data} = this.props
    return (
      <BindData data={data} onFieldChange={this.onFieldChange}>
        <div name="name">
          <input type="text" name="first" />
          <input type="text" name="last" />
        </div>
      </BindData>
    )
  }
}

const ReduxTestForm = connect(state => ({data: state.get('user').toJS()}))(TestForm)

describe('integration test', () => {
  it('works', () => {
    const store = createStore(immutableReducer, Immutable.fromJS({
      user: {
        name: {
          first: 'Andy',
          last: 'Edwards'
        }
      }
    }))

    const comp = mount(
      <Provider store={store}>
        <ReduxTestForm />
      </Provider>
    )
    let firstName = comp.find({name: 'first'})
    let lastName  = comp.find({name: 'last' })

    expect(firstName.prop('value')).toBe('Andy')
    expect(lastName.prop('value')).toBe('Edwards')
    firstName.simulate('change', {target: {value: 'James'}})
    lastName .simulate('change', {target: {value: 'Bond'}})
    expect(firstName.prop('value')).toBe('James')
    expect(lastName.prop('value')).toBe('Bond')
  })
})
