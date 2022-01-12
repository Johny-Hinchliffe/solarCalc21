'use strict'

const annual = document.querySelector('#annual')
const bill = document.querySelector('#contract')
const rate = document.querySelector('#rate')
const kw10 = document.querySelector('#kw10')
const maxSystem = document.querySelector('#max-system')
const overide = document.querySelector('#overide')
const button = document.querySelector('.button')
const roofLink = document.querySelector('.roof-link')
const angleLink = document.querySelector('.angle-link')
const estiLink = document.querySelector('.estimate-link')
const returnLink = document.querySelector('.return-link')
const update = document.querySelector('.update-container')

const genLink = document.querySelector('.gen-link')
const genBox = document.querySelector('.gen-calc')
const roofBox = document.querySelector('.roof-calc')
const angleBox = document.querySelector('.angle-calc')
const estiBox = document.querySelector('.estimate-calc')
const returnBox = document.querySelector('.return-calc')

returnLink.addEventListener('click', function () {
	genBox.classList.add('hide')
	angleBox.classList.add('hide')
	estiBox.classList.add('hide')
	roofBox.classList.add('hide')
	update.classList.add('hide')
	returnBox.classList.remove('hide')
	return
})

roofLink.addEventListener('click', function () {
	genBox.classList.add('hide')
	angleBox.classList.add('hide')
	estiBox.classList.add('hide')
	roofBox.classList.remove('hide')
	update.classList.add('hide')
	returnBox.classList.add('hide')
})
genLink.addEventListener('click', function () {
	roofBox.classList.add('hide')
	angleBox.classList.add('hide')
	estiBox.classList.add('hide')
	genBox.classList.remove('hide')
	update.classList.add('hide')
	returnBox.classList.add('hide')
})
angleLink.addEventListener('click', function () {
	roofBox.classList.add('hide')
	genBox.classList.add('hide')
	estiBox.classList.add('hide')
	angleBox.classList.remove('hide')
	update.classList.add('hide')
	returnBox.classList.add('hide')
})

estiLink.addEventListener('click', function () {
	roofBox.classList.add('hide')
	genBox.classList.add('hide')
	angleBox.classList.add('hide')
	estiBox.classList.remove('hide')
	update.classList.add('hide')
	returnBox.classList.add('hide')
})

const solarCalc = {
	months: {
		jan: 0.03,
		feb: 0.045,
		mar: 0.088,
		april: 0.11,
		may: 0.12,
		jun: 0.135,
		july: 0.14,
		aug: 0.115,
		sept: 0.09,
		oct: 0.06,
		nov: 0.042,
		dec: 0.025,
	},
	system: function (annual, kw10, maxSystem, overide) {
		if ((!bill.value && !annual) || !kw10 || !maxSystem)
			alert('Ensure all required fields are filled dick head')
		maxSystem = maxSystem ? maxSystem / 1000 : 100
		console.log(maxSystem)
		const annual2 = annual ? annual : this.totalKWH(bill.value, rate.value)
		const avMonth = annual2 / 12
		const reqGenKW = Math.floor((avMonth / this.months.mar) * 100) / 100 //
		const optimalSystem =
			Math.round((reqGenKW / (kw10 / maxSystem)) * 100) / 100
		const systemChoice = overide
			? overide / 1000
			: maxSystem < optimalSystem
			? maxSystem
			: optimalSystem
		const actualGen =
			systemChoice != optimalSystem
				? systemChoice * (kw10 / maxSystem)
				: reqGenKW
		let result = []
		let i = 0
		let monthly = ''
		document.querySelector(
			'.div1'
		).innerHTML = `Yearly Usage: <strong>${annual2}kWh</strong>`
		document.querySelector(
			'.div2'
		).innerHTML = `Monthly Usage: <strong>${Math.round(avMonth)}kWh</strong>`
		document.querySelector('.div3').innerHTML = `Daily Usage: <strong>${
			Math.round(((avMonth * 12) / 365) * 100) / 100
		}kWh</strong>`
		document.querySelector(
			'.box1'
		).innerHTML = `Optimal System: <strong>${optimalSystem}kW</strong>`
		document.querySelector(
			'.box2'
		).innerHTML = `System Chosen: <strong>${systemChoice}kW</strong>`
		document.querySelector(
			'.box3'
		).innerHTML = `Annual Generation: <strong>${Math.round(
			actualGen
		)}kWh</strong>`
		for (const month in this.months) {
			i++
			document.querySelector(`.gen${i}`).classList.remove('good', 'ok', 'bad')
			const avGen = Math.round(actualGen * this.months[month])
			const daily = Math.floor(((avGen * 12) / 365) * 100) / 100
			const selfSuf = Math.round((avGen / avMonth) * 100)
			if (selfSuf >= 100)
				document.querySelector(`.gen${i}`).classList.add('good')
			if (selfSuf >= 50 && selfSuf < 100)
				document.querySelector(`.gen${i}`).classList.add('ok')
			if (selfSuf < 50) document.querySelector(`.gen${i}`).classList.add('bad')
			//monthly += `${month.toUpperCase()}:Day Generation: ${daily}kWh\n  Generation: ${selfSuf}%\n\n`
			document.querySelector(`.name${i}`).innerHTML = `${month.toUpperCase()}`
			document.querySelector(
				`.month${i}`
			).innerHTML = `Month Generation: <strong>${avGen}kWh</strong>`
			document.querySelector(
				`.day${i}`
			).innerHTML = `Day Generation: <strong>${daily}kWh</strong>`
			document.querySelector(
				`.gen${i}`
			).innerHTML = `Self Sufficent: ${selfSuf}%`
			result.push([month, avGen, daily, selfSuf])
		}
		// document.querySelector(`.figures`).innerHTML = monthly
		return result
	},
	totalKWH: function (bill, rate) {
		const kW = Math.round(rate ? (bill / rate) * 12 : (bill / 0.18) * 12)
		return kW
	},
}

button.addEventListener('click', function () {
	solarCalc.system(annual.value, kw10.value, maxSystem.value, overide.value)
})

// const reqGenKW = (annual, kw1) => {
// 	const reqGenKW = Math.floor((annual / kw1) * 10000) / 1000
// 	return [annual, reqGenKW, kw1]
// }

// const actualSystem = (systemAnnual) => {
// 	const [annual, reqGenKW, kw1] = systemAnnual
// 	console.log(`Annual Usage: ${annual}kWh`)
// 	console.log(`Average Monthly Usage: ${Math.ceil(annual / 12)}kWh`)
// 	console.log(`Maximum System Size: ${reqGenKW}kW `)
// 	console.log(`Yearly Generation: ${Math.floor(reqGenKW * (kw1 / 10))}kW`)
// }

// const systemPicker = (annual) => {
// 	const daily = Math.floor((annual / 365) * 100) / 100
// 	const reqGenKW = Math.floor(annual / 0.85) / 1000
// 	console.log('1) SYSTEM PICKER')
// 	console.log(
// 		`Annual = ${annual}kWh \nDaily = ${daily}kWh\nSystem Size = ${reqGenKW}kW`
// 	)
// 	console.log('___________________________________')
// 	return [reqGenKW, annual]
// }

// // console.log('1) SYSTEM PICKER')
// // systemPicker(3400)
// // console.log('___________________________________')

// const batteryPicker = (systemAnnual, home, percentOver) => {
// 	const [reqGenKW, annual] = systemAnnual
// 	const daily = annual / 365
// 	let percent = 0
// 	if (home.includes('morning') || home.includes('afternoon')) percent = 0.4
// 	if (home.includes('all day')) percent = 0.6
// 	if (home.includes('evening')) percent = 0.8
//     if(percentOver) percent = percentOver
// 	const batterySize = daily * percent
// 	console.log('Battery Picker')
// 	console.log(
// 		`Energy used: ${home} \nBattery to Daily use: ${
// 			percent * 100
// 		}%. \nBatterySize = ${batterySize}kW`
// 	)
//     console.log('___________________________________')
// }

// const batteryPickerAdvanced = (systemAnnual, home, percentOver) => {
//     const [reqGenKW, annual] = systemAnnual
//     const dailyUse = Math.floor((annual / 365) * 100) / 100
//     const yearlyGen = Math.floor(reqGenKW*1000 * 0.85)
//     const monthlyGen = yearlyGen/12
//     const dailyGen = yearlyGen/365
//     console.log(`Annual Generation: ${yearlyGen}kWh`)
//     console.log(`Monthly Generation: ${monthlyGen}kWh`)
//     console.log(`Daily Generation: ${dailyGen}`)
//     console.log(`Daily usage: ${dailyUse}kWh`)

// }

// batteryPickerAdvanced([4.5, 6000], 'evenings')

// // const meterSquared = (size, watt, panelQuantity) => {
// // 	const [width, length] = size
// // 	const m2 = width * length
// // 	const capacity = panelQuantity * watt
// // 	return capacity/6
// // }

// //console.log(meterSquared([1.055, 2.12], 455, 10))

// console.log(batteryPicker(systemPicker(3800), 'evening'))
