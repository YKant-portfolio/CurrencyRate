import { Component } from 'react';
import { Link } from "react-router-dom";
import Chart from './LineChartData';

import Service from '../../services/Service';

import './Graph.css';

class Graph extends Component {
	state = {
		values: [],
		date: [],
	}

	service = new Service();

	componentDidMount() {
		this.updateCode();
	};

	updateCode = () => {
		const { code } = this.props;
		if (!code) {
			return;
		}
		this.service
			.getYesterdayCurrencyRate(code)
			.then(this.onCodeLoaded);
	};

	onCodeLoaded = (values) => {
		const resValues = values.map(item => {
			return item.value.toFixed(2);
		})
		const date = values.map(item => {
			let res = (item.date).substr(0, 10).replace(/-/g, '.');
			return res;
		})
		this.setState({ values: resValues, date });
	};

	render() {
		const { values, date } = this.state;
		const { data } = this.props;
		const today = new Date().toLocaleDateString();
		const array = [data, ...values].reverse();
		const valiueDate = [today, ...date].reverse();

		return (
			<div className="graph" >
				<Chart values={array} date={valiueDate} />
				<Link to="/">  На главное меню</Link>
			</div >
		);
	};
}

export default Graph;