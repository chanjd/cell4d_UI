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

export const handleUpload = createContext({
	isUploaded: false,
	changeUploadStatus: (uploaded: boolean) => { }
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
	const changeUploadStatus = (uploaded: boolean) => {
		setUploaded(uploaded);
	}


	return (
		<div className="App">
			<modelContext.Provider value={{ modelJson, changeModelJson }}>
				<showFormContext.Provider value={{ showForm, changeFormDisplay }}>
					<handleUpload.Provider value={{ isUploaded, changeUploadStatus }}>
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
					</handleUpload.Provider>
				</showFormContext.Provider>
			</modelContext.Provider>

		</div>
	);
}

export default App;
