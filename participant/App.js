import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { fetchContents } from './actions'

import Pages from './Pages'

const mapStateToProps = ({ loading, active }) => ({
  loading,
  active
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    const { loading, active } = this.props
    if (loading) {
      return (
	<Card style={{padding: '20px'}}>
		<CardTitle title="接続中" style={{padding: '0px', marginTop: '7px', marginBottom: '14px'}}/>
		<CardText style={{padding: '0px', margin: '0px'}}>
			<div style={{textAlign: 'center'}}>
				<CircularProgress style={{margin: '0px', padding: '0px' }} />
			</div>
    　　　		<p style={{margin: '0px', padding: '0px'}}>サーバーに接続しています。<br/>このまましばらくお待ちください。</p>
		</CardText>
	</Card>
      )
    } else if(active) {
      return (
        <div>
          <Pages />
        </div>
      )
    } else {
      return (
        <div>
          <p>この実験の受け付けは終了しました。</p>
          <p>次の実験をお待ちください。</p>
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
