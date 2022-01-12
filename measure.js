'use strict'

const panelChoice = document.querySelector('#panels')
const roofWidth = document.querySelector('#roof-width')
const roofHeight = document.querySelector('#roof-height')
const roofType = document.querySelector('#roof-type')
const hipAngle = document.querySelector('#hip-angle')
const total = document.querySelector('.total')
const systemS = document.querySelector('.system-s')
const array = document.querySelector('.array')
const roofBtn = document.querySelector('.roof-btn')
const tryAllBtn = document.querySelector('.all-btn')

const roofResults = document.querySelector('.roof-results')
const spareTB = document.querySelector('.spare-top')
const spareSide = document.querySelector('.spare-side')
const extra = document.querySelector('.extra')
const lay = document.querySelector('.lay')
const sideBox = document.querySelector('.side-box')
const orien = document.querySelector('#orien')
const panelInfo = document.querySelector('.panel-info')

const solar = {
	panel: {
		ja320: {
			name: 'Ja Solar 320W',
			effic: 19,
			warrenty: [10,25],
			watt: 320,
			width: 0.996,
			length: 1.689,
		},
		ja330: {
			name: 'Ja Solar 330W',
			effic: 19.6,
			warrenty: [12,25],
			watt: 330,
			width: 0.996,
			length: 1.689,
		},
		ja385: {
			name: 'Ja Solar 385W',
			effic: 20.7,
			warrenty: [12,25],
			watt: 385,
			width: 1.052,
			length: 1.769,
		},
		ja400: {
			name: 'Ja Solar 400W',
			effic: 20.5,
			warrenty: [12,25],
			watt: 400,
			width: 1.134,
			length: 1.722,
		},
		ja405B: {
			name: 'Ja Solar 405W Black',
			effic: 20.7,
			warrenty: [12,25],
			watt: 405,
			width: 1.134,
			length: 1.722,
		},
		ja405S: {
			name: 'Ja Solar 405W Silver',
			effic: 20.2,
			warrenty: [12,25],
			watt: 405,
			width: 0.996,
			length: 2.015,
		},
		ja450: {
			name: 'Ja Solar 450W',
			effic: 20.2,
			warrenty: [12,25],
			watt: 450,
			width: 1.052,
			length: 2.12,
		},
		ja455: {
			name: 'Ja Solar 455W',
			effic: 20.4,
			warrenty: [12,25],
			watt: 455,
			width: 1.052,
			length: 2.12,
		},
		viridian320: {
			name: 'Viridian 320W',
			effic: 19.7,
			warrenty: [10,25],
			watt: 320,
			width: 0.992,
			length: 1.64,
		},
		qcells335: {
			name: 'Q Cells 335W',
			effic: 19.4,
			warrenty: [12,25],
			watt: 335,
			width: 1.03,
			length: 1.673,
		},
		qcells380: {
			name: 'Q Cells 380W',
			effic: 20.1,
			warrenty: [12,25],
			watt: 380,
			width: 1.03,
			length: 1.84,
		},
		jinko335: {
			name: 'Jinko 335W',
			effic: 19.9,
			warrenty: [12,25],
			watt: 335,
			width: 1.002,
			length: 1.684,
		},
		canadian420: {
			name: 'Canadian 420W',
			effic: 19,
			warrenty: [12,25],
			watt: 420,
			width: 1.048,
			length: 2.108,
		},
		lg380: {
			name: 'LG 380W',
			effic: 20.6,
			warrenty: [25,25],
			watt: 380,
			width: 1.042,
			length: 1.768,
		},
		lg440: {
			name: 'LG 440W',
			effic: 19.8,
			warrenty: [25,25],
			watt: 440,
			width: 1.042,
			length: 2.13,
		},
		rec400: {
			name: 'REC 400W',
			effic: 21.6,
			warrenty: [25,25],
			watt: 400,
			width: 1.016,
			length: 1.821,
		},
	},
	tryAll: () => {
		if (!roofHeight.value || !roofWidth.value)
			return alert("You gotta fill them up if you want to try 'em all")
		else if (
			roofType.value === 'hip' && !hipAngle.value ||
			(roofType.value === 'half-hip' && !hipAngle.value)
		)
			return alert(
				"Funny how it doesn't work unless you fill in all the required inputs"
			)
		while (sideBox.firstChild) sideBox.removeChild(sideBox.firstChild)
		let result = []
		let i = 1
		for (let pan in solar.panel) {
			const portrait = solar.roofCalc(
				roofHeight.value,
				roofWidth.value,
				hipAngle.value,
				solar.panel[pan].name,
				roofType.value,
				'portrait'
			)
			const landscape = solar.roofCalc(
				roofHeight.value,
				roofWidth.value,
				hipAngle.value,
				solar.panel[pan].name,
				roofType.value,
				'landscape'
			)

			portrait.size >= landscape.size
				? result.push(portrait)
				: result.push(landscape)
		}
		result = result.sort((a, b) => b.size - a.size)
		for (let x = 0; x < 10; x++) {
			sideBox.innerHTML += `${x + 1}) ${result[x].panel.name} in ${
				result[x].orien
			} | System: <strong>${
				result[x].size / 1000
			}kWp</strong> | Panels: <strong>${result[x].totalArray}</strong><br><br>`
		}
	},
	roofCalc: (roofHeight, roofWidth, angle, panelName, type, orien) => {
		//Alerts for Missing inputs
		if (!roofHeight || !roofWidth)
			return alert(
				"What's the height AND width you silly billy!"
			)
		if ((type === 'hip' && !angle) || (type === 'half-hip' && !angle))
			return alert(
				"The angle of the hip would be useful right now..."
			)

		let roofW = roofWidth
		let roofH = roofHeight
		let panel = {}
		let distance = 0
		
		// Select the chosen panel
		for (let pan in solar.panel) {
			if (solar.panel[pan].name === panelName) {
				panel = { ...solar.panel[pan] }
				if (orien === 'landscape')
				[panel.length, panel.width] = [
					solar.panel[pan].width,
					solar.panel[pan].length,
				]
			}
		}
		//add 2cm for space between
		panel.width += 0.02
		panel.length += 0.02
		
		//half width for hip
		if (type === 'hip') roofW /= 2

		distance = (type === 'gable') ? 0 : panel.length / Math.tan((angle * Math.PI) / 180)
		let result = []
		let overSide = []
		let overTop = 0

		while (roofH >= panel.length && roofW >= panel.width + distance) {
			roofH -= panel.length
			if (type === 'half-hip' || type === 'hip') {
				roofW -= distance
			}
			let numPanels = Math.floor(roofW / panel.width)
			let widthLeft = roofW - (panel.width * numPanels)
			console.log('roofWidth', roofW)
			console.log(panel.width)
			if (type === 'hip') {
				widthLeft *= 2
				if (widthLeft > panel.width) {
					numPanels += 0.5
					widthLeft -= panel.width
				}
				overSide.push(widthLeft)
				result.push(numPanels * 2)
			} else {
				result.push(numPanels * 1)
				overSide.push(widthLeft)
			}
		}
		distance = Math.ceil(distance * 100) / 100
		overSide = overSide.map((el) => Math.floor((el + 0.02) * 100) / 100)
		overTop = Math.floor((roofH + 0.02) * 100) / 100
		const totalArray = result.length > 0 ? result.reduce((a, b) => a * 1 + b * 1) : alert(
			"You won't be able to fit a single panel on there matey!"
			)
		const system = totalArray * panel.watt
		const systemChoice = {
			panel: panel,
			array: result,
			totalArray,
			rows: result.length,
			size: system,
			spareSide: overSide,
			roofW,
			spareTop: overTop,
			distance,
			type,
			orien,
		}
		return systemChoice
	},
	result: (system) => {
		const el = document.querySelector('.extra')
		spareSide.classList.remove('good', 'ok', 'bad')
		spareTB.classList.remove('good', 'ok', 'bad')
		while (el.firstChild) el.removeChild(el.firstChild)
		total.innerHTML = `Total Panels: <strong>${system.totalArray} ${system.panel.name}</strong>`
		systemS.innerHTML = `System Size: <strong>${system.size / 1000}kWp</strong>`
		spareTB.innerHTML = `Spare Space on Top: <strong>${system.spareTop}m</strong>`
		panelInfo.innerHTML = `Efficency: <strong>${system.panel.effic}%</strong><br>Width: <strong>${system.panel.width*1000-20}mm</strong><br>Height: <strong>${system.panel.length*1000-20}mm</strong>`
		if (system.spareTop >= 0.25 && system.spareTop[0] < 0.5)
			spareTB.classList.add('ok')
		if (system.spareTop >= 0.5) spareTB.classList.add('good')
		if (system.spareTop < 0.25) spareTB.classList.add('bad')
		if (system.type === 'gable') {
			lay.classList.add('hide')
			extra.classList.add('hide')
			array.innerHTML = `Array layout: <strong>${system.array.join(
				' | '
			)}</strong>`
			spareSide.innerHTML = `Spare Space on Sides: <strong>${system.spareSide[0]}m</strong>`
			if (system.spareSide[0] >= 0.25 && system.spareSide[0] < 0.5)
				spareSide.classList.add('ok')
			if (system.spareSide[0] >= 0.5) spareSide.classList.add('good')
			if (system.spareSide[0] < 0.25) spareSide.classList.add('bad')
		} else {
			lay.classList.remove('hide')
			extra.classList.remove('hide')

			array.innerHTML = `Array layout: <strong>${system.array.join(
				' | '
			)}</strong>`
			spareSide.innerHTML = `Distance from Corner: <strong>${system.distance}m</strong>`
			for (let z = 0; z < system.array.length; z++) {
				const div = document.createElement('div')
				div.innerHTML = `Row <strong>${z + 1}: ${
					system.array[z]
				} panels, <br>Spare Space <strong>${system.spareSide[z]}m</strong>,\n`
				if (system.spareSide[z] >= 0.25 && system.spareSide[z] < 0.5)
					div.classList.add('ok')
				if (system.spareSide[z] >= 0.5) div.classList.add('good')
				if (system.spareSide[z] < 0.25) div.classList.add('bad')
				extra.appendChild(div)
			}
		}
		if(system.spareTop >= system.panel.width && system.roofW >= system.panel.length+system.distance){
			const div = document.createElement('div')
				div.innerHTML = `*<strong>You should be able to fit one or more panels on top in ${system.orien === 'landscape' ? 'portrait' : 'landscape'}</strong>*`
				extra.classList.remove('hide')
				extra.appendChild(div)
		}
	},
}

roofBtn.addEventListener('click', function () {
	solar.result(
		solar.roofCalc(
			roofHeight.value,
			roofWidth.value,
			hipAngle.value,
			panelChoice.value,
			roofType.value,
			orien.value
		)
	)
})


tryAllBtn.addEventListener('click', function () {
	solar.tryAll()
})

// let input1 = 55.71
// let input2 = 754.32
// const input3 = 9186
// let totalSave = input1+input2

// const returnNoInf = Math.floor((input3 / totalSave)*10)/10

// const return2percent = (SEG, Bill, solarPrice) => {
// 	let Return = 0
// 	let i = 0
// 	while(solarPrice > Return){
// 		Return += Bill + SEG
// 		Bill += (Bill/100)*2
// 		SEG += (SEG/100)*2

// 		i++
// }
// return i

// }
// console.log(return2percent(input1, input2, input3))

// const noInf25 = (input) => Math.round(input *25)
// console.log(`Based on no infation: £${noInf25(totalSave)}`)

// const twoInf25 = (input) =>{
// 	let Return = 0
// 	let i = 0
// 	while(i < 25){
// 		console.log(input, (input/100)*2)
// 		Return += input
// 		input += (input/100)*2

// 		i++
// }
// return Return



// }
// console.log(`Based 2% infation: £${twoInf25(totalSave)}`)







const trueDist = (wholeRoof, halfRoof, pitch, measurement) => {
	if (!pitch || !wholeRoof)
	alert('You need to fill in all the inputs you silly goose')
	
	const pitchCalc = (w,p) => {
	const width = w 
	const radians = Math.cos((p * Math.PI) / 180)
	const wholeDist = Math.floor((width / radians) * 100) / 100
	return wholeDist
}

	
const roofDiff = halfRoof/(wholeRoof /2)
const trueMeas = measurement / roofDiff
}
