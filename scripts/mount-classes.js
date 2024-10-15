"use strict"

class MountObjectRect {
	constructor(width=0, height=0, x=0, y=0) {
		this.width = width;
		this.height = height;
		this.x = x; // x-coordinate of left top corner
		this.y = y; // y-coordinate of left top corner 
	}
	get center() {
		const centerX = this.x + this.width / 2
		const centerY = this.y + this.height / 2
		return {x: centerX, y: centerY};
	}
	set center(newCenter) {
		this.x += newCenter.x - this.center.x
		this.y += newCenter.y - this.center.y
	}
	get transform() {
		return `translate(${this.x} ${this.y})`
	}
	get Rect() {
		return {
			top: this.y, left: this.x, 
			bottom: this.y + this.height,
			right: this.x + this.width,
		}
	}
}

class MountObject extends MountObjectRect {
	static svgObject = new MountObjectRect(300, 600); // global svg plot
	#objectType;

	constructor(DOMLink=null, type='', width=0, height=0, x=0, y=0) {
		super(width, height, x, y);
		this.#objectType = type;
		this.DOMLink = DOMLink;
	}
	updateAssociatedDOM() {
		const associatedDOM = this.DOMLink
		const attributesArray = ['width', 'height', 'x', 'y']
		if (!associatedDOM) {
			throw new Error('No associated DOM, invalid selector!');
		}
	
		for (const attribute of attributesArray) {
			associatedDOM.setAttribute(attribute, this[attribute]);
		}
	}
	removeAssociatedDOM() {
		if (this.DOMLink) {
			this.DOMLink.remove()
		}
	}
	mount() {
		const svgObject = MountObject.svgObject
		switch (this.#objectType) {
			case 'store': {
				const paddingTop = 28
				this.center = { x: svgObject.center.x, y: paddingTop + this.center.y }
				break;
			}
			case 'basket': {
				this.center = { x: svgObject.center.x, y: svgObject.height - this.center.y }
				break;
			}
		}
		this.updateAssociatedDOM()
	}
}

class ButtonObject extends MountObject {
	updateAssociatedDOM() {
		const associatedDOM = this.DOMLink
		associatedDOM.setAttribute('transform', this.transform)

		const associatedRect = associatedDOM.querySelector('image')
		associatedRect.setAttribute('width', this.width)
		associatedRect.setAttribute('height', this.height)

		const associatedText = associatedDOM.querySelector('text')
		associatedText.setAttribute('x', this.width / 2)
		associatedText.setAttribute('y', this.height / 2)
	}
	mount() {
		const svgObject = MountObject.svgObject 
		const paddingTop = 524
		this.center = { x: svgObject.center.x, y: paddingTop + this.center.y }
		this.updateAssociatedDOM()
	}
	activate() {
		this.DOMLink.classList.remove('pay-button_inactive')
		this.DOMLink.classList.add('pay-button_active')
	}
}

class GoodMountObject extends MountObject {
	static typeParams = goodsParams // config.js

	constructor(goodType='', parentNode=document.querySelector('.store__products'), passiveMode=true) {		
		const associatedDOM = document.createElementNS("http://www.w3.org/2000/svg", "image") 
		associatedDOM.setAttribute('href', `assets/store-food/${goodType}.svg`)
		if (passiveMode === true) {
			associatedDOM.setAttribute('tabindex', 0)
			associatedDOM.classList.add('store__product', 'store__product_passive')
			associatedDOM.addEventListener('mousedown', (event) => { initializeDragObject(goodType, event)})
			associatedDOM.addEventListener('touchstart', (event) => { initializeDragObject(goodType, event)})
		}
		else {
			associatedDOM.classList.add('store__product', 'store__product_targeted')
		}
		parentNode.appendChild(associatedDOM)

		const goodParams = GoodMountObject.typeParams[goodType]

		super(associatedDOM, 'good', goodParams.width, goodParams.height, goodParams.x, goodParams.y)
		this.goodType = goodType
	}
}