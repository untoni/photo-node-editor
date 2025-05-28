

export class DragBlockComponent extends InteractionComponent {
	#classElement = 'drag-block';
	#subComponents = [
		{id: 'switchBlock', root: '.block-header', component: new OpenCloseComponent({value: true})},
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



export class BlockSpace extends InteractionComponent {
	#classElement = 'block-space';
	#stateElements = [
		{id: 'x', selector: '#root', style: 'left'},
		{id: 'y', selector: '#root', style: 'top'},
		{id: 'zoom', selector: '#root', style: 'scale'},
	];

	constructor(settings, childrens) {
		super(settings, childrens);
	}
	#myHTML() {
		return `
			<div id="root">

			</div>
		`
	}
}