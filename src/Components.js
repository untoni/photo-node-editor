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

class InteractionController extends ElementClassMap {
	static mark;
	static mouseContext = {};

	static setMark(mark) {
		InteractionController.mark = mark;
	}

	static startObserwe() {
		window.addEventListener('mousedown', (e) => {
			const target = e.target.closest(InteractionController.mark);
			let targetClass = ElementClassMap.getClass(target);
			console.log(target);
		});
		window.addEventListener('mousemove', (e) => {
			const target = e.target.closest(InteractionController.mark);
			let targetClass = ElementClassMap.getClass(target);
			console.log(target);
		});
		window.addEventListener('mouseup', (e) => {
			const target = e.target.closest(InteractionController.mark);
			let targetClass = ElementClassMap.getClass(target);
			console.log(target);
		});
	}
}
InteractionController.setMark('action')

export class InteractionComponent extends InteractionController {
	#root;
	#myElement;
	#settings;

	#childrens = {};  // {id: {class: , element: , }}
	#childrensSequence = []

	#state; 					// {id: {el, value}, }

	#managerCallback;
	#parentCallback;

	constructor(settings, childrens) {
		this.#initialComponent(settings, childrens)
	}


	#initialComponent(settings, childrens) {  // ({}, {id: class})
		this.#settings = settings;
		const html = this.#componentHTML(settings);
		const element = document.creatyElement('div');
		element.innerHTML = html;
		element.classList.add(this.#classElement);
		element.setAttribute(InteractionController.mark, true);
		this.#root = element.querySelector('#root');

		this.#initialSubComponent(this.#subComponents);
		this.#initialState(element);
		this.#setInitialState(settings.state)
		this.#addChildrens(childrens);
		this.#initialElement(element);
		
	}

	#initialSubComponent(subComponents) {
		if(!subComponents) return;

		for (const {id, root, component, manager} of subComponents) {
			if (manager) component.setManager(this.#managerCallback);
			this.addChildren(component, id, root);
		}
	}

	#initialState(element) {
		if(!this.#stateElements) return;

		for (let {id, selector, style, fn}of this.#stateElements) {
			const stateElement = element.querySelector(selector)
			Object.defineProperty(this.#state, id, {
				get() {
					return stateElement.style[style];
				},
				set(value) {
					stateElement.style[style] = value;
				}
			})
		} 
	}
	#setInitialState(state) {

	}

	#addChildrens(childrens) {
		if(!childrens) return;

		for (let id in childrens) {
			const child = childrens[id];
			this.addChildren(child, id);
		}
	}
	#initialElement(element) {
		this.#myElement = element;
		ElementClassMap.bindElementToClass(element, this.#callback);
	}


	getElement(parentCallback = this.#parentCallback) {
		this.#parentCallback = parentCallback;
		return this.#myElement || this.initialComponent(this.#settings, this.#childrens);
	} 

	setManager(managerCallback) {
		this.#managerCallback = managerCallback;
		return this;
	}


	addChildren(child, id, root = this.#root, insertBefore) {  // add InsertBefore
		const element = child.getElement(this.#callback);
		this.#childrens[id] = {class: child, element: element};
		if (root === this.#root) {
			this.#childrensSequence.push(id);
		}
		root.append(element);
	}
}


class DragBlockComponent extends InteractionComponent {
	#classElement = 'drag-block';
	#subComponents = [
		{id: 'switchBlock', root: '.block-header', /*component: new OpenCloseComponent({value: true})*/},
	];
	#stateElements = [
		{id: 'x', selector: 'this', style: 'left'},			//[id, selectorJs, style]
		{id: 'y', selector: 'this', style: 'top'},
		{id: 'width', selector: 'this', style: 'width'},
		{id: 'height', selector: 'this', style: 'height'},
	];

	constructor(settings, childrens) {
		super(settings, childrens);
	}
	#componentHTML({name, typeBlockData}) {
		return `
				<div>
					<div class="block-header" style="background: ${typeBlockData.color};"> </sub-component id="switch" class="new OpenCloseComponent({value: true})"> ${Name} </div>
					<div id="root"></div>
				</div>
			`
	}

	#callback = {
		handleEvent: (e, mouseContext) => {

		},
		sendMessage: (message) => {

		},
		open: () => {

		},
		close: () => {

		},
	}

	#triggerEvent;
	#stateMethods = {
		mousedown: (e, mouseContext) => {

		}
	}
}








// class NewClass extends InteractionComponent {
// 	#classElement = '';
// 	#subComponents = [
// 		{id: '', root: '', component: new , fn: (value) => {}, ?manager: true},
// 	];
// 	#stateElements = [
// 		{id: '', selector: '', style: '', ?manager: true},			//[id, selectorJs, style]
// 	];

// 	constructor(settings, childrens) {
// 		super(settings, childrens);
// 	}
// 	#myHTML({}) {
// 		return `
				
// 			`
// 	}

// 	#callback = {
// 		handleEvent: (e, mouseContext) => {

// 		},
// 		sendMessage: (message) => {

// 		},
// 	}

// 	#stateMethods = {
// 		mousedown: (e, mouseContext) => {

// 		}
// 	}
// }