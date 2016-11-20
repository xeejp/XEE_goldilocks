import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Chart from 'components/Chart'

const mapStateToProps = ({ oneone, onetwo, twoone, twotwo }) => ({
  oneone, onetwo, twoone, twotwo
})

const Result = ({ oneone, onetwo, twoone, twotwo }) => (
  <div>
    <Chart oneone={oneone} onetwo={onetwo} twoone={twoone} twotwo={twotwo} expanded={true} />
  </div>
)

export default connect(mapStateToProps)(Result)