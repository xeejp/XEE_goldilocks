import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'
import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import PageButtons from './PageButtons'
import EditQuestion from './EditQuestion'
import DownloadButton from './DownloadButton'
import Users from './Users'

import Chart from 'components/Chart'

const mapStateToProps = ({loading, page, participants}) => ({
  loading, page, participants
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
    const { loading, page, participants } = this.props
    var ans = [[0, 0], [0, 0]]
    if(participants != undefined){
      for(var i in participants) {
        if(participants[i].question2 != 0){
          ans[participants[i].question1 - 1][participants[i].question2 - 1]++
        }
      }
    }
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
    } else {
      return (
        <div>
          <PageButtons />
          <Divider
            style={{
              marginTop: "5%",
              marginBottom: "5%"
            }}
          />
          <Users /><br />
         <Chart oneone={ans[0][0]} onetwo={ans[0][1]} twoone={ans[1][0]} twotwo={ans[1][1]} expanded={false} /><br />
          <EditQuestion />
          <DownloadButton style={{marginLeft: '2%'}} disabled={page != "result"} />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)