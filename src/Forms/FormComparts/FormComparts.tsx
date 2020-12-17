import React, { useContext, useEffect } from 'react';
import { Col, Row, Form, Button, Container } from 'react-bootstrap'
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { schema } from '../../schema';
import { Formik, FieldArray, getIn } from 'formik';
import "../../optional"; // custom "optional" function for yup validation
import modelContext from '../../modelContext';
import { handleUpload } from '../../App';


export default function FormComparts(props: any) {
	let emptyCompart = {
		_attributes: {
			id: "",
		},
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

	const modelChange = useContext(modelContext);
	const uploaded = useContext(handleUpload);
	const handleSubmit = (values: any) => {
		let comparts_out = {
			listOfCompartments: {
				compartment: values.compartment
			}
		}
		modelChange.changeModelJson("listOfCompartments", comparts_out);
		// console.log(JSON.stringify(formObj));
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
					isValid,
					errors,
					isValidating,
				}) => (
					<Form onSubmit={handleSubmit} noValidate>
						<Container>
							<FieldArray name="compartment" render={arrayHelpers => {
								return (
									<div> {
										values?.compartment && values?.compartment.length > 0 ? values.compartment.map((compart: any, index: number) => (
											<div key={index}>
												<Row>
													<Col xs={3}>
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
														<Button className="form-control" size="sm" type="button" variant="outline-danger" onClick={() => arrayHelpers.remove(index)}>Remove compart</Button>
													</Col>
													<Col xs={9}>
														<FieldArray name={`compartment.[${index}].annotation.cell4d:latticePointDefinition`} render={arrayHelpers => {
															// const latticePointDefinition = compart.annotation["cell4d:latticePointDefinition"];
															return (
																<div> {
																	values.compartment[index].annotation["cell4d:latticePointDefinition"] && values.compartment[index].annotation["cell4d:latticePointDefinition"].length > 0 ?
																		values.compartment[index].annotation["cell4d:latticePointDefinition"].map((points: any, pIndex: number) => (
																			<div key={pIndex}>
																				<Form.Row>
																					<Form.Group as={Col} controlId="validationFormik01">
																						<Form.Label>X-1</Form.Label>
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
																						<Form.Label>X-2</Form.Label>
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
																						<Form.Label>Y-1</Form.Label>
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
																						<Form.Label>Y-2</Form.Label>
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
																						<Form.Label>Z-1</Form.Label>
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
																						<Form.Label>Z-2</Form.Label>
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
																						<Button type="button" size="sm" variant="outline-danger" onClick={() => arrayHelpers.remove(pIndex)}>Remove coordinates</Button>
																					</div>
																				</Form.Row>
																			</div>
																		)) : null
																}
																	<Button
																		type="button"
																		onClick={() => arrayHelpers.push(emptyCompart["cell4d:latticePointDefinition"][0])}
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
												<br />
											</div>
										)) : null
									}
										{/* add a new empty compartment at this position */}
										<Button type="button" onClick={() => arrayHelpers.push(emptyCompart)}>Add compartment</Button>

									</div>
								)
							}}
							/>
							<br />

							{/* <Button variant="outline-info">Add Compartment</Button> */}
							<Button type="submit">Save Environmental Variables to model</Button>
						</Container>
						{/* <Col>
							<Form.Label>values</Form.Label>
							<pre>{JSON.stringify(values, null, 2)}</pre>
						</Col>
						<Col>
							<Form.Label>errors</Form.Label>
							<pre>{JSON.stringify(errors, null, 2)}</pre>
						</Col>
						<Col>
								<Form.Label>initial values</Form.Label>
								<pre>{JSON.stringify(props.initialValues, null, 2)}</pre>
						</Col> */}
					</Form>
				)}
			</Formik>
		</div>
	);
}
