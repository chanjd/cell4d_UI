import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Form, Button, Container, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { schema } from '../../schema';
import { Formik, FieldArray, getIn } from 'formik';
import "../../optional"; // custom "optional" function for yup validation
import modelContext from '../../modelContext';


export default function FormComparts(props: any) {
	const [submitSuccess, setSubmitSuccess] = useState(false);
	useEffect(() => {}, [submitSuccess])

	let emptyCompart = {
		_attributes: {
			id: "",
		},
		annotation: {
			"cell4d:latticePointDefinition": [
				{
					_attributes: {
						type: "solid",
						x1: 0,
						x2: 0,
						y1: 0,
						y2: 0,
						z1: 0,
						z2: 0,
					}
				}
			]
		}
	}

	const modelChange = useContext(modelContext);
	// const uploaded = useContext(handleUpload);
	const handleSubmit = (values: any) => {
		let comparts_out = {
			listOfCompartments: {
				compartment: values.compartment
			}
		}
		modelChange.changeModelJson("listOfCompartments", comparts_out);
		console.log(JSON.stringify(emptyCompart));
		setSubmitSuccess(true);
	}

	return (
		<div>
			<Formik
				validationSchema={schema.compart}
				onSubmit={handleSubmit}
				enableReinitialize={true}
				initialValues={props.initialValues} >
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					errors,
				}) => (
					<Form onSubmit={handleSubmit} noValidate>
						<Container>
							<FieldArray name="compartment" render={arrayHelpers => {
								return (
									<div> {
										values?.compartment && values?.compartment.length > 0 ? values.compartment.map((compart: any, index: number) => (
											<div key={index}>
												<Card >
													<Row style={{ paddingTop: 10 }}>
														<Col xs={3} style={{ paddingLeft: 25 }}>
															<Form.Label>Compartment name</Form.Label>
															<Form.Control className="form-control" size="sm"
																name={`compartment.[${index}]._attributes.id`}
																value={values.compartment[index]._attributes.id}
																onChange={handleChange}
																onBlur={handleBlur}
																isValid={getIn(touched, `compartment.[${index}]._attributes.id`) &&
																	!getIn(errors, `compartment.[${index}]._attributes.id`)}
																isInvalid={getIn(touched, `compartment.[${index}]._attributes.id`) &&
																	!!getIn(errors, `compartment.[${index}]._attributes.id`)} />
															<Form.Control.Feedback type="invalid">{getIn(errors, `compartment.[${index}]._attributes.id`)}</Form.Control.Feedback>
															<Button className="form-control" size="sm" type="button" variant="outline-danger" onClick={() => arrayHelpers.remove(index)}>Remove compartment</Button>
														</Col>
														<Col xs={9}>
															<FieldArray name={`compartment.[${index}].annotation.cell4d:latticePointDefinition`} render={arrayHelpers => {
																return (
																	<div> {
																		values.compartment[index].annotation["cell4d:latticePointDefinition"] && values.compartment[index].annotation["cell4d:latticePointDefinition"].length > 0 ?
																			values.compartment[index].annotation["cell4d:latticePointDefinition"].map((points: any, pIndex: number) => (
																				<div key={pIndex}>
																					<Form.Row>
																						<Form.Group as={Col} controlId="validationFormik01">
																							{pIndex === 0 ? <Form.Label>X-1</Form.Label> : null}
																							<Form.Control type="number" className="form-control"
																								name={`compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x1`}
																								value={values.compartment[index].annotation["cell4d:latticePointDefinition"][pIndex]["_attributes"].x1}
																								onChange={handleChange}
																								onBlur={handleBlur}
																								isValid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x1`) &&
																									!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x1`)}
																								isInvalid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x1`) &&
																									!!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x1`)} />
																							<Form.Control.Feedback type="invalid">{getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x1`)}</Form.Control.Feedback>
																						</Form.Group>
																						<Form.Group as={Col} controlId="validationFormik01">
																							{pIndex === 0 ? <Form.Label>X-2</Form.Label> : null}
																							<Form.Control type="number" className="form-control"
																								name={`compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x2`}
																								value={values.compartment[index].annotation["cell4d:latticePointDefinition"][pIndex]["_attributes"].x2}
																								onChange={handleChange}
																								onBlur={handleBlur}
																								isValid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x2`) &&
																									!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x2`)}
																								isInvalid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x2`) &&
																									!!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x2`)} />
																							<Form.Control.Feedback type="invalid">{getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].x2`)}</Form.Control.Feedback>
																						</Form.Group>
																						<Form.Group as={Col} controlId="validationFormik01">
																							{pIndex === 0 ? <Form.Label>Y-1</Form.Label> : null}
																							<Form.Control type="number" className="form-control"
																								name={`compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y1`}
																								value={values.compartment[index].annotation["cell4d:latticePointDefinition"][pIndex]["_attributes"].y1}
																								onChange={handleChange}
																								onBlur={handleBlur}
																								isValid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y1`) &&
																									!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y1`)}
																								isInvalid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y1`) &&
																									!!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y1`)} />
																							<Form.Control.Feedback type="invalid">{getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y1`)}</Form.Control.Feedback>
																						</Form.Group>
																						<Form.Group as={Col} controlId="validationFormik01">
																							{pIndex === 0 ? <Form.Label>Y-2</Form.Label> : null}
																							<Form.Control type="number" className="form-control"
																								name={`compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y2`}
																								value={values.compartment[index].annotation["cell4d:latticePointDefinition"][pIndex]["_attributes"].y2}
																								onChange={handleChange}
																								onBlur={handleBlur}
																								isValid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y2`) &&
																									!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y2`)}
																								isInvalid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y2`) &&
																									!!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y2`)} />
																							<Form.Control.Feedback type="invalid">{getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].y2`)}</Form.Control.Feedback>
																						</Form.Group>
																						<Form.Group as={Col} controlId="validationFormik01">
																							{pIndex === 0 ? <Form.Label>Z-1</Form.Label> : null}
																							<Form.Control type="number" className="form-control"
																								name={`compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z1`}
																								value={values.compartment[index].annotation["cell4d:latticePointDefinition"][pIndex]["_attributes"].z1}
																								onChange={handleChange}
																								onBlur={handleBlur}
																								isValid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z1`) &&
																									!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z1`)}
																								isInvalid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z1`) &&
																									!!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z1`)} />
																							<Form.Control.Feedback type="invalid">{getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z1`)}</Form.Control.Feedback>
																						</Form.Group>
																						<Form.Group as={Col} controlId="validationFormik01">
																							{pIndex === 0 ? <Form.Label>Z-2</Form.Label> : null}
																							<Form.Control type="number" className="form-control"
																								name={`compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z2`}
																								value={values.compartment[index].annotation["cell4d:latticePointDefinition"][pIndex]["_attributes"].z2}
																								onChange={handleChange}
																								onBlur={handleBlur}
																								isValid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z2`) &&
																									!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z2`)}
																								isInvalid={getIn(touched, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z2`) &&
																									!!getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z2`)} />
																							<Form.Control.Feedback type="invalid">{getIn(errors, `compartment.[${index}].annotation.cell4d:latticePointDefinition.[${pIndex}][_attributes].z2`)}</Form.Control.Feedback>
																						</Form.Group>
																						{/* remove this compartment */}
																						<div className="form-group col-md-2 align-self-end">
																							<Button type="button" size="sm" variant="outline-danger" onClick={() => arrayHelpers.remove(pIndex)}>Remove</Button>
																						</div>
																					</Form.Row>
																				</div>
																			)) : null
																	}
																		<Button
																			type="button"
																			onClick={() => arrayHelpers.push(emptyCompart.annotation["cell4d:latticePointDefinition"][0])}
																			className="justify-content-flex-start">
																			Add coordinates
																	</Button>
																		<br />
																		<br />
																	</div>
																)
															}}
															/>
														</Col>
													</Row>
												</Card>
												<br />
											</div>
										)) : null
									}
										{typeof errors.compartment === "string" ?
											<><div className="alert-danger col-sm justify-content-md-center">{errors.compartment}</div><br /></>
											: null}
									
										{/* add a new empty compartment at this position */}
										<Button type="button" onClick={() => arrayHelpers.push(emptyCompart)}>Add compartment</Button>
									</div>
								)
							}}
							/>
							<br />

							{/* <Button variant="outline-info">Add Compartment</Button> */}
							<hr />

							<Button type="submit" variant="success" onClick={() => setSubmitSuccess(false)}>Save Compartments to model</Button>
							{submitSuccess ? <><br/><br/><div className="alert-success col-lg justify-content-md-center">Compartments saved to model!</div></> : null}
						</Container>
					</Form>
				)}
			</Formik>
		</div>
	);
}
