const results = document.querySelector('.est-side-box')
const results2 = document.querySelector('.est-side-box2')

const estBtn = document.querySelector('.esti-btn')
const slate = document.querySelector('#slate')
const london = document.querySelector('#london')
const optimizer = document.querySelector('#optimizer')
const scaffold = document.querySelector('#scaffold')
const prefSyst = document.querySelector('#pref-sy')
const estiField = document.querySelector('.esti-field')

const estimate = {
	prices: {
		one: {
			size: 1,
			panels: 3,
			cheap: [2182, 2970],
			pricey: [2592, 6582],
		},
		two: {
			size: 2,
			panels: 4,
			cheap: [2865, 4723],
			pricey: [3663, 6781],
		},
		three: {
			size: 3,
			panels: 7,
			cheap: [3516, 6235],
			pricey: [4923, 8472],
		},
		four: {
			size: 4,
			panels: 9,
			cheap: [4104, 6718],
			pricey: [5857, 10078],
		},
		five: {
			// 10kw batt may be good idea
			size: 5,
			panels: 11,
			cheap: [4692, 7338],
			pricey: [6823, 13644],
		},
		six: {
			size: 6,
			panels: 13,
			cheap: [5458, 9371],
			pricey: [9228, 15084],
		},
		seven: {
			size: 7,
			panels: 15,
			cheap: [6833, 10284],
			pricey: [9593, 17183],
		},
		eight: {
			size: 8,
			panels: 18,
			cheap: [7371, 10823],
			pricey: [11543, 18067],
		},
	},
	extras: {
		optimizer: 42,
		scaffold: {
			none: 0,
			basic: 672,
			threeX2: 1040,
			threeX3: 1407,
		},
		slate: 220,
		london: 184,
	},
	calc: (systemSize, optimizer, scaffold, slate, london) => {
		let system = {}
		for (let price in estimate.prices) {
			if (price === systemSize) {
				system = JSON.parse(JSON.stringify(estimate.prices[price]))
				break
			}
		}
		if (optimizer) {
			const optCost = estimate.extras.optimizer * system.panels
			system.cheap[0] += optCost
			system.cheap[1] += optCost
			system.pricey[0] += optCost
			system.pricey[1] += optCost
		}
		if (scaffold) {
			const scaffCost = estimate.extras.scaffold[scaffold]
			system.cheap[0] += scaffCost
			system.cheap[1] += scaffCost
			system.pricey[0] += scaffCost
			system.pricey[1] += scaffCost
		}
		if (slate) {
			const slateCost = estimate.extras.slate
			system.cheap[0] += slateCost
			system.cheap[1] += slateCost
			system.pricey[0] += slateCost
			system.pricey[1] += slateCost
		}
		if (london) {
			const londonCost = estimate.extras.london
			system.cheap[0] += londonCost
			system.cheap[1] += londonCost
			system.pricey[0] += londonCost
			system.pricey[1] += londonCost
		}
		results2.innerHTML = `<h4>${system.size}kWp system</h4>`
		results.innerHTML = `Without battery = £${system.cheap[0]} - £${system.pricey[0]}<br>With a battery = £${system.cheap[1]} - £${system.pricey[1]}`
	},
}

estBtn.addEventListener('click', function () {
	estimate.calc(
		prefSyst.value,
		optimizer.checked,
		scaffold.value,
		slate.checked,
		london.checked
	)
})
