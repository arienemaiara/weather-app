import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormFactor } from '@youi/react-native-youi'

import HeaderButton from './header/HeaderButton'

import { ApplicationState } from '../reducers'
import { refreshApp, loadError } from '../features/weather/weatherSlicer'
import { ERROR_MESSAGE_LOST_CONNECTION } from '../constants'

type RefreshButtonProps = {
  refreshing: boolean
  notifyConnectionLost: () => void
  reload: () => void
}

class RefreshButton extends Component<RefreshButtonProps> {
  render() {
    return (
      <HeaderButton
        title="Refresh"
        icon="refresh"
        onPress={this.props.reload}
        disabled={this.props.refreshing}
      />
    )
  }
}

const mapStateToProps = ({ weather }: ApplicationState) => ({
  refreshing: weather.isLoading
})

const mapDispatchToProps = (dispatch: any) => ({
  reload: () => dispatch(refreshApp()),
  notifyConnectionLost: () => dispatch(loadError(ERROR_MESSAGE_LOST_CONNECTION))
})

export default connect(mapStateToProps, mapDispatchToProps)(RefreshButton)
