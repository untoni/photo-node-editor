export function render(component, root) {
	const element = component.getElement()
	root.append(element)
}

class ElementClassMap {
	static map = new Map();
	constructor() {

	}

	static bindElementToClass(element, classBind) {
		ElementClassMap.map.set(element, classBind)
	}

	static getClass(element) {
		return ElementClassMap.map.get(element)
	}
}

class InteractionContext {
	#mouse = {
		moveEnable: false,
		button: 0,
	};
	targetComponent;
	data = {}

	get mouseMoveEnable() {
		return this.#mouse.moveEnable
	}
	set mouseMoveEnable(value) {
		this.#mouse.moveEnable = value;
	}

	get mouseButton() {
		return this.#mouse.button
	}
	set mouseButton(value) {
		this.#mouse.button = value;
	}
	fill({targetComponent, mouseButton, mouseMoveEnable, data}) {
		this.targetComponent = targetComponent;
		this.mouseButton = mouseButton;
		this.mouseMoveEnable = mouseMoveEnable;
		this.data = data;
	}
	clear() {
		this.targetComponent = null;
		this.mouseMoveEnable = false;
		this.mouseButton = 0;
		this.data = null;
	}

}

class InteractionController extends ElementClassMap {
	static mark;
	static context = new InteractionContext();
	
	// {
	// 	data: {},
	// 	mouse: {
	// 		_moveEnable: false,
	// 		get moveEnable() {
	// 			return this._moveEnable;
	// 		},
	// 	},
	// };

	static setMark(mark) {
		InteractionController.mark = mark;
	}

	static startObserwe() {
		window.addEventListener('mousedown', (e) => {
			const mark = `[${InteractionController.mark}]`;
			let target = e.target.closest(mark);
			do {
				const targetComponent = ElementClassMap.getClass(target);
				if(!targetComponent) return;
				this.context.fill({targetComponent: targetComponent, mouseButton: e.buttons})
				var result = targetComponent.handleEvent(e, this.context);

				target = target.parentElement.closest(mark);
			} while (!result);
		});

		window.addEventListener('mousemove', (e) => {
			if(!this.context.mouseMoveEnable) return
			
			let targetComponent = this.context.targetComponent;
			if(targetComponent) {
				targetComponent.handleEvent(e, this.context);
			} else {
				const target = e.target.closest(`[${InteractionController.mark}]`);
				targetComponent = ElementClassMap.getClass(target);
				targetComponent.handleEvent(e, this.context);
			}
			
		});

		window.addEventListener('mouseup', (e) => {
			let targetComponent = this.context.targetComponent;
			if(targetComponent) {
				targetComponent.handleEvent(e, this.context);
			} else {
				const target = e.target.closest(`[${InteractionController.mark}]`);
				targetComponent = ElementClassMap.getClass(target);
				
				targetComponent.handleEvent(e, this.context);
			}
			
		});
	}
}
InteractionController.setMark('action');
InteractionController.startObserwe();

export class InteractionComponent extends InteractionController {
	root;
	myElement;
	settings;

	childrens = {};  // {id: {class: , element: , }}
	childrensSequence = []

	states = {}; 					// {id: {el, value}, }

	managerCallback;
	parentCallback;

	componentHTML() {};
  	classElement;
  	subComponents;
  	stateElements;
	callback = {};

	constructor() {
		super();
	}

	initialComponent(settings, childrens) {  // ({}, {id: class})
		this.settings = settings;
		const html = this.componentHTML(settings);
		const element = document.createElement('div');
		element.innerHTML = html;
		element.classList.add(this.classElement);
		element.setAttribute(InteractionController.mark, true);
		this.root = element.querySelector('#root');

		this.initialSubComponent(this.subComponents);
		this.initialState(element);
		this.setInitialState(settings.states);
		this.addChildrens(childrens);
		this.initialElement(element);
		
	}

	initialSubComponent(subComponents) {
		if(!subComponents) return;

		for (const {id, root, component, manager} of subComponents) {
			if (manager) component.setManager(this.managerCallback);
			this.addChildren(component, id, root);
		}
	}

	initialState(element) {
		if(!this.stateElements) return;
	
		for (let {id, selector, style, fn} of this.stateElements) {
			const stateElement = element.querySelector(selector)
			let _value = 0; 

			Object.defineProperty(this.states, id, {
				get() {
					return _value;
				},
				set(value) {
					_value = value;
					stateElement.style[style] = fn ? fn(value) : value;
				}
			})
		} 
	}
	setInitialState(states) {
		for (const [id, value] of Object.entries(states)) {
			this.states[id] = value;
		}
	}

	addChildrens(childrens) {
		if(!childrens) return;

		for (let id in childrens) {
			const child = childrens[id];
			this.addChildren(child, id);
		}
	}
	initialElement(element) {
		this.myElement = element;
		ElementClassMap.bindElementToClass(element, this.callback);
	}

	

	getElement(parentCallback = this.parentCallback) {
		this.parentCallback = parentCallback;
		return this.myElement //|| this.initialComponent(this.settings, this.childrens);
	} 

	setManager(managerCallback) {
		this.managerCallback = managerCallback;
		return this;
	}

	addChildren(child, id, root = this.root, insertBefore) {  // add InsertBefore
		const element = child.getElement(this.callback);
		this.childrens[id] = {class: child, element: element};
		if (root === this.root) {
			this.childrensSequence.push(id);
		}
		root.append(element);
	}
}








// class NewClass extends InteractionComponent {
// 	classElement = '';
// 	subComponents = [
// 		{id: '', root: '', component: new , fn: (value) => {}, ?manager: true},
// 	];
// 	stateElements = [
// 		{id: '', selector: '', style: '', ?manager: true},			//[id, selectorJs, style]
// 	];

// 	constructor(settings, childrens) {
// 		super(settings, childrens);
// 	}
// 	myHTML({}) {
// 		return `
				
// 			`
// 	}

// 	callback = {
// 		handleEvent: (e, mouseContext) => {

// 		},
// 		sendMessage: (message) => {

// 		},
// 	}

// 	stateMethods = {
// 		mousedown: (e, mouseContext) => {

// 		}
// 	}
// }