import React from "react";
import { Line } from "react-chartjs-2";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = (props) => {
	const { values, date } = props;

	const lineChartData = {
		labels: date,
		datasets: [
			{
				data: values,
				label: "Infected",
				borderColor: "#3333ff",
				fill: true,
				lineTension: 0.7
			},
		]
	};

	return (
		<Line
			type="line"
			width={160}
			height={60}
			options={{
				title: {
					display: false,
					text: "COVID-19 Cases of Last 6 Months",
					fontSize: 20
				},
				legend: {
					display: true, //Is the legend shown?
					position: "top" //Position of the legend.
				}
			}}
			data={lineChartData}
		/>
	);
};
export default Chart;