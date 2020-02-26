import React from 'react';
import './App.css';
import axios from 'axios';

const ENDPOINT = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/radical?key=039b95f8-c753-495b-8af0-5bf5f110cde2';

// An audio reference URL should be in the following form: 
// https://media.merriam-webster.com/soundc11/[subdirectory]/[base filename].wav 
// where [base filename] equals the value of audio, and [subdirectory] is determined as follows:

// if audio begins with "bix", the subdirectory should be "bix",
// if audio begins with "gg", the subdirectory should be "gg",
// if audio begins with a number or punctuation (eg, "_"), the subdirectory should be "number",
// otherwise, the subdirectory is equal to the first letter of audio.
// For example, the URL for the object {"audio":"3d000001","ref":"c","stat":"1"} in the entry "3-D" would be: 
// https://media.merriam-webster.com/soundc11/number/3d000001.wav

///////////////////////////////////////////////////////////////

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      definition: '',
      partOfSpeech: '',
      subDirectory: '',
      baseFilename: ''
    }
  }

  render() {
    let soundfile = `https://media.merriam-webster.com/soundc11/${this.state.subDirectory}/${this.state.baseFilename}.wav`;
    return (
      <>
        <div className="App">
          <header className="App-header">
            {this.state.definition && <h1>{this.state.definition}</h1>}
            {this.state.partOfSpeech && <h1>{this.state.partOfSpeech}</h1>}
            <button onClick={this.makeAjaxRequest}>Gimme the word</button>
          </header>
          {this.state.subDirectory && <audio ref='audio_tag' src={soundfile} controls autoPlay/>} 
      </div>
      </>
    );
  }
  
  makeAjaxRequest = () => {
    axios.get(ENDPOINT)
        .then(r => {
          this.setState({
            definition: r.data[0].shortdef[0],
            partOfSpeech: r.data[0].fl,
            subDirectory: r.data[0].hwi.prs[0].sound.audio.slice(0, 1),
            baseFilename: r.data[0].hwi.prs[0].sound.audio
          }, () => console.log(r.data[0]));
          // switch(r.data[0].hwi.prs[0].sound.audio.slice(0, 2)) {
          //   case "bix":
          //     this.setState({
          //       word: r.data[0].meta.id,
          //       audio: r.data[0].hwi.prs[0].sound,
          //       subDirectory: "bix",
          //       baseFilename: r.data[0].hwi.prs[0].sound.audio
          //     });
          //     break;
          //   case /gg./:
          //     this.setState({
          //       word: r.data[0].meta.id,
          //       audio: r.data[0].hwi.prs[0].sound,
          //       subDirectory: "gg",
          //       baseFilename: r.data[0].hwi.prs[0].sound.audio
          //     });
          //     break;
          //   case "3d0":
          //     this.setState({
          //       word: r.data[0].meta.id,
          //       audio: r.data[0].hwi.prs[0].sound,
          //       subDirectory: "number",
          //       baseFilename: r.data[0].hwi.prs[0].sound.audio
          //     });
          //   default:
          //     console.table(this.state);
          //     console.log(r.data);
          //     break;
          // }
        })
  }

}

export default App;
