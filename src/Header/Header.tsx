import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import './Header.css';
import { Form, Button, Alert } from 'react-bootstrap'
import modelContext from '../modelContext';
import { showFormContext } from '../App';
import initialState from '../Forms/formInitialState'
import { validate_xml } from '../xml_validate'
import { annotSpecies, species } from '../types';


interface HeaderProps {
	header: string
	description: string
}

export default function Header(props: HeaderProps) {
	const modelChange = useContext(modelContext);
	const { showForm, changeFormDisplay } = useContext(showFormContext);
	// const { isUploaded, changeUploadStatus } = useContext(handleUpload);
	const [showUpload, changeShowUpload] = useState(false);
	const [uploadError, setUploadError] = useState(false);
	const [uploadErrorMsg, setUploadErrorMsg] = useState({});

	// let showUploadError = false;

	let fileReader = new FileReader();
	const submitUpload = (values: any) => {
		// console.log(file);
		values.isLoading = true;
		console.log(values.file);
		fileReader.onload = handleFileRead;
		fileReader.readAsText(values.file);

		// changeShowUpload(true);
		values.isLoading = false;
		// changeUploadStatus(true);

	};

	const handleFileRead = (e: any) => {
		const content = fileReader.result as string;

		let validation_result = validate_xml(content, true);

		if (validation_result.pass) {
			setUploadError(false)
		} else {
			setUploadError(true)
			setUploadErrorMsg(validation_result.errors)
			return;
		}

		changeFormDisplay(true);

		//breakdown xml object into 6 form sections
		initialState["cell4d:environmentVariables"] = validation_result.json["sbml"]["model"]["annotation"]["cell4d:environmentVariables"];
		initialState["listOfCompartments"] = validation_result.json["sbml"]["model"]["listOfCompartments"];
		initialState["annotSpecies"] = validation_result.json["sbml"]["model"]["annotation"]["cell4d:listOfAnnotationSpeciesTypes"];
		initialState["listOfSpecies"] = validation_result.json["sbml"]["model"]["listOfSpecies"];

		// trigger the useEffect, updating the json
		modelChange.changeModelJson("cell4d:environmentVariables", initialState);
	}

	useEffect(() => {
		// if(uploadError) {
		// 	showUploadError = true;
		// } else {
		// 	showUploadError = false;
		// }
	}, [uploadError])

	return (
		<>
			<div className="Top">
				<h1 className="Header">
					{props.header}
				</h1>
				<p style={{ fontSize: 18 }}>
					{props.description}
				</p>
				<p>
					<Formik
						onSubmit={submitUpload}
						initialValues={{
							file: "",
							isLoading: false,

						}}
					>
						{({
							handleChange,
							handleSubmit,
							handleBlur,
							values,
							setFieldValue,
							isValid,
							errors,
						}) => (
							<Form onSubmit={handleSubmit} noValidate>
								<Form.Row>
									<Form.Group style={{ display: 'flex', justifyContent: 'center' }}>
										{/* <Form.File name="file" onChange={(event: any) => { setFieldValue("file", event.currentTarget.files[0]) }} label="Load your existing XML model file" /> */}
										<Form.File name="file" label="Load your existing XML model file"
											onChange={(event: any) => { setFieldValue("file", event.currentTarget.files[0]); changeShowUpload(true); }} />
										{showUpload ? <Button type="submit" variant="light" size="sm" disabled={values.isLoading}>{values.isLoading ? `Loading...` : `Upload`}</Button> : null}
									</Form.Group>
								</Form.Row>
								{uploadError ? <Alert variant="danger">File upload error.</Alert> : null}
								{uploadError ? <Alert variant="danger"><pre style={{ textAlign: 'left' }}>{JSON.stringify(uploadErrorMsg, null, 2)}</pre></Alert> : null}
								<Form.Row>
									{!showForm ? <p style={{ display: 'flex', justifyContent: 'center' }}>or</p> : null}
								</Form.Row>
								<Form.Row>
									<Form.Group style={{ display: 'flex', justifyContent: 'center' }}>
										{/* <Form.File name="file" onChange={(event: any) => { setFieldValue("file", event.currentTarget.files[0]) }} label="Load your existing XML model file" /> */}
										{!showForm ? <Button type="button" variant="light" size="sm" onClick={() => changeFormDisplay(true)}>Create new form</Button> : null}
									</Form.Group>
								</Form.Row>

							</Form>
						)}
					</Formik>



				</p>
			</div>
		</>
	)
}
