import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loading = ({ size, color, ...rest }) => {
  return <ActivityIndicator size={size} color={color} {...rest} />;
};

Loading.defaultProps = {
  size: 'small',
  color: 'grey',
};

export default Loading;
