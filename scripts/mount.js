"use strict"

function mountStaticObjects(paramsArray) { // store-bacground and basket
	const staticObjects = {}
	for (const mountObjectParams of paramsArray) {
		const classParams = Object.values(mountObjectParams.classParams)
		const DOMLink = document.querySelector(mountObjectParams.selector)
		const mountObject = new MountObject(DOMLink, ...classParams)
		mountObject.mount()
		staticObjects[mountObjectParams.classParams.type] = mountObject
	}
	return staticObjects
}

function mountGoods() {
	const goods = {}
	for (const goodType in GoodMountObject.typeParams) {
		const goodMountObject = new GoodMountObject(goodType)
		goodMountObject.mount()
		goods[goodType] = goodMountObject
	}
	return goods
}

function mountPayButton(buttonParams) {
	const classParams = Object.values(buttonParams.classParams)
	const DOMLink = document.querySelector(buttonParams.selector)
	const buttonObject = new ButtonObject(DOMLink, ...classParams)
	buttonObject.mount()
	return buttonObject
}

let staticObjects //  store-background and basket
let payButton
let goods
let choosedGoodsAmount = 0

document.addEventListener("DOMContentLoaded", () => {
	staticObjects = mountStaticObjects(staticObjectsParams) // store-background and basket, params from config.js
	goods = mountGoods()
	payButton = mountPayButton(buttonParams) //params from config.js
})

