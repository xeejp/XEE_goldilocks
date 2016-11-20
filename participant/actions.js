import { createAction } from 'redux-actions'

export const fetchContents = createAction('fetch contents')
export const nextQuestion  = createAction('change question', (selected) => ({ selected }))