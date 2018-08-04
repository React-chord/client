import React, { Component } from 'react';
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native';
import Meter from './TuningProcess/Meter';
import Note from './TuningProcess/Note';
import Tuner from './TuningProcess/Tuner';

const tuner = new Tuner();

export default class Tuning extends Component {
  state = {
    note: {
      name: 'A',
      octave: 4,
      frequency: 440,
    },
  };

  componentDidMount() {
    tuner.start();
    tuner.onNoteDetected = (note) => {
      if (this._lastNoteName === note.name) {
        this._update(note);
      } else {
        this._lastNoteName = note.name;
      }
    };
  }

  componentWillUnmount() {
    tuner.onNoteDetected = null;
    tuner.stop();
  }

  _update(note) {
    this.setState({ note });
  }

  render() {
    const { note } = this.state;

    return (
      <View style={style.body}>
        <StatusBar backgroundColor="#000" translucent />
        <Meter cents={note.cents} />
        <Note {...note} />
        <Text style={style.frequency}>
          {`${note.frequency.toFixed(1)} Hz`}
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22262d',
  },
  frequency: {
    fontSize: 28,
    color: '#fff',
  },
});
