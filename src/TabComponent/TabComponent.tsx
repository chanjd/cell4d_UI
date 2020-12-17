import React, { useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TabComponent.css';
import FormEnv from '../Forms/FormEnv/FormEnv';
import FormComparts from '../Forms/FormComparts/FormComparts';
import modelContext from '../modelContext';
import initialState from '../Forms/formInitialState'



export default function TabComponent(props: any) {
	const modelChange = useContext(modelContext);
	// useEffect(() => {
	// 	console.log(modelChange.modelJson)
	// 	console.log(initialState)
		
	// }, [initialState],
	// );

	return (
		<>
			<Tabs>
				<TabList>
					<Tab>Environmental Variables</Tab>
					<Tab>placeholder</Tab>
					<Tab disabled>disabled</Tab>
				</TabList>

				<TabPanel>
					<p>Here are the environmental variables of the model file.</p>
					{/* <FormEnv initialValues={{"cell4d:environmentVariables": initialState["cell4d:environmentVariables"]}} */}
					<FormEnv initialValues={initialState["cell4d:environmentVariables"]}
					// 	initialValues={
					// 	{
					// 		X_DIM: modelChange.modelJson["cell4d:environmentVariables"]["cell4d:X_DIM"]["_text"],
					// 		Y_DIM: modelChange.modelJson["cell4d:environmentVariables"]["cell4d:Y_DIM"]["_text"],
					// 		Z_DIM: modelChange.modelJson["cell4d:environmentVariables"]["cell4d:Z_DIM"]["_text"],
					// 		SPACESCALE: modelChange.modelJson["cell4d:environmentVariables"]["cell4d:SPACESCALE"]["_text"],
					// 		GEOMETRY: modelChange.modelJson["cell4d:environmentVariables"]["cell4d:GEOMETRY"]["_text"],
					// 		INACCESSIBLE_SPACE_PERCENT: modelChange.modelJson["cell4d:environmentVariables"]["cell4d:INACCESSIBLE_SPACE_PERCENT"]["_text"],
					// 		TIMESCALE: modelChange.modelJson["cell4d:environmentVariables"]["cell4d:TIMESCALE"]["_text"],
					// 		MAX_CYCLES: modelChange.modelJson["cell4d:environmentVariables"]["cell4d:MAX_CYCLES"]["_text"],
					// 	}
					// } 
					/>
				</TabPanel>
				<TabPanel>
					<FormComparts initialValues={initialState.listOfCompartments} />
				</TabPanel>

				<TabPanel>
				</TabPanel>

			</Tabs>
			{/* <pre>{JSON.stringify(modelChange.modelJson, null, 2)}</pre> */}
		</>
	)

}
