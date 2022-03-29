import { Component } from 'react';
import Service from '../../services/Service';

import './Main.css';

class Main extends Component {
	state = {
		currencyRate: [],
		oldValues: [],
		error: false,
	}

	service = new Service();

	componentDidMount() {
		this.service.getCurrencyRate()
			.then(this.onCurrencyRate)
			.catch(this.onError);
		this.service.getYesterdayCurrencyRate()
			.then(this.onYesterdayCurrencyRate);
	}

	onCurrencyRate = (currencyRate) => {
		this.setState({
			currencyRate,
		});
	}

	onYesterdayCurrencyRate = (yesterdayValue) => {
		// this.setState({
		// 	yesterdayValue,
		// });
		console.log(yesterdayValue);

	}


	renderLi(arr) {
		const itmes = arr.map((item) => {
			const changes = (item.value - item.previous).toFixed(4);
			const changesStyle = changes > 0 ? 'up' : 'down';
			const percent = ((changes / item.previous) * 100).toFixed(2);
			const percentStyle = changes > 0 ? 'up' : 'down';

			return (
				<a key={item.id} className="finance-currency-table__tr" title={item.name} href="/currencies/AMD/">
					<div className="finance-currency-table__cell finance-currency-table__cell--code">
						{item.charCode}
					</div>
					<div className="finance-currency-table__cell finance-currency-table__cell--denomination">
						{item.nominal}
					</div>
					<div className="finance-currency-table__cell finance-currency-table__cell--currency">
						{item.name}
					</div>
					<div className="finance-currency-table__cell finance-currency-table__cell--value">
						{item.value.toFixed(2)}
					</div>
					<div className={`finance-currency-table__cell finance-currency-table__cell--change finance-currency-table__cell--down ${changesStyle}`}>
						{changes > 0 ? `+ ${changes} ` : changes}
					</div>
					<div className={`finance-currency-table__cell finance-currency-table__cell--percent finance-currency-table__cell--down ${percentStyle} `}>
						{percent > 0 ? `+ ${percent} ` : percent}
					</div>
				</a >
			)
		});
		return (
			<ul >
				{itmes}
			</ul >
		)
	}


	render() {
		const { currencyRate } = this.state;
		// const result = currencyRate.map((item, index) => ({ ...item, ...oldValues[index] }));
		const items = this.renderLi(currencyRate);

		return (
			<div className="main">
				<div className="finance-currency-table__table" >
					<div className="finance-currency-table__head">
						<div className="finance-currency-table__tr finance-currency-table__tr--head">
							<div className="finance-currency-table__th finance-currency-table__th--code">Код</div>
							<div className="finance-currency-table__th finance-currency-table__th--denomination">Номинал</div>
							<div className="finance-currency-table__th finance-currency-table__th--currency">Валюта</div>
							<div className="finance-currency-table__th finance-currency-table__th--value">Курс ЦБ</div>
							<div className="finance-currency-table__th finance-currency-table__th--change">Изменения</div>
							<div className="finance-currency-table__th finance-currency-table__th--percent">%</div>
						</div>
					</div>
					{items}
				</div >
				<div>
					<a className='cbr' href="https://www.cbr-xml-daily.ru/">Курсы валют, API</a>
				</div>
			</div >
		);
	};
}

export default Main;