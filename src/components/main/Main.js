import { Component } from 'react';
import { Link } from "react-router-dom";

import Service from '../../services/Service';

import './Main.css';

class Main extends Component {
	state = {
		currencyRate: [],
	}

	service = new Service();

	componentDidMount() {
		this.service.getCurrencyRate()
			.then(this.onCurrencyRate)
			.catch(this.onError);
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}


	onCurrencyRate = (currencyRate) => {
		this.setState({
			currencyRate,
		});
	}


	renderLi(arr) {
		const itmes = arr.map((item) => {
			const changes = (item.value - item.previous).toFixed(4);
			const changesStyle = changes > 0 ? 'up' : 'down';
			const percent = ((changes / item.previous) * 100).toFixed(2);
			const percentStyle = changes > 0 ? 'up' : 'down';

			return (
				<Link to="/graph" key={item.id} className="finance-currency-table__tr" title={item.name}
					onClick={() => this.props.onCodeSelected(item.charCode, item.value.toFixed(2))}>
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
				</Link >
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