import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Component } from 'react';
import Header from '../header/Header';
import Main from '../main/Main';
import Graph from '../graph/Graph';

import './App.css';

class App extends Component {

	state = {
		selectedCode: null,
		data: null,
	}

	onCodeSelected = (selectedCode, data) => {
		this.setState({ selectedCode, data });
	}

	render() {
		return (
			<Router>
				<div className="App" >
					<Header />
					<Routes>
						<Route path='/' element={<Main onCodeSelected={this.onCodeSelected} />} />
						<Route path='graph' element={<Graph code={this.state.selectedCode}
							data={this.state.data} />} />
					</Routes>
				</div>
			</Router>

		);
	}

}

export default App;
