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
		const res = await this.getResource(`https://www.cbr-xml-daily.ru/daily_json.js`);
		return this._intoAnArray(res);
	}

	getYesterdayDay = (day) => {
		const today = new Date();
		today.setDate(today.getDate() - day);
		const yesterday = `${today.getFullYear()}/${('0' + (today.getMonth() + 1)).slice(-2)}/${('0' + (today.getDate())).slice(-2)}`;
		console.log(yesterday);
		return yesterday;
	}

	getYesterdayCurrencyRate = async () => {
		let statistic = [];
		try {
			for (let i = 2; i < 8; i++) {
				const yesterday = this.getYesterdayDay(i);
				const res = await this.getResource(`https://www.cbr-xml-daily.ru/archive/${yesterday}/daily_json.js`);
				statistic.push(res)
			}
		} catch (error) {
			alert('Курс ЦБ РФ на данную дату не установлен.')
		}
		return statistic;
	}




	_transformStatistic = (elem) => {
		return {
			value: elem.Value,
			previous: elem.Previous
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