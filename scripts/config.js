"use strict"

const necessaryGoodsAmount = 3

const buttonParams = {
	selector: '.pay-button',
	classParams: {
		type: 'payButton',
		width: 174,
		height: 56
	}
}

const staticObjectsParams = [
	{
		selector: '.store_empty',
		classParams: {
			type: 'store',
			width: 212,
			height: 432,
		}
	},
	{
		selector: '.store__store-basket',
		classParams: {
			type: 'basket',
			width: 277,
			height: 229,
		}
	},
]

const goodsParams = {
	wine:		{y: 25,  x: 66,  width: 37, height: 125},
	milk:		{y: 59,  x: 108, width: 37, height: 91},
	jam:		{y: 108, x: 147, width: 46, height: 42},
	cheese: 	{y: 117, x: 202, width: 37, height: 35},
	meat:		{y: 195, x: 51,  width: 54, height: 54},
	chicken:	{y: 197, x: 102, width: 66, height: 63},
	chips: 		{y: 204, x: 173, width: 77, height: 47},
	pineapple: 	{y: 265, x: 57,  width: 35, height: 75},
	banana: 	{y: 293, x: 102, width: 47, height: 48},
	apple:		{y: 304, x: 159, width: 31, height: 36},
	onion:		{y: 295, x: 200, width: 62, height: 51},
}