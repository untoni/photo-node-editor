import { DragBlockComponent, NodeSpaceComponent } from './components/componentsAll.js';
import {render} from './core/Components'
import BlockManager from './core/Manager.js'

BlockManager.setTypeBlockData({});


const nodeSpace = new NodeSpaceComponent({states: {zoom: 2, x: 100, y: 50}});
const root = document.querySelector('#root');
render(nodeSpace, root);

// for (let i = 0; i < 3; i++) {
//   nodeSpace.addChildren(new DragBlockComponent({name: `block${i+1}`, 
//                                                 states: {
//                                                   width: 300,
//                                                   height: 400,
//                                                   x: Math.random()*600-300,
//                                                   y: Math.random()*600-300,
//                                                 }, 
//                                                 typeBlockData: {color: '#495f92'}
//                                                 },
//                                                 null));
// }


//const block = new BlockManager({}, nodeSpace)