import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'joined': (_, { payload }) => ({ joined: payload }),
    'next question': (_, { payload }) => {switch (payload.next){
 case "question2": return { sequence: payload.next, question1: payload.selected}
 case "question3": return { sequence: payload.next, question2: payload.selected}
 default: return { sequence: payload.next, question3: payload.selected}}},
    'reset': (_, { payload }) => ( { sequence: payload.sequence, question1: payload.question1, question2: payload.question2, question3: payload.question3, active: payload.active, qswap: payload.qswap, question_text: payload.question_text }),
    'result': (_, { payload: {oneone, onetwo, twoone, twotwo} }) => ({
      oneone: oneone, onetwo: onetwo, twoone: twoone, twotwo: twotwo }),
    'qupdate': (_, { payload }) => ({ question_text: payload }),
  }),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer