import {DragBlockComponent} from '../components/componentsAll.js'

class InitialComponents {
	constructor(manager) {
		this.manager = manager;
	}


	#componentsTypeInitial = {
		controlTypeInitial: {
			checkbox: (data, input, output) => {
				return new ControlComponent_checkbox(data, {input, output}).setManager(this.manager.callback);
			},
			slider: (data, input, output) => {
				return new ControlComponent_slider(data, {input, output}).setManager(this.manager.callback);
			},
			color: (data, input, output) => {
				return new ControlComponent_color(data, {input, output}).setManager(this.manager.callback);
			},
			inputText: (data, input, output) => {
				return new ControlComponent_inputText(data, {input, output}).setManager(this.manager.callback);
			},
			inputFile: (data, input, output) => {
				return new ControlComponent_inputFile(data, {input, output}).setManager(this.manager.callback);
			},
			button: (data, input, output) => {
				return new ControlComponent_button(data, {input, output}).setManager(this.manager.callback);
			},
			universal: (data, input, output) => {
				const universalType = data.universalType;
				return new ControlComponent_universal(data, {input, output}).setManager(this.manager.callback);
			},
			dropdown: (data, input, output) => {
				return new ControlComponent_dropdown(data, {input, output}).setManager(this.manager.callback);
			},
			listbox: (data, input, output) => {
				return new ControlComponent_listbox(data, {input, output}).setManager(this.manager.callback);
			},
		},
		control: (data) => {
			const {input, output, typeControl, ...dataSettings} = data;

			const control = this.#componentsTypeInitial[typeControl](dataSettings, this.parserToComponents(input), this.parserToComponents(output))
			this.manager.addClassListener('control', id, control);
			return control;
		},
		input: (data) => {
			const input = new InputComponent(data).setManager(this.manager.callback);

			this.manager.addClassListener('input', id, input);
			return output;
		},
		output: (data) => {
			const output = new OutputComponent(data).setManager(this.manager.callback);

			this.manager.addClassListener('output', id, output);
			return output;
		},
		groupHorizontal: (data) => {
			let {childrens, ...dataSettings} = data;
			childrens = this.initialChildren(childrens);

			const group = new GroupHorisontalComponent(dataSettings, childrens);
			return group;
		},
		groupVertical: (data) => {
			let {childrens, ...dataSettings} = data;
			childrens = this.initialChildren(childrens);

			const group = new GroupVerticalComponent(dataSettings, childrens);
			return group;
		},
		block: (data) => {
			let {typeBlock, childrens, ...dataSettings} = data;
			childrens = this.initialChildren(childrens);
			
			const typeBlockData = BlockManager.typeBlockData[typeBlock];
			const block = new DragBlockComponent({...dataSettings, typeBlockData}, childrens).setManager(this.manager.callback);
			return block;	
		},
	}

	initialChildren(childrensData) {
		if(!childrensData) return;

		let childrens = {};
		for (let child of childrensData) {
			childrens[child.id] = this.parserToComponents(child);
		}
		return childrens;	 // {id: new class,} / {id: {class:, root: },}
	}

	parserToComponents(data) {
		if(!data) return null;
		let type = data.type;
		return this.#componentsTypeInitial[type](data);
	}

	initialBlock(data, rootComponent) {
		const block = this.parserToComponents(data);
		rootComponent.addChildren(block);
		
		return block;
	}
}


export default class BlockManager{
	#components = {};

	static setTypeBlockData(typeBlockData) {
		BlockManager.typeBlockData = typeBlockData;
	}
	static typeBlockData;

	#blockComponent;

	#logic;

	constructor(blockData, rootComponent) {
		this.#blockComponent = new InitialComponents(this).initialBlock(blockData.interfaceData, rootComponent);
		this.#logic = new BlockLogic(this, blockData.functionBlock);
	}

	addClassListener(type, id, component) {
		this.#components[type][id] = component; //input, output, control, folder
	}

	callback = {
		sendValue: (id, value) => {

		}
	}
}

class BlockLogic {
	#parent;

	constructor(parent, functionBlock) {
		this.#parent = parent;
		this.calculate = functionBlock;
	}
}