"use strict"

function autoscroll(targetX, targetY) {
	const xDiff = 100
	const yDiff = 100
	let [scrollX, scrollY] = [0, 0]
	if (targetX + xDiff > window.innerWidth) {
		scrollX = targetX + xDiff - window.innerWidth
	}
	else if (targetX - xDiff < 0) {
		scrollX = targetX - xDiff
	}
	if (targetY + yDiff > window.innerHeight) {
		scrollY = targetY + yDiff - window.innerHeight
	}
	else if (targetY - yDiff < 0) {
		scrollY = targetY - yDiff
	}
	scrollBy(scrollX, scrollY)
}

function convertDOMtoSVG(x, y) {
	const pt = new DOMPoint(x, y)
	const svgP = pt.matrixTransform(document.querySelector('svg').getScreenCTM().inverse())
	return {x: svgP.x, y: svgP.y}
}

class DraggingGood extends GoodMountObject {
	constructor(goodType='') {
		super(goodType, document.querySelector('.store__products'), false)
		this.dragMode = false
	}
	get inAllowedArea() {
		if (this.center.x < 0 || this.center.x > MountObject.svgObject.width) return false;
		if (this.center.y < 0 || this.center.y > MountObject.svgObject.height) return false;
		return true;
	}
	get inDropArea() {
		const dropArea = staticObjects['basket']
		if (this.center.y < dropArea.Rect.top || this.center.y > dropArea.Rect.bottom) return false;
		if (this.center.x < dropArea.Rect.left || this.center.x > dropArea.Rect.right) return false;
		return true;
	}
	moveAt(x, y) {
		const newCursorCoordinates = convertDOMtoSVG(x, y)
		if (!newCursorCoordinates) { this.endDrag(); }
		if (!this.inAllowedArea) { this.endDrag(); }
		
		autoscroll(x, y)
		this.center = newCursorCoordinates
		this.mount()
	}	
	startDrag(event) {
		if (event.cancelable) { event.preventDefault(); }

		let coordinates = event
		if (event.touches) { coordinates = event.touches[0];	}
		const x = coordinates.clientX
		const y = coordinates.clientY

		this.dragMode = true
		this.moveAt(x, y)
	}
	drag(event) {
		if (!this.dragMode) { this.endDrag(); }

		const x = event.clientX
		const y = event.clientY
		this.moveAt(x, y)
	}
	endDrag() {
		clearDragListeners()
		if (!this.dragMode) { return; }
		if (!this.inDropArea) { this.backToStore() }
		else { 
			choosedGoodsAmount += 1
			if (choosedGoodsAmount >= necessaryGoodsAmount) {
				payButton.activate()
			}
			this.dropToBasket() 
		}
		this.dragMode = false
		this.removeAssociatedDOM()
	}
	backToStore() {
		const newStoreGood = new GoodMountObject(this.goodType)
		newStoreGood.mount()
		goods[this.goodType] = newStoreGood
	}
	dropToBasket() {
		const marginBottom = 48
		const horizontalPossiblePositions = {
			start: 80,
			end: MountObject.svgObject.width - 30 - this.width
		}

		const parentNode = document.querySelector('.store-basket__inner-space')
		const choosedProduct = new GoodMountObject(this.goodType, parentNode)
		choosedProduct.y = MountObject.svgObject.height - marginBottom - this.height
		choosedProduct.x = Math.random() * 
			(horizontalPossiblePositions.end - horizontalPossiblePositions.start) +
			horizontalPossiblePositions.start
		choosedProduct.mount()
	}
}

function stopIncorrectPropagation(event) {
	if (event.currentTarget === document) {
		event.preventDefault()
		return;
	}
}

let dragFunction
let endDragFunction
let dragGood

function initializeDragObject(goodType, event) {
	goods[goodType].removeAssociatedDOM() // delete good from store
	dragGood = new DraggingGood(goodType)
	dragGood.startDrag(event)

	endDragFunction = dragGood.endDrag.bind(dragGood)
	dragFunction = dragGood.drag.bind(dragGood)

	document.addEventListener('pointermove', dragFunction, {passive: false})
	document.addEventListener('pointerup', endDragFunction)
	document.addEventListener('touchstart', stopIncorrectPropagation, {passive: false})
}

function clearDragListeners() {
	document.removeEventListener('pointermove', dragFunction, {passive: false})
	document.removeEventListener('pointerup', endDragFunction)
	document.removeEventListener('touchstart', stopIncorrectPropagation, {passive: false})
}