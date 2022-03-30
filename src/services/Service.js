class Service {
	getResource = async (url) => {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};

	_intoAnArray(obj) {
		const valuteObj = Object.entries(obj.Valute);
		const arrValute = [];
		valuteObj.forEach(([key, value]) => {
			arrValute.push(value);
		});
		return arrValute.map(this._transformCurrencyRate).sort((a, b) => {
			return a.name < b.name ? -1 : 0;
		});
	}

	getCurrencyRate = async () => {
		const today = this.getYesterdayDay(0);
		const res = await this.getResource(`https://www.cbr-xml-daily.ru/archive/${today}/daily_json.js`);
		return this._intoAnArray(res);
	}

	getYesterdayDay = (day) => {
		const today = new Date();
		today.setDate(today.getDate() - day);
		if (today.getDay() === 0) {
			const yesterday = `${today.getFullYear()}/${('0' + (today.getMonth() + 1)).slice(-2)}/${('0' + (today.getDate())).slice(-2) - 1}`;
			return yesterday;
		}
		const yesterday = `${today.getFullYear()}/${('0' + (today.getMonth() + 1)).slice(-2)}/${('0' + (today.getDate())).slice(-2)}`;
		return yesterday;
	}

	getYesterdayCurrencyRate = async (code) => {
		let statistics = [];
		for (let i = 3; i < 9; i++) {
			const yesterday = this.getYesterdayDay(i);
			const res = await this.getResource(`https://www.cbr-xml-daily.ru/archive/${yesterday}/daily_json.js`, yesterday);
			statistics.push(this._transformStatistics(res, code))
		}
		return statistics;
	}

	_transformStatistics = (elem, code) => {
		return {
			date: elem.Date,
			value: elem.Valute[code].Value,
			previous: elem.Valute[code].Previous,
		}
	}

	_transformCurrencyRate = (elem) => {
		return {
			id: elem.ID,
			charCode: elem.CharCode,
			name: elem.Name,
			value: elem.Value,
			nominal: elem.Nominal,
			previous: elem.Previous
		}
	}
}

export default Service;