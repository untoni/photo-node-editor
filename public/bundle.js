(() => {
  // src/core/Components.js
  function render(component, root2) {
    const element = component.getElement();
    root2.append(element);
  }
  var ElementClassMap = class _ElementClassMap {
    static map = /* @__PURE__ */ new Map();
    constructor() {
    }
    static bindElementToClass(element, classBind) {
      _ElementClassMap.map.set(element, classBind);
    }
    static getClass(element) {
      return _ElementClassMap.map.get(element);
    }
  };
  var InteractionController = class _InteractionController extends ElementClassMap {
    static mark;
    static mouseContext = {};
    static setMark(mark) {
      _InteractionController.mark = mark;
    }
    static startObserwe() {
      window.addEventListener("mousedown", (e) => {
        const target = e.target.closest(_InteractionController.mark);
        let targetClass = ElementClassMap.getClass(target);
        console.log(target);
      });
      window.addEventListener("mousemove", (e) => {
        const target = e.target.closest(_InteractionController.mark);
        let targetClass = ElementClassMap.getClass(target);
        console.log(target);
      });
      window.addEventListener("mouseup", (e) => {
        const target = e.target.closest(_InteractionController.mark);
        let targetClass = ElementClassMap.getClass(target);
        console.log(target);
      });
    }
  };
  InteractionController.setMark("action");
  var InteractionComponent = class extends InteractionController {
    #root;
    #myElement;
    #settings;
    #childrens = {};
    // {id: {class: , element: , }}
    #childrensSequence = [];
    #state;
    // {id: {el, value}, }
    #managerCallback;
    #parentCallback;
    #componentHTML() {
    }
    #classElement;
    #subComponents;
    #stateElements;
    #callback = {};
    constructor(settings, childrens) {
      this.#initialComponent(settings, childrens);
    }
    #initialComponent(settings, childrens) {
      this.#settings = settings;
      const html = this.#componentHTML(settings);
      const element = document.creatyElement("div");
      element.innerHTML = html;
      element.classList.add(this.#classElement);
      element.setAttribute(InteractionController.mark, true);
      this.#root = element.querySelector("#root");
      this.#initialSubComponent(this.#subComponents);
      this.#initialState(element);
      this.#setInitialState(settings.states);
      this.#addChildrens(childrens);
      this.#initialElement(element);
    }
    #initialSubComponent(subComponents) {
      if (!subComponents) return;
      for (const { id: id2, root: root2, component, manager } of subComponents) {
        if (manager) component.setManager(this.#managerCallback);
        this.addChildren(component, id2, root2);
      }
    }
    #initialState(element) {
      if (!this.#stateElements) return;
      for (let { id: id2, selector, style, fn } of this.#stateElements) {
        const stateElement = element.querySelector(selector);
        let _value = 0;
        let setter = (value) => {
          _value = value;
          stateElement.style[style] = fn ? fn(value) : value;
        };
        Object.defineProperty(this.#state, id2, {
          get() {
            return _value;
          },
          set: setter
        });
      }
    }
    #setInitialState(states) {
      for (let [id2, value] of Object.entries(states)) {
        this.#state[id2] = value;
      }
    }
    #addChildrens(childrens) {
      if (!childrens) return;
      for (let id2 in childrens) {
        const child = childrens[id2];
        this.addChildren(child, id2);
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
    addChildren(child, id2, root2 = this.#root, insertBefore) {
      const element = child.getElement(this.#callback);
      this.#childrens[id2] = { class: child, element };
      if (root2 === this.#root) {
        this.#childrensSequence.push(id2);
      }
      root2.append(element);
    }
  };

  // src/components/componentsAll.js
  var DragBlockComponent = class extends InteractionComponent {
    #classElement = "drag-block";
    #subComponents = [
      { id: "switchBlock", root: ".block-header", component: new OpenCloseComponent({ value: true }) }
    ];
    #stateElements = [
      { id: "x", selector: "this", style: "left" },
      //[id, selectorJs, style]
      { id: "y", selector: "this", style: "top" },
      { id: "width", selector: "this", style: "width" },
      { id: "height", selector: "this", style: "height" }
    ];
    constructor(settings, childrens) {
      super(settings, childrens);
    }
    #componentHTML({ name, typeBlockData }) {
      return `
				<div>
					<div class="block-header" style="background: ${typeBlockData.color};"> </sub-component id="switch" class="new OpenCloseComponent({value: true})"> ${Name} </div>
					<div id="root"></div>
				</div>
			`;
    }
    #callback = {
      handleEvent: (e, mouseContext) => {
      },
      sendMessage: (message) => {
      },
      open: () => {
      },
      close: () => {
      }
    };
    #triggerEvent;
    #stateMethods = {
      mousedown: (e, mouseContext) => {
      }
    };
  };
  var NodeSpaceComponent = class extends InteractionComponent {
    #classElement = "node-space";
    #stateElements = [
      { id: "x", selector: "#root", style: "left" },
      { id: "y", selector: "#root", style: "top" },
      { id: "zoom", selector: "#root", style: "scale" }
    ];
    #data = {};
    constructor(settings, childrens) {
      super(settings, childrens);
    }
    #myHTML() {
      return `
			<div id="root">

			</div>
		`;
    }
    #callback = {};
    #stateMethods = {
      mousedown: (e, mouseContext) => {
      }
    };
  };

  // src/core/Manager.js
  var InitialComponents = class {
    constructor(manager) {
      this.manager = manager;
    }
    #componentsTypeInitial = {
      controlTypeInitial: {
        checkbox: (data, input, output2) => {
          return new ControlComponent_checkbox(data, { input, output: output2 }).setManager(this.manager.callback);
        },
        slider: (data, input, output2) => {
          return new ControlComponent_slider(data, { input, output: output2 }).setManager(this.manager.callback);
        },
        color: (data, input, output2) => {
          return new ControlComponent_color(data, { input, output: output2 }).setManager(this.manager.callback);
        },
        inputText: (data, input, output2) => {
          return new ControlComponent_inputText(data, { input, output: output2 }).setManager(this.manager.callback);
        },
        inputFile: (data, input, output2) => {
          return new ControlComponent_inputFile(data, { input, output: output2 }).setManager(this.manager.callback);
        },
        button: (data, input, output2) => {
          return new ControlComponent_button(data, { input, output: output2 }).setManager(this.manager.callback);
        },
        universal: (data, input, output2) => {
          const universalType = data.universalType;
          return new ControlComponent_universal(data, { input, output: output2 }).setManager(this.manager.callback);
        },
        dropdown: (data, input, output2) => {
          return new ControlComponent_dropdown(data, { input, output: output2 }).setManager(this.manager.callback);
        },
        listbox: (data, input, output2) => {
          return new ControlComponent_listbox(data, { input, output: output2 }).setManager(this.manager.callback);
        }
      },
      control: (data) => {
        const { input, output: output2, typeControl, ...dataSettings } = data;
        const control = this.#componentsTypeInitial[typeControl](dataSettings, this.parserToComponents(input), this.parserToComponents(output2));
        this.manager.addClassListener("control", id, control);
        return control;
      },
      input: (data) => {
        const input = new InputComponent(data).setManager(this.manager.callback);
        this.manager.addClassListener("input", id, input);
        return output;
      },
      output: (data) => {
        const output2 = new OutputComponent(data).setManager(this.manager.callback);
        this.manager.addClassListener("output", id, output2);
        return output2;
      },
      groupHorizontal: (data) => {
        let { childrens, ...dataSettings } = data;
        childrens = this.initialChildren(childrens);
        const group = new GroupHorisontalComponent(dataSettings, childrens);
        return group;
      },
      groupVertical: (data) => {
        let { childrens, ...dataSettings } = data;
        childrens = this.initialChildren(childrens);
        const group = new GroupVerticalComponent(dataSettings, childrens);
        return group;
      },
      block: (data) => {
        let { typeBlock, childrens, ...dataSettings } = data;
        childrens = this.initialChildren(childrens);
        const typeBlockData = BlockManager.typeBlockData[typeBlock];
        const block = new DragBlockComponent({ ...dataSettings, typeBlockData }, childrens).setManager(this.manager.callback);
        return block;
      }
    };
    initialChildren(childrensData) {
      if (!childrensData) return;
      let childrens = {};
      for (let child of childrensData) {
        childrens[child.id] = this.parserToComponents(child);
      }
      return childrens;
    }
    parserToComponents(data) {
      if (!data) return null;
      let type = data.type;
      return this.#componentsTypeInitial[type](data);
    }
    initialBlock(data, rootComponent) {
      const block = this.parserToComponents(data);
      rootComponent.addChildren(block);
      return block;
    }
  };
  var BlockManager = class _BlockManager {
    #components = {};
    static setTypeBlockData(typeBlockData) {
      _BlockManager.typeBlockData = typeBlockData;
    }
    static typeBlockData;
    #blockComponent;
    #logic;
    constructor(blockData, rootComponent) {
      this.#blockComponent = new InitialComponents(this).initialBlock(blockData.interfaceData, rootComponent);
      this.#logic = new BlockLogic(this, blockData.functionBlock);
    }
    addClassListener(type, id2, component) {
      this.#components[type][id2] = component;
    }
    callback = {
      sendValue: (id2, value) => {
      }
    };
  };
  var BlockLogic = class {
    #parent;
    constructor(parent, functionBlock) {
      this.#parent = parent;
      this.calculate = functionBlock;
    }
  };

  // src/index.js
  BlockManager.setTypeBlockData({});
  var nodeSpace = new NodeSpaceComponent({ states: { zoom: 1, x: 0, y: 0 } });
  var root = document.querySelector("#root");
  render(nodeSpace, root);
  for (let i = 0; i < 3; i++) {
    nodeSpace.addChildren(new DragBlockComponent(
      {
        name: `block${i + 1}`,
        states: {
          width: 300,
          height: 400,
          x: Math.random() * 600 - 300,
          y: Math.random() * 600 - 300
        },
        typeBlockData: { color: "#495f92" }
      },
      null
    ));
  }
})();
//# sourceMappingURL=bundle.js.map
