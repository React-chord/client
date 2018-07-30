import React, { Component } from 'react';
import {
  StyleSheet, Text, View, StatusBar, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Meter from './TuningProcess/Meter';
import Note from './TuningProcess/Note';
import Tuner from './TuningProcess/Tuner';

export default class Tuning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        name: 'A',
        octave: 0,
        frequency: 440,
      },
      btnActive: false,
    };
    this.handleActionStart = this.handleActionStart.bind(this);
    this.handleActionStop = this.handleActionStop.bind(this);
    this.tuner = new Tuner();
  }

    static navigationOptions = {
      header: null
    };

  componentDidMount() {
    // const tuner = new Tuner();
    // tuner.start();
    // tuner.onNoteDetected = (note) => {
    //   if (this._lastNoteName === note.name) {
    //     this._update(note);
    //   } else {
    //     this._lastNoteName = note.name;
    //   }
    // };
  }

  _update(note) {
    this.setState({ note });
  }

  handleActionStart() {
    this.tuner.start();
    this.tuner.onNoteDetected = (note) => {
      if (this._lastNoteName !== note.name) {
        this._update(note);
      } else {
        this._lastNoteName = note.name;
      }
    };
    this.setState(prevState => ({ btnActive: !prevState.btnActive }));
  }

  handleActionStop() {
    this.tuner.stop();
    this.setState(prevState => ({ btnActive: !prevState.btnActive }));
    this.setState({
      note: {
        ...{
          name: 'X',
          octave: 0,
          frequency: 440,
        },
      },
    });
  }

  render() {
    const { note, btnActive } = this.state;
    return (
      <View style={style.body}>
        <StatusBar backgroundColor="#000" translucent />
        <Meter cents={note.cents} />
        <Note {...note} />
        <Text style={style.frequency}>
          {note.frequency.toFixed(1)}
          {' '}
Hz
        </Text>
        <View style={style.viewSong}>
          <TouchableOpacity
            onPress={btnActive ? this.handleActionStop : this.handleActionStart}
            style={style.btnPlay}
          >
            <View>
              {btnActive ? (
                <Icon style={style.actionButtonIcon} name="ios-pause" />
              ) : (
                <Icon style={style.actionButtonIcon} name="ios-play" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#263238',
    paddingTop: 50
  },
  frequency: {
    fontSize: 28,
    color: '#37474f',
  },
  viewSong: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
    color: '#fff',
  },
  btnPlay: {
    width: 60,
    height: 60,
    backgroundColor: '#ff6f00',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 50,
    height: 50,
    color: '#263238',
    textAlign: 'center',
  },
});
