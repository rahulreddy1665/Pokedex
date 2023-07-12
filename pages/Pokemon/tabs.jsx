import { Dimensions } from 'react-native';


import About from './Details/About/index';
import BaseStats from './Details/BaseStats/index';
import Evolution from './Details/Evolution/index';
import Moves from './Details/Moves/index';


const tabs = [
  { name: 'About', slide: About },
  { name: 'Base Stats', slide: BaseStats },
  { name: 'Evolution', slide: Evolution },
  { name: 'Moves', slide: Moves },
];

const { width } = Dimensions.get('window');
const TAB_BUTTON_WIDTH = (width - 48) / 4;

export { tabs, TAB_BUTTON_WIDTH };
