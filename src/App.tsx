import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Header from './Header/Header';
import TabComponent from './TabComponent/TabComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import initialState from './Forms/formInitialState'
import modelContext from './modelContext';
import VisualizeModel from './VisualizeModel/VisualizeModel';

export const showFormContext = createContext({
	showForm: false,
	changeFormDisplay: (formDisplay: boolean) => { }
})


function App() {
	const [modelJson, setModelJson] = useState(initialState);
	const changeModelJson = (key: string, new_state: any) => {
		setModelJson({ ...modelJson, [key]: new_state[key] })
	}

	const [showForm, setShowForm] = useState(false);
	const changeFormDisplay = (formDisplay: boolean) => {
		setShowForm(formDisplay);
	}

	const [isUploaded, setUploaded] = useState(false);

	// state variables that hold data dependencies: compartment list, annotation species list
	const [compartList, setCompartList] = useState(Array<string>());
	const [annotSpeciesList, setAnnotSpeciesList ] = useState([]);

	// when model is changed, update accompanying lists
	useEffect(() => {
		updateComparts();
	}, [modelJson])

	const updateComparts = () => {
		let list = modelJson["listOfCompartments"]["compartment"].map((compart: any, index: number) => {
			let id: string = compart._attributes.id;
			return(id);
		});
		setCompartList(list);
	}

	return (
		<div className="App">
			<modelContext.Provider value={{ modelJson, changeModelJson, compartList, setCompartList, annotSpeciesList, setAnnotSpeciesList }}>
				<showFormContext.Provider value={{ showForm, changeFormDisplay }}>
						<Header header="Cell4D Model Editor" description="A Cell4D model file editor" />
						<Container fluid>
							<Row>
								<Col md={2}>

								</Col>

								<Col md={7}>
									{showForm ? <TabComponent envForm={modelJson} /> : null}
								</Col>
								{/* show some representation of model file, json/xml */}
								<Col md={3}>
									{showForm ? <VisualizeModel /> : null}
								</Col>
							</Row>
						</Container>
				</showFormContext.Provider>
			</modelContext.Provider>

		</div>
	);
}

export default App;
