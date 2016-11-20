import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'

const mapStateToProps = ({ participants, question_text }) => ({
  participants, question_text
})

const DownloadButton = ({ participants, question_text, style, disabled }) => (
  <FloatingActionButton
  style={style}
  disabled={disabled}
  onClick={() => {
    var fileName = "goldilocks.csv"

    var content
      = "ゴルディロックス効果\n"
      + "実験日," + new Date() + "\n"
      + "登録者数," + Object.keys(participants).length + "\n"
      + "ID,1問目の回答,2問目の回答,3問目の回答\n"
      + Object.keys(participants).map(id => [id, (participants[id].question1 != 0)? question_text["question1"].title[participants[id].question1 - 1] : "未回答",
        (participants[id].question2 != 0)? question_text["question2"].title[participants[id].question2 - 1] : "未回答",
        (participants[id].question3 != 0)? question_text["question3"].title[participants[id].question3 - 1] : "未回答"].join(',')).join("\n")

    var blob = new Blob([content]);
    var url = window.URL || window.webkitURL;
    var blobURL = url.createObjectURL(blob);

    if(window.navigator.msSaveBlob){
      window.navigator.msSaveBlob(blob, fileName)
    }
    else{
      var a = document.createElement('a');
      a.download = fileName;
      a.href = blobURL;
      a.click();
    }
  }
  }
  ><FileFileDownload /></FloatingActionButton>
)

export default connect(mapStateToProps)(DownloadButton)
