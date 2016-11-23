import React, {PropTypes} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import * as theme from '../utils/theme';

export default React.createClass({
  displayName: 'Button',
  propTypes: {
    style: View.propTypes.style,
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  },
  render() {
    const Label = ({value}) => {
      const labelValue = Platform.OS === 'android' ? value.toUpperCase() : value;
      return <Text style={theme.fonts.button}>{labelValue}</Text>;
    };

    return (
      <TouchableOpacity onPress={this.props.action} style={[styles.button, this.props.style]}>
        <Label value={this.props.text} />
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: theme.colors.button,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected: {
    backgroundColor: theme.selectedBullet
  }
});
