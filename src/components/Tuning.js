import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import Meter from './TuningProcess/Meter'
import Note from './TuningProcess/Note'
import Tuner from './TuningProcess/Tuner'

export default class Tuning extends Component<Props>  {
  state = {
    note: {
      name: 'A',
      octave: 4,
      frequency: 440,
    },
  }

  _update = (note) => this.setState({note})

  componentDidMount() {
    const tuner = new Tuner()
    tuner.start()
    tuner.onNoteDetected = note => {
      if (this._lastNoteName === note.name) {
        this._update(note)
      } else {
        this._lastNoteName = note.name
      }
    }
  }

  render() {
    return (
      <View style={style.body}>
        <StatusBar backgroundColor='white' translucent/>
        <Meter cents={this.state.note.cents}/>
        <Note {...this.state.note}/>
        <Text style={style.frequency}>{this.state.note.frequency.toFixed(1)} Hz</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  frequency: {
    fontSize: 28,
    color: '#37474f',
  },
})
