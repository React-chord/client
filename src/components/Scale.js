import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'

import Tuner from './TuningProcess/Tuner'
import Button from './componentScale/Button'
import { Initial } from './componentScale/scales'
import { setTuning } from '../store/actions'
import { G, A, B, C, D, E, F, F2, G2, A2, C2, D2 } from './componentScale/scales'
import { e, a, g, f, b, c, d, f2, g2, a2, c2, d2 } from './componentScale/elementScales'

class Board extends Component<Props> {

  constructor (props) {
    super (props)
    this.state = {
      boardDisplay: Initial,
      note: true
    }

    this._handleSetBoard = this._handleSetBoard.bind(this)
  }

  componentDidMount () {
    const { checkSound } = this.props
    const tuner = new Tuner()

    tuner.start()
    tuner.onNoteDetected = note => {
      if (this.state.boardDisplay !== Initial) {
        checkSound(note)
      }
    }
  }

  _handleSetBoard = (value) => this.setState({ boardDisplay: value })

  _handleBoardDisplay = (boardName, index) => {
    const { getScales } = this.props
    const { boardDisplay } = this.state

    switch (boardDisplay) {
      case E:
        if (
          (boardName === 2 && ((index === 7 && getScales[0].hitted) || (index === 9 && getScales[1].hitted))) ||
          (boardName === 3 && ((index === 6 && getScales[2].hitted) || (index === 7 && getScales[3].hitted) || (index === 9 && getScales[4].hitted))) ||
          (boardName === 4 && ((index === 6 && getScales[5].hitted) || (index === 8 && getScales[6].hitted) || (index === 9 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case G:
        if (
          (boardName === 1 && ((index === 3 && getScales[0].hitted) || (index === 5 && getScales[1].hitted))) ||
          (boardName === 2 && ((index === 2 && getScales[2].hitted) || (index === 3 && getScales[3].hitted) || (index === 5 && getScales[4].hitted))) ||
          (boardName === 3 && ((index === 2 && getScales[5].hitted) || (index === 4 && getScales[6].hitted) || (index === 5 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case F:
        if (
          (boardName === 1 && ((index === 1 && getScales[0].hitted) || (index === 3 && getScales[1].hitted))) ||
          (boardName === 2 && ((index === 0 && getScales[2].hitted) || (index === 1 && getScales[3].hitted) || (index === 3 && getScales[4].hitted))) ||
          (boardName === 3 && ((index === 0 && getScales[5].hitted) || (index === 2 && getScales[6].hitted) || (index === 3 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case A:
        if (
          (boardName === 1 && ((index === 5 && getScales[0].hitted) || (index === 7 && getScales[1].hitted))) ||
          (boardName === 2 && ((index === 4 && getScales[2].hitted) || (index === 5 && getScales[3].hitted) || (index === 7 && getScales[4].hitted))) ||
          (boardName === 3 && ((index === 4 && getScales[5].hitted) || (index === 6 && getScales[6].hitted) || (index === 7 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case B:
        if (
          (boardName === 1 && ((index === 7 && getScales[0].hitted) || (index === 9 && getScales[1].hitted))) ||
          (boardName === 2 && ((index === 6 && getScales[2].hitted) || (index === 7 && getScales[3].hitted) || (index === 9 && getScales[4].hitted))) ||
          (boardName === 3 && ((index === 6 && getScales[5].hitted) || (index === 8 && getScales[6].hitted) || (index === 9 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case C:
        if (
          (boardName === 2 && ((index === 3 && getScales[0].hitted) || (index === 5 && getScales[1].hitted))) ||
          (boardName === 3 && ((index === 2 && getScales[2].hitted) || (index === 3 && getScales[3].hitted) || (index === 5 && getScales[4].hitted))) ||
          (boardName === 4 && ((index === 2 && getScales[5].hitted) || (index === 4 && getScales[6].hitted) || (index === 5 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case D:
        if (
          (boardName === 2 && ((index === 5 && getScales[0].hitted) || (index === 7 && getScales[1].hitted))) ||
          (boardName === 3 && ((index === 4 && getScales[2].hitted) || (index === 5 && getScales[3].hitted) || (index === 7 && getScales[4].hitted))) ||
          (boardName === 4 && ((index === 4 && getScales[5].hitted) || (index === 6 && getScales[6].hitted) || (index === 7 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case F2:
        if (
          (boardName === 1 && ((index === 2 && getScales[0].hitted) || (index === 4 && getScales[1].hitted))) ||
          (boardName === 2 && ((index === 1 && getScales[2].hitted) || (index === 2 && getScales[3].hitted) || (index === 4 && getScales[4].hitted))) ||
          (boardName === 3 && ((index === 1 && getScales[5].hitted) || (index === 3 && getScales[6].hitted) || (index === 4 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case G2:
        if (
          (boardName === 1 && ((index === 4 && getScales[0].hitted) || (index === 6 && getScales[1].hitted))) ||
          (boardName === 2 && ((index === 3 && getScales[2].hitted) || (index === 4 && getScales[3].hitted) || (index === 6 && getScales[4].hitted))) ||
          (boardName === 3 && ((index === 3 && getScales[5].hitted) || (index === 5 && getScales[6].hitted) || (index === 6 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case A2:
        if (
          (boardName === 1 && ((index === 6 && getScales[0].hitted) || (index === 8 && getScales[1].hitted))) ||
          (boardName === 2 && ((index === 5 && getScales[2].hitted) || (index === 6 && getScales[3].hitted) || (index === 8 && getScales[4].hitted))) ||
          (boardName === 3 && ((index === 5 && getScales[5].hitted) || (index === 7 && getScales[6].hitted) || (index === 8 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case C2:
        if (
          (boardName === 2 && ((index === 4 && getScales[0].hitted) || (index === 6 && getScales[1].hitted))) ||
          (boardName === 3 && ((index === 3 && getScales[2].hitted) || (index === 4 && getScales[3].hitted) || (index === 6 && getScales[4].hitted))) ||
          (boardName === 4 && ((index === 3 && getScales[5].hitted) || (index === 5 && getScales[6].hitted) || (index === 6 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      case D2:
        if (
          (boardName === 2 && ((index === 6 && getScales[0].hitted) || (index === 8 && getScales[1].hitted))) ||
          (boardName === 3 && ((index === 5 && getScales[2].hitted) || (index === 6 && getScales[3].hitted) || (index === 8 && getScales[4].hitted))) ||
          (boardName === 4 && ((index === 5 && getScales[5].hitted) || (index === 7 && getScales[6].hitted) || (index === 8 && getScales[7].hitted)))
        ) {
          return 'green'
        }
        return '#4e342e'
      default:
        return '#4e342e'
    }
  }

  board () {
    return this.props.board
  }

  board_one () {
    const { note, boardDisplay } = this.state

    return (
      boardDisplay[0].map((col, i) => {
        return (
            <View
              style={[styles.newButton, {
                backgroundColor: this._handleBoardDisplay(1, i)
              }]}
              key={i}>
              <Text style={{color: 'white'}}>{col}</Text>
            </View>
          )
        })
      )
  }

  board_two () {
    const { note, boardDisplay } = this.state

    return (
      boardDisplay[1].map((col, i) => {
        return (
            <View
                style={[styles.newButton, {
                  backgroundColor: this._handleBoardDisplay(2, i)
                }]}
                key={i}>
              <Text style={{color: 'white'}}>{col}</Text>
            </View>
          )
        })
      )
  }

  board_three () {
    const { getScales } = this.props
    const { note, boardDisplay } = this.state

    return (
      boardDisplay[2].map((col, i) => {
        return (
            <View
              style={[styles.newButton, {
                backgroundColor: this._handleBoardDisplay(3, i)
              }]}
              key={i}>
              <Text style={{color: 'white'}}>{col}</Text>
            </View>
          )
        })
      )
  }

  board_four () {
    const { getScales } = this.props
    const { note, boardDisplay } = this.state

    return (
      boardDisplay[3].map((col, i) => {
        return (
          <View
            style={[styles.newButton, {
              backgroundColor: this._handleBoardDisplay(4, i)
            }]}
            key={i}>
            <Text style={{color: 'white'}}>{col}</Text>
          </View>
        )
      })
    )
  }

  board_five () {
    const { note, boardDisplay } = this.state

    return (
      boardDisplay[4].map((col, i) => {
        return (
            <View
              style={[styles.newButton, {
                backgroundColor: '#4e342e'
              }]}
              key={i}>
              <Text style={{color: 'white'}}>{col}</Text>
            </View>
          )
        })
      )
  }

  board_six () {
    const { note, boardDisplay } = this.state

    return (
      boardDisplay[5].map((col, i) => {
        return (
            <View
              style={[styles.newButton, {
                backgroundColor: '#4e342e'
              }]}
              key={i}>
              <Text style={{color: 'white'}}>{col}</Text>
            </View>
          )
        })
      )
  }

  render () {
    return (
      <View style={styles.scale}>
          <View style={styles.container}>
            <View style={[styles.rowAlpha, styles.topOne]}>
              <Text style={{ fontWeight: 'bold', paddingRight: 15 }}>E </Text>
              { this.board_one() }
            </View>
            <View style={[styles.rowAlpha, styles.topTwo]}>
              <Text style={{ fontWeight: 'bold', paddingRight: 15 }}>A </Text>
              { this.board_two() }
            </View>
            <View style={[styles.rowAlpha, styles.topThree]}>
              <Text style={{ fontWeight: 'bold', paddingRight: 15 }}>D </Text>
              { this.board_three() }
            </View>
            <View style={[styles.rowAlpha, styles.topFour]}>
              <Text style={{ fontWeight: 'bold', paddingRight: 15 }}>G </Text>
              { this.board_four() }
            </View>
            <View style={[styles.rowAlpha, styles.topFive]}>
              <Text style={{ fontWeight: 'bold', paddingRight: 15 }}>B </Text>
              { this.board_five() }
            </View>
            <View style={[styles.rowAlpha, styles.topSix]}>
              <Text style={{ fontWeight: 'bold', paddingRight: 15 }}>E </Text>
              { this.board_six() }
            </View>
          </View>
          <View>
            <Button handleSetBoard={(value) => this._handleSetBoard(value)}  />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
  },
  newButton: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  btnFlex: {
    flex: 1,
    flexDirection: 'row'
  },
  btn: {
    width: 40,
    height: 20,
  },
  rowAlpha: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 15
  },
  topOne: {
    top: 5
  },
  topTwo: {
    top: 45
  },
  topThree: {
    top: 85
  },
  topFour: {
    top: 125
  },
  topFive: {
    top: 165
  },
  topSix: {
    top: 205,
  },
  scale: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  }
});

const mapStateToProps = (state) => {
  return {
    getScales: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkSound: (note) => dispatch(setTuning(note))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
