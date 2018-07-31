import React, { Component } from 'react';
import {
  View, Image, StyleSheet, Button, TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Recording from 'react-native-recording';
import PitchFinder from 'pitchfinder';
import { connect } from 'react-redux';
import Carousel from 'react-native-carousel-view';
import Promise from 'bluebird';
import { generateChords } from '../store/actions';

class ChordPractice extends Component {
  middleA = 440

  semitone = 69

  noteStrings = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']

  constructor(props) {
    super(props);

    this.state = {
      chordResult: false,
      currentIndex: 0,
      buttonState: false,
      hitCount: 0,
      isListening: false,
      score: 0,
    };

    this.sampleRate = 22050;
    this.bufferSize = 2048;
    this.pitchFinder = new PitchFinder.YIN({ sampleRate: this.sampleRate });

    this.setStateAsync = Promise.promisify(this.setState);
    this.handleChange = this.handleChange.bind(this);
  }

  async compareChord(chordRead) {
    const { chords } = this.props;
    const { currentIndex, hitCount, isListening } = this.state;
    if (!this._timeoutDetecting) {
      await this.setState({ isListening: true });
    }

    if ((chords[currentIndex].chord === chordRead) && isListening) {
      await this.setState({
        chordResult: true,
        hitCount: hitCount + 1,
        isListening: false,
      });
      this._timeoutDetecting = setTimeout(async () => {
        await this.setState({ isListening: true });
        this._timeoutDetecting = null;
      }, 1000);
    }
  }

  getNote(frequency) {
    const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
    return Math.round(note) + this.semitone;
  }

  componentWillUnmount() {
    this.setState({
      chordResult: false,
      currentIndex: 0,
      buttonState: false,
    });
  }

  getScore() {
    const score = this.state.hitCount * 20;
    this.setState({
      score,
    });
  }

  start() {
    console.log('start');
    Recording.init({
      bufferSize: this.bufferSize,
      sampleRate: this.sampleRate,
      bitsPerChannel: 16,
      channelsPerFrame: 1,
    });
    Recording.addRecordingEventListener((data) => {
      const frequency = this.pitchFinder(data);
      if (frequency) {
        const note = this.getNote(frequency);
        const chordRead = this.noteStrings[note % 12];
        this.compareChord(chordRead);
      }
    });
    Recording.start();
  }

  handleChange() {
    console.log(this.state.currentIndex, '====');
    if (this.state.currentIndex < 6) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        buttonState: false,
        chordResult: false,
        hitCount: 0,
        score: 0,
      });
    } else {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
        buttonState: false,
        chordResult: false,
        hitCount: 0,
        score: 0,
      });
    }
  }

  handleState() {
    console.log('masukhandle');
    this.setState({
      buttonState: true,
      chordResult: false,
    });
  }

  handleButton() {
    console.log('buttonpushed');
    this.start();
    this._setTimeout = setTimeout(() => {
      this.handleState();
      Recording.stop();
      this.getScore();
    }, 10000);
  }

  render() {
    const {
      chordResult, buttonState, score, hitCount,
    } = this.state;
    if (this.props.chords.length > 0) {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Carousel
              width={375}
              height={500}
              hideIndicators
              initialPage={0}
              animate={false}
              onPageChange={() => this.handleChange()}
            >

              <View style={styles.contentContainer}>
                <Text style={styles.text}>
                  {this.props.chords[0].chord}
                </Text>
                <Image
                  source={{ uri: this.props.chords[0].imageUrl }}
                  style={styles.image}
                />
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.text}>
                  {this.props.chords[1].chord}
                </Text>
                <Image
                  source={{ uri: this.props.chords[1].imageUrl }}
                  style={styles.image}
                />
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.text}>
                  {this.props.chords[2].chord}
                </Text>
                <Image
                  source={{ uri: this.props.chords[2].imageUrl }}
                  style={styles.image}
                />
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.text}>
                  {this.props.chords[3].chord}
                </Text>
                <Image
                  source={{ uri: this.props.chords[3].imageUrl }}
                  style={styles.image}
                />
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.text}>
                  {this.props.chords[4].chord}
                </Text>
                <Image
                  source={{ uri: this.props.chords[4].imageUrl }}
                  style={styles.image}
                />
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.text}>
                  {this.props.chords[5].chord}
                </Text>
                <Image
                  source={{ uri: this.props.chords[5].imageUrl }}
                  style={styles.image}
                />
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.text}>
                  {this.props.chords[6].chord}
                </Text>
                <Image
                  source={{ uri: this.props.chords[6].imageUrl }}
                  style={styles.image}
                />
              </View>

            </Carousel>

            {chordResult ? (
              <Icon name="ios-checkbox" style={{ color: 'limegreen', fontSize: 40 }} />
            ) : (
              <Icon name="ios-checkbox" style={{ color: 'grey', fontSize: 40 }} />
            )}
            <Button
              onPress={this.handleButton.bind(this)}
              title="Start"
              color="#841584"
              disabled={buttonState}
            />

            {buttonState ? (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>
Count:
                    {' '}
                  </Text>
                  <Text>
                    {hitCount}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>
Score :
                    {' '}
                  </Text>
                  <Text>
                    {score}
%
                  </Text>
                </View>
              </View>
            ) : null}

          </View>
        </View>
      );
    }
    return (
      <View style={styles.loading}>
        <Image style={{ width: 50, height: 50 }} source={require('../assets/loading.gif')} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chords: state.allChords,
});

const mapDispatchToProps = dispatch => ({
  getChords: () => dispatch(generateChords()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChordPractice);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#22262d',
  },
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 30,
    fontSize: 75,
    color: 'red',
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
