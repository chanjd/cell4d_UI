import React, { useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './TabComponent.css';
import FormEnv from '../Forms/FormEnv/FormEnv';
import FormComparts from '../Forms/FormComparts/FormComparts';
import FormAnnot from '../Forms/FormAnnot/FormAnnot';
import modelContext from '../modelContext';
import initialState from '../Forms/formInitialState'



export default function TabComponent(props: any) {
	const modelChange = useContext(modelContext);

	return (
		<>
			<Tabs defaultActiveKey="envVar" transition={false} >
				<Tab eventKey="envVar" title="Environmental Variables">
					<p>Here are the environmental variables of the model file.</p>
					{/* <FormEnv initialValues={{"cell4d:environmentVariables": initialState["cell4d:environmentVariables"]}} */}
					<FormEnv initialValues={initialState["cell4d:environmentVariables"]} />
				</Tab>

				<Tab eventKey="comparts" title="Compartments">
					<p>Here are the compartments of the model file.</p>
					<FormComparts initialValues={initialState.listOfCompartments} />
				</Tab>

				<Tab eventKey="annotSpecies" title="Base Molecules">
					<p>Here are the base molecules of the model file.</p>
					<FormAnnot initialValues={initialState.annotSpecies} />
				</Tab>

				<Tab eventKey="disabled" title="disabled" disabled>
				</Tab>

			</Tabs>
			{/* <pre>{JSON.stringify(modelChange.modelJson, null, 2)}</pre> */}
		</>
	)

}
