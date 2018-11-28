import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import qs from 'qs'
import Fieldset from './Fieldset'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Checkbox from '../components/Checkbox'
import { DEFAULT_VAST_URL } from '../../common/settings'

const removeFalse = obj =>
  Object.keys(obj).reduce(
    (acc, key) => (obj[key] === false ? acc : { ...acc, [key]: obj[key] }),
    {}
  )

const configToQuery = config => qs.stringify(removeFalse(config))

class Config extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vastUrl: DEFAULT_VAST_URL,
      audioUnmuted: false,
      startDelayed: false,
      vpaidEnabled: true,
      verificationSessionRequired: false,
      verificationLimitedAccessMode: false,
      ...props.config
    }
  }

  render () {
    return (
      <main className='config'>
        <Header />
        <div className='contents'>
          <form
            onSubmit={event => {
              event.preventDefault()
              this._runButton.click()
            }}
          >
            <Fieldset legend='VAST URL'>
              <TextInput
                defaultValue={this.state.vastUrl}
                onChange={vastUrl => {
                  this._update({
                    vastUrl
                  })
                }}
              />
            </Fieldset>
            <Fieldset legend='Video Player Behavior'>
              <Checkbox
                label='Enable audio by default'
                defaultValue={this.state.audioUnmuted}
                onChange={audioUnmuted => {
                  this._update({
                    audioUnmuted
                  })
                }}
              />
              <Checkbox
                label='Simulate creative preloading'
                defaultValue={this.state.startDelayed}
                onChange={startDelayed => {
                  this._update({
                    startDelayed
                  })
                }}
              />
            </Fieldset>
            <Fieldset legend='Media File Selection'>
              <Checkbox
                label='Allow VPAID media files'
                defaultValue={this.state.vpaidEnabled}
                onChange={vpaidEnabled => {
                  this._update({
                    vpaidEnabled
                  })
                }}
              />
            </Fieldset>
            <Fieldset legend='OMID Verification'>
              <Checkbox
                label='Delay playback until verification start'
                defaultValue={this.state.verificationSessionRequired}
                onChange={verificationSessionRequired => {
                  this._update({
                    verificationSessionRequired
                  })
                }}
              />
              <Checkbox
                label='Run verification scripts in limited-access mode'
                defaultValue={this.state.verificationLimitedAccessMode}
                onChange={verificationLimitedAccessMode => {
                  this._update({
                    verificationLimitedAccessMode
                  })
                }}
              />
            </Fieldset>
          </form>
        </div>
        <div className='actions'>
          <nav>
            <ul>
              <li>
                <Link
                  to={{ pathname: '/run', search: configToQuery(this.state) }}
                  innerRef={ref => {
                    this._runButton = ref
                  }}
                >
                  Run Test <FontAwesome name='arrow-right' />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    )
  }

  _update (delta) {
    this.setState({
      ...this.state,
      ...delta
    })
  }
}

export default Config
