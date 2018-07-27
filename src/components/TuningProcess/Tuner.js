import Recording from 'react-native-recording'
import PitchFinder from 'pitchfinder'

export default class Tuner {
  middleA = 440
  semitone = 69
  noteStrings = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']

  constructor(sampleRate = 22050, bufferSize = 2048) {
    this.sampleRate = sampleRate
    this.bufferSize = bufferSize
    this.pitchFinder = new PitchFinder.YIN({sampleRate: this.sampleRate})
  }

  start() {
    Recording.init({
      bufferSize: 4096,
      sampleRate: 44100,
      bitsPerChannel: 50,
      channelsPerFrame: 1,
    })
    Recording.addRecordingEventListener(data => {
      const frequency = this.pitchFinder(data)
      if (frequency && this.onNoteDetected) {
        const note = this.getNote(frequency)
        this.onNoteDetected({
          name: this.noteStrings[note % 12],
          value: note,
          cents: this.getCents(frequency, note),
          octave: parseInt(note / 12) - 1,
          frequency: frequency,
        })
      }
    })
    Recording.start()
  }

  /**
   * get musical note from frequency
   *
   * @param {number} frequency
   * @returns {number}
   */
  getNote(frequency) {
    const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2))
    return Math.round(note) + this.semitone
    // console.log(frequency);
  }

  /**
   * get the musical note's standard frequency
   *
   * @param note
   * @returns {number}
   */
  getStandardFrequency(note) {
    // console.log(note);
    return this.middleA * Math.pow(2, (note - this.semitone) / 12)
  }

  /**
   * get cents difference between given frequency and musical note's standard frequency
   *
   * @param {float} frequency
   * @param {int} note
   * @returns {int}
   */
  getCents(frequency, note) {
    // console.log(frequency);
    return Math.floor(1200 * Math.log(frequency / this.getStandardFrequency(note)) / Math.log(2))
  }
}