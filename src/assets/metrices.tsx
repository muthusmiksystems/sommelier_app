import {Dimensions} from 'react-native';

const getWidth = Dimensions.get('window').width;
const getHeight = Dimensions.get('window').height;

const width = (value: any) => (getWidth * value) / 100;
const metrices = (value: any) => (getHeight * value) / 100;

export {metrices, width};
