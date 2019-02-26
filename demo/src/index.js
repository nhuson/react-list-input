import React from 'react'
import {render} from 'react-dom'

import ReactListInput from '../../src'

const Input = ({value, onChange, type = 'text'}) =>
  <input type={type} value={value} onChange={e => onChange(e.target.value)} />

class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ['alpha', 'beta', 'gamma', 'delta', 'epsillon']
    }
  }

  Item ({decorateHandle, removable, onChange, onRemove, value, item}) {
    return (
      <div>
        {decorateHandle(<span style={{cursor: 'move'}}>+</span>)}
        <span
          onClick={removable ? onRemove : x => x}
          style={{
            cursor: removable ? 'pointer' : 'not-allowed',
            color: removable ? 'black' : 'gray'
          }}>X</span>
        <Input value={value} onChange={onChange} />
        <span>{parseInt(item[value]) + 1}</span>
      </div>
    )
  }

  StagingItem ({value, onAdd, canAdd, add, onChange}) {
    return (
      <div>
        <span
          onClick={canAdd ? onAdd : undefined}
          style={{
            color: canAdd ? 'black' : 'gray',
            cursor: canAdd ? 'pointer' : 'not-allowed'
          }}
        >Add</span>
        <Input value={value} onChange={onChange} />
      </div>
    )
  }

  render () {
    return (
      <ReactListInput
        initialStagingValue=''
        onChange={value => this.setState({value})}
        maxItems={10}
        minItems={2}
        ItemComponent={this.Item}
        StagingComponent={this.StagingItem}
        value={this.state.value}
      />
    )
  }
}

render(<Demo />, document.querySelector('#demo'))