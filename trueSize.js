const btn = document.querySelector('.angle-btn')
const roofAngle = document.querySelector('#roof-angle2')
const roof = document.querySelector('#roof-width2')
const trueDistance = document.querySelector('#roof-pitch')
const result = document.querySelector('.angle-result')
const result2 = document.querySelector('.angle-result2')
const measurement = document.querySelector('#measurement')
const halfRoof = document.querySelector('#half-roof')

const costOfSystem = document.querySelector('#quote')
const firstYearSaving = document.querySelector('#saving')
const quoteBtn = document.querySelector('.quote-btn')
const container = document.querySelector('.ret-side-box2')
const container2 = document.querySelector('.ret-side-box')

const scenario = document.querySelector('.scenario')

const trueSize = (angle, length, trueDis, half, meas) => {
	if (!angle || !length)
		return alert('You need to fill in all the inputs you silly goose')
	const radians = Math.cos((angle * Math.PI) / 180)
	if (trueDis) {
		const width = length / 2
		const text = `True Roof Width:` 
		result.innerHTML = `${text} <strong>${
			Math.floor((width / radians) * 100) / 100
		}m</strong>`
	} else {
		if (!half || !meas)
		return alert('Do you see those inputs under distance... Fill them in ok?')
		const pitchCalc = (w, p) => {
			const width = w
			const radians = Math.cos((p * Math.PI) / 180)
			const wholeDist = Math.floor((width / radians) * 100) / 100
			return wholeDist
		}
		const roofDiff = half / (length / 2)
		const trueMeas = meas / roofDiff
		result2.innerHTML = `True Measurement: <strong>${pitchCalc(trueMeas,angle)}m</strong>`
	}

}


btn.addEventListener('click', function () {
	if(trueDistance.checked)trueSize(roofAngle.value, roof.value, trueDistance.checked)
	else trueSize(roofAngle.value, roof.value, trueDistance.checked, halfRoof.value, measurement.value)
})

const returnOfInvestment = (totalYearSave, investment, type) => {
	let result = Number(totalYearSave)
	let saving = 0
	let stop = false
	let returnPeriod = 0

	let percent = type == 1 ? 0 : type === 2 ? 2.15 : 4.39
	for(let i = 1; i < 26; i++){
		saving += result
		if(saving > Number(investment) && stop === false){ 
			returnPeriod = i
			stop = true
		}
		result += ((result/100) * percent)

		}
		container.innerHTML = `In 25 years you will get a return of £${Math.round(saving)}`
		container2.innerHTML = `It will take ${returnPeriod} years to see a return in your investment`

}

quoteBtn.addEventListener('click', function() {
	returnOfInvestment(firstYearSaving.value, costOfSystem.value, Number(scenario.value))
})


