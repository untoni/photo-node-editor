import {InteractionComponent} from '../core/Components.js'


export class DragBlockComponent extends InteractionComponent {
	classElement = 'drag-block';
	subComponents = [
		{id: 'switchBlock', root: '.block-header', component: new OpenCloseComponent({value: true})},
	];
	stateElements = [
		{id: 'x', selector: 'this', style: 'left'},			//[id, selectorJs, style]
		{id: 'y', selector: 'this', style: 'top'},
		{id: 'width', selector: 'this', style: 'width'},
		{id: 'height', selector: 'this', style: 'height'},
	];

	constructor(settings, childrens) {
		super();
		this.initialComponent(settings, childrens);
	}
	componentHTML({name, typeBlockData}) {
		return `
				<div>
					<div class="block-header" style="background: ${typeBlockData.color};"> </sub-component id="switch" class="new OpenCloseComponent({value: true})"> ${Name} </div>
					<div id="root"></div>
				</div>
			`
	}

	callback = {
		handleEvent: (e, context) => {

		},
		sendMessage: (message) => {

		},
		open: () => {

		},
		close: () => {

		},
	}

	triggerEvent;
	stateMethods = {
		mousedown: (e, context) => {

		}
	}
}



export class NodeSpaceComponent extends InteractionComponent {
	classElement = 'node-space';
	stateElements = [
		{id: 'x', selector: '#root', style: 'left', fn: (state) => state + 'px'},
		{id: 'y', selector: '#root', style: 'top', fn: (state) => state + 'px'},
		{id: 'zoom', selector: '#root', style: 'scale'},
	];

	#data = {

	}

	constructor(settings, childrens) {
		super();
		this.initialComponent(settings, childrens);
	}
	componentHTML() {
		return `
			<div id="root">
				<h2> Hello, I'm new Node Space Component </h2>
			</div>
		`
	}
	mapMethods = {
		1: {
			mousedown: 'startSelectionField',
			mousemove: 'selectionField',
			mouseup: 'endSelectionField'
		},
		4: {
			mousedown: 'startGrabSpace',
			mousemove: 'grabSpace',
			mouseup: 'endGrabSpace'
		}
	}


	callback = {
		handleEvent: (e, context) => {
			let methodName;
			try	{
				methodName = this.mapMethods[context.mouseButton][e.type];
			} catch{
				return false
			}
			
			
			this.stateMethods[methodName](e, context)
			return true;
		},
		sendMessage: (message) => {

		},
	};
	stateMethods = {
		startSelectionField: (e, context) => {

		},
		selectionField: (e, context) => {

		},
		endSelectionField: (e, context) => {

		},
		startGrabSpace: (e, context) => {
			context.mouseMoveEnable = true;
		},
		grabSpace: (e, context) => {
			this.states.x = this.states.x + e.movementX
			this.states.y = this.states.y + e.movementY
		},
		endGrabSpace: (e, context) => {
			context.clear()
		},
	}
}