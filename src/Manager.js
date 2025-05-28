import Components from './Components'

class InitialComponents {
	constructor(manager, typeBlockData) {
		this.manager = manager;
		this.typeBlockData = typeBlockData;
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
		}
		control: (data) => {
			const {input, output, ...dataSettings} = data;

			const control = this.#componentsTypeInitial.[typeData]({id, name, paramenters}, this.parserToComponents(input), this.parserToComponents(output))
			this.manager.addClassListener('control', id, control);
			return control;
		}
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

			const typeBlockData = this.typeBlockData[typeBlock];
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
	#blockComponent;

	#logic;

	constructor(blockData, rootComponent, typeBlockData) {
		this.#blockComponent = new InitialComponents(this, , typeBlockData)
															.initialBlock(blockData.interfaceData, rootComponent);
		this.#logic = new BlockLogic(this, blockData.functionBlock);
	}

	addClassListener(type, id, component) {
		this.#components[type][id] = component; //input, output, control, folder
	}

	callback() {

	}
}

class BlockLogic {
	#parent;

	constructor(parent, functionBlock) {
		this.#parent = parent;
		this.calculate = functionBlock;
	}
}