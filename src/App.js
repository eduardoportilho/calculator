import React, { Component } from 'react';
import styled from 'styled-components'

const numbers = [1,2,3,4,5,6,7,8,9,0]
const ops = {
  '+': (a, b) => a+b,
  '-': (a, b) => a-b,
  '*': (a, b) => a*b,
  '/': (a, b) => a/b
}

const Calculator = styled.div`
  flex-direction: column;
  display: flex;
  margin: auto;
  width: 260px;
  background: black;
  border-radius: 15px;
  padding: 5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
`
const Display = styled.div`
  color: white;
  text-align: right;
  padding: 40px 10px 5px;
  font-size: 40px;
`
const Keypad = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`

const Numbers = styled.div`
  display: flex;
  width: 200px;
  flex-wrap: wrap;
  justify-content: center;
`

const Number = styled.div`
  padding: 10px 16px;
  background: darkslategray;
  color: white;
  border-radius: 50%;
  margin: 10px;
  font-size: 20px;
  text-align: center;

  min-width: 10px;
  :nth-child(10) {
    padding-right: 85px;
    border-radius: 21.5px;
  }
`

const Comma = styled(Number)``

const Operations = styled.div`
  display: flex;
  flex-direction: column;
`

const Operation = styled(Number)`
  background: orange;
`

class App extends Component {
  state = {
    display: '0',
    op: '',
    buffer: ''
  }

  handleNum = (number) => {
    this.setState(({display}) => {
      const prev = display === '0' ? '' : display
      return {
        display: prev + number
      }
    })
  }

  handleOp = (op) => {
    this.setState(({display}) => {
      return {
        op,
        buffer: display,
        display: ''
      }
    })
  }

  handleEq = () => {
    const { display, op, buffer } = this.state
    if (display === '' || op === '' || buffer === '') return
    this.setState(({display, op, buffer}) => {
      const result = ops[op](parseInt(buffer), parseInt(display))
      return {
        op: '',
        buffer: '',
        display: result
      }
    })
  }

  render() {
    const { display, op, buffer } = this.state
    return (
      <Calculator>
        <Display>{ buffer } { op } { display }</Display>
        <Keypad>
          <Numbers>
            {numbers.map(number => (
              <Number key={number} onClick={() => this.handleNum(number)}>{number}</Number>
            ))}
            <Comma>,</Comma>
          </Numbers>

          <Operations>
            {Object.keys(ops).map(op => (
              <Operation key={op} onClick={() => this.handleOp(op)}>{op}</Operation>
            ))}
            <Operation onClick={this.handleEq}>=</Operation>
          </Operations>
        </Keypad>
      </Calculator>
    );
  }
}

export default App;
