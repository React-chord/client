import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Orientation from 'react-native-orientation';
import { Table, Row, Rows } from 'react-native-table-component';
import Meter from './TuningProcess/Meter';
import Note from './TuningProcess/Note';
import Tuner from './TuningProcess/Tuner';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        name: 'A',
        octave: 4,
        frequency: 440,
      },
      tableData: [
        ['', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2'],
        ['', 'C1', 'C#1', 'D1', 'D#1', 'E1'],
        ['', 'G#3', 'A#', 'B3', 'C4', 'C#4'],
        ['', 'D#', 'E', 'F', 'F#', 'G'],
        ['', 'A#', 'B', 'C', 'C#', 'D'],
        ['', 'F', 'F#', 'G', 'G#', 'A'],
      ],
    };
  }

  componentDidMount() {
    const tuner = new Tuner();
    tuner.start();
    tuner.onNoteDetected = (note) => {
      if (this._lastNoteName === note.name) {
        this._update(note);
      } else {
        this._lastNoteName = note.name;
      }
    };
  }

  _update(note) {
    this.setState({ note });
  }

  render() {
    const { state } = this;
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#FFA500' }}>
          <Rows data={state.tableData} textStyle={styles.text} />
        </Table>
        <Text>
          {state.note.name}
        </Text>
        <Text>
          {state.note.octave}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
});
export default Tabs;
