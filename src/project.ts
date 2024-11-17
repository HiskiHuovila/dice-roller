import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import dice from './scenes/dice?scene';

export default makeProject({
  scenes: [dice,example],
});
