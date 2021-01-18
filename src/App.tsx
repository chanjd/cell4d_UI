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
import { annotSpecies } from './types';


export const showFormContext = createContext({
	showForm: false,
	changeFormDisplay: (formDisplay: boolean) => { }
})

function App() {
	const [modelJson, setModelJson] = useState(initialState);
	const changeModelJson = (key: string, new_state: any) => {
		setModelJson({ ...modelJson, [key]: new_state[key] })
	}


	// state variables that hold data dependencies: compartment list, annotation species list
	const [compartList, setCompartList] = useState(Array<string>());
	const [annotSpeciesList, setAnnotSpeciesList] = useState(Array<annotSpecies>());

	// when model is changed, update accompanying lists
	useEffect(() => {
		updateComparts();
		updateAnnot()
	}, [modelJson])

	// hold string array of compartment names, used for annotSpecies, species, reactions
	const updateComparts = () => {
		let list = modelJson["listOfCompartments"]["compartment"].map((compart: any, index: number) => {
			let id: string = compart._attributes.id;
			return (id);
		});
		setCompartList(list);
	}

	// list of valid annotSpecies, for list of species and reactions
	const updateAnnot = () => {
		let list: Array<annotSpecies> = modelJson["annotSpecies"]["cell4d:speciesType"].map((species: any, index: number) => {
			let id: string = species._attributes.id;
			let reduced_sites: Array<{ id: string, states: Array<string> }> = []
			if (species?.["cell4d:listOfBindingSites"]?.["cell4d:bindingSite"]) {
				reduced_sites = species["cell4d:listOfBindingSites"]["cell4d:bindingSite"].map((site: any, index: number) => {
					let site_id: string = site._attributes.id;
					let states: Array<string> = [];
					if (site?.["cell4d:listOfPossibleStates"]?.["cell4d:state"]) {
						states = site["cell4d:listOfPossibleStates"]["cell4d:state"].map((state: any, index: number) => {
							return (state._attributes.value);
						})
					}
					return ({
						id: site_id,
						sites: {
							states: states
						}
					})
				})
			}

			return ({
				id: id,
				sites: reduced_sites
			});
		});
		setAnnotSpeciesList(list);
	}

	const [showForm, setShowForm] = useState(false);
	const changeFormDisplay = (formDisplay: boolean) => {
		setShowForm(formDisplay);
	}

	return (
		<div className="App">
			<modelContext.Provider value={{ modelJson, changeModelJson, compartList, setCompartList, annotSpeciesList, setAnnotSpeciesList }}>
				<showFormContext.Provider value={{ showForm, changeFormDisplay }}>
					<Header header="Cell4D Model Editor" description="A Cell4D model file editor" />
					<Container fluid>
						<Row>
							{/* Sidebar help doc placeholder */}
							<Col md={2}>

							</Col>

							{/* main tab component of the program, each tab representing one section of the XML model document */}
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
