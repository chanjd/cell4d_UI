import React, { useContext, useEffect } from 'react';
import { Col, Row, Form, Button, Container, Card, DropdownButton, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { schema } from '../../schema';
import { Formik, FieldArray, getIn, withFormik, yupToFormErrors } from 'formik';
import ColorPicker from '../colorPicker'
import "../../optional"; // custom "optional" function for yup validation
import modelContext from '../../modelContext';


// function CustomValidate(values: any) {
// 	const model = useContext(modelContext);

// 	return schema.annotSpecies
// 		.validate(values, { abortEarly: false, context: model.compartList })
// 		.catch(err => {
// 			throw yupToFormErrors(err);
// 		});

// }

// use multiselect dropdown for compartemnts
export default function FormAnnot(props: any) {
	let emptyAnnot = {
		_attributes: {
			id: "",
			speciesMoleculeType: "",
		},
		"cell4d:listOfValidCompartments": {
			"cell4d:compartment": [
				{
					_attributes: {
						id: ""
					}
				},
			],
		},
		"cell4d:listOfBindingSites": {
			"cell4d:bindingSite": [],
		},
		"cell4d:diffusionConstant": {
			_attributes: {
				value: 0,
			},
		},
		"cell4d:displayProperties": {
			_attributes: {
				redValue: 0,
				greenValue: 0,
				blueValue: 0
			},
		},
	}
	let empty_site = {
		_attributes: {
			id: ""
		},
		"cell4d:listOfPossibleStates": {
			"cell4d:state": [
			]
		}
	}
	let empty_bind_site = {
		_attributes: {
			value: ""
		}
	}

	const model = useContext(modelContext);
	const handleSubmit = (values: any) => {
		let annot_out = {
			annotSpecies: {
				"cell4d:speciesType": values["cell4d:speciesType"]
			}
		}
		model.changeModelJson("annotSpecies", annot_out);
		console.log(JSON.stringify(values["cell4d:speciesType"]));
	}

	// const handleColor = (color: any) => {
	// 	color.rgb;
	// }

	return (
		<div>
			<Formik
				// validate={CustomValidate}
				validationSchema={schema.annotSpecies(model.compartList)}
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
					setFieldValue
				}) => (
					<Form onSubmit={handleSubmit} noValidate>
						<Container>
							<FieldArray name="cell4d:speciesType" render={arrayHelpers => {
								return (<div> {
									values?.["cell4d:speciesType"] && values?.["cell4d:speciesType"].length > 0 ? values["cell4d:speciesType"].map((compart: any, index: number) => (
										<div key={index}>
											<Card >
												<Row style={{ paddingTop: 10 }}>
													<Col xs={3} style={{ paddingLeft: 30 }}>
														<Form.Label>Molecule name</Form.Label>
														<Form.Control className="form-control" size="sm"
															name={`cell4d:speciesType.[${index}]._attributes.id`}
															value={values["cell4d:speciesType"][index]._attributes.id}
															onChange={handleChange}
															onBlur={handleBlur}
															isValid={getIn(touched, `cell4d:speciesType.[${index}]._attributes.id`) &&
																!getIn(errors, `cell4d:speciesType.[${index}]._attributes.id`)}
															isInvalid={getIn(touched, `cell4d:speciesType.[${index}]._attributes.id`) &&
																!!getIn(errors, `cell4d:speciesType.[${index}]._attributes.id`)} />
														<Form.Control.Feedback type="invalid">{getIn(errors, `cell4d:speciesType.[${index}]._attributes.id`)}</Form.Control.Feedback>
														<br />
														<Button className="form-control" type="button" variant="outline-danger" onClick={() => arrayHelpers.remove(index)}>Remove molecule</Button>
													</Col>
													<Col xs={3}>
														<FieldArray name={`cell4d:speciesType.[${index}]["cell4d:listOfValidCompartments"]["cell4d:compartment"]`} render={arrayHelpers => {
															return (<div> {
																values?.["cell4d:speciesType"]?.[index]?.["cell4d:listOfValidCompartments"]?.["cell4d:compartment"] && values?.["cell4d:speciesType"]?.[index]?.["cell4d:listOfValidCompartments"]?.["cell4d:compartment"].length > 0 ?
																	values["cell4d:speciesType"][index]["cell4d:listOfValidCompartments"]["cell4d:compartment"].map((compart: any, cIndex: number) => (
																		<div key={cIndex}>
																			{cIndex === 0 ? <Form.Label>List of valid compartments</Form.Label> : null}
																			<Form.Control as="select" custom
																				id="dropdown-basic-button"
																				size="sm"
																				name={`cell4d:speciesType.[${index}]["cell4d:listOfValidCompartments"]["cell4d:compartment"].[${cIndex}][_attributes].id`}
																				value={values["cell4d:speciesType"][index]["cell4d:listOfValidCompartments"]["cell4d:compartment"][cIndex]._attributes.id}
																				// title={selected ? props.value : props.menuLabel}
																				onChange={handleChange}
																				onBlur={handleBlur}
																			>
																				{!values["cell4d:speciesType"][index]["cell4d:listOfValidCompartments"]["cell4d:compartment"][cIndex]._attributes.id ?
																					<option value="">compartment</option>
																					: null}
																				{model.compartList.map((element: any, index: number) => {
																					return (
																						<option value={element}>{element}</option>
																					)
																				})
																				}
																			</Form.Control>
																			<div className="form-group align-self-start">
																				<Button type="button" size="sm" variant="outline-danger" onClick={() => arrayHelpers.remove(cIndex)}>Remove compartment</Button>
																			</div>
																		</div>
																	)) : null
															}
																<Button
																	type="button"
																	size="sm"
																	onClick={() => arrayHelpers.push(emptyAnnot["cell4d:listOfValidCompartments"]["cell4d:compartment"][0])}
																	className="justify-content-flex-start">
																	Add compartment
																</Button>
																<br />
																<br />
															</div>
															)
														}}
														/>
													</Col>
													<Col xs={3}>
														<Form.Label>Diffusion constant</Form.Label>
														<InputGroup size="sm">
															<Form.Control type="number" className="form-control" size="sm"
																name={`cell4d:speciesType.[${index}][cell4d:diffusionConstant]._attributes.value`}
																value={values["cell4d:speciesType"][index]["cell4d:diffusionConstant"]._attributes.value}
																onChange={handleChange}
																onBlur={handleBlur}
																isValid={getIn(touched, `cell4d:speciesType.[${index}][cell4d:diffusionConstant]._attributes.value`) &&
																	!getIn(errors, `cell4d:speciesType.[${index}][cell4d:diffusionConstant]._attributes.value`)}
																isInvalid={getIn(touched, `cell4d:speciesType.[${index}][cell4d:diffusionConstant]._attributes.value`) &&
																	!!getIn(errors, `cell4d:speciesType.[${index}][cell4d:diffusionConstant]._attributes.value`)} />
															<InputGroup.Append>
																<InputGroup.Text id="diff_const">m<sup>2</sup>/s</InputGroup.Text>
															</InputGroup.Append>
															<Form.Control.Feedback type="invalid">{getIn(errors, `cell4d:speciesType.[${index}][cell4d:diffusionConstant]._attributes.value`)}</Form.Control.Feedback>
														</InputGroup>
													</Col>
													<Col xs={2} style={{ paddingRight: 30 }}>
														<Form.Label>Color</Form.Label>
														<ColorPicker onChange={(color: { rgb: any }) => {
															setFieldValue(`cell4d:speciesType[${index}]["cell4d:displayProperties"]._attributes.redValue`, color.rgb.r)
															setFieldValue(`cell4d:speciesType[${index}]["cell4d:displayProperties"]._attributes.greenValue`, color.rgb.g)
															setFieldValue(`cell4d:speciesType[${index}]["cell4d:displayProperties"]._attributes.blueValue`, color.rgb.b)
														}}
															red={values["cell4d:speciesType"][index]["cell4d:displayProperties"]._attributes.redValue}
															green={values["cell4d:speciesType"][index]["cell4d:displayProperties"]._attributes.greenValue}
															blue={values["cell4d:speciesType"][index]["cell4d:displayProperties"]._attributes.blueValue}
														/>
													</Col>

												</Row>
												{/* list of sites */}
												<Row>
													<Col xs={{ span: 8, offset: 4 }} style={{ paddingRight: 30 }}>
														<FieldArray name={`cell4d:speciesType.[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"]`} render={arrayHelpers => {
															return (<div> {
																values?.["cell4d:speciesType"]?.[index]?.["cell4d:listOfBindingSites"]?.["cell4d:bindingSite"] && values?.["cell4d:speciesType"]?.[index]?.["cell4d:listOfBindingSites"]?.["cell4d:bindingSite"].length > 0 ?
																	values["cell4d:speciesType"][index]["cell4d:listOfBindingSites"]["cell4d:bindingSite"].map((site: any, bIndex: number) => (
																		<div key={bIndex}>
																			{/* <Form.Group as={Col} controlId="validationFormik01"> */}
																			{bIndex === 0 ? <Form.Label>List of molecule sites</Form.Label> : null}
																			<Card border="light" >
																				<Card.Body>
																					<Row>
																						<Col xs={5}>
																							<InputGroup>
																								<Form.Control className="form-control" size="sm"
																									name={`cell4d:speciesType.[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"].[${bIndex}][_attributes].id`}
																									value={values["cell4d:speciesType"][index]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][bIndex]["_attributes"].id}
																									placeholder="Enter site name"
																									onChange={handleChange}
																									onBlur={handleBlur}
																									isValid={getIn(touched, `cell4d:speciesType.[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"].[${bIndex}][_attributes].id`) &&
																										!getIn(errors, `cell4d:speciesType.[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"].[${bIndex}][_attributes].id`)}
																									isInvalid={getIn(touched, `cell4d:speciesType.[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"].[${bIndex}][_attributes].id`) &&
																										!!getIn(errors, `cell4d:speciesType.[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"].[${bIndex}][_attributes].id`)} />
																								<Form.Control.Feedback type="invalid">{getIn(errors, `cell4d:speciesType.[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"].[${bIndex}][_attributes].id`)}</Form.Control.Feedback>
																								{/* <Form.Check
																							type="checkbox"
																							name="site"
																							value={values.site}
																							label={values.site}
																						/> */}
																							</InputGroup>
																							<br />
																							<div className="form-group align-self-start">
																								<Button type="button" size="sm" variant="outline-danger" onClick={() => arrayHelpers.remove(bIndex)}>Remove site</Button>
																							</div>
																						</Col>
																						<Col xs={7}>
																							{/* list of possible states */}
																							<FieldArray name={`cell4d:speciesType.[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][${bIndex}]["cell4d:listOfPossibleStates"]["cell4d:state"]`} render={arrayHelpers => {
																								return (<div> {
																									values?.["cell4d:speciesType"]?.[index]?.["cell4d:listOfBindingSites"]?.["cell4d:bindingSite"]?.[bIndex]?.["cell4d:listOfPossibleStates"]?.["cell4d:state"] && values?.["cell4d:speciesType"]?.[index]?.["cell4d:listOfBindingSites"]?.["cell4d:bindingSite"]?.[bIndex]?.["cell4d:listOfPossibleStates"]?.["cell4d:state"].length > 0 ?
																										values["cell4d:speciesType"][index]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][bIndex]["cell4d:listOfPossibleStates"]["cell4d:state"].map((site: any, sIndex: number) => (
																											<div key={sIndex}>
																												<Form.Row>
																													<Form.Group as={Col} controlId="validationFormik01">
																														{/* {sIndex === 0 ? <Form.Label>States</Form.Label> : null} */}
																														<Form.Control className="form-control" size="sm"
																															name={`cell4d:speciesType.[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][${bIndex}]["cell4d:listOfPossibleStates"]["cell4d:state"][${sIndex}][_attributes].value`}
																															value={values["cell4d:speciesType"][index]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][bIndex]["cell4d:listOfPossibleStates"]["cell4d:state"][sIndex]["_attributes"].value}
																															placeholder="Enter state name"
																															onChange={handleChange}
																															onBlur={handleBlur}
																															isValid={getIn(touched, `cell4d:speciesType[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][${bIndex}]["cell4d:listOfPossibleStates"]["cell4d:state"][${sIndex}][_attributes].value`) &&
																																!getIn(errors, `cell4d:speciesType[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][${bIndex}]["cell4d:listOfPossibleStates"]["cell4d:state"][${sIndex}][_attributes].value`)}
																															isInvalid={getIn(touched, `cell4d:speciesType[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][${bIndex}]["cell4d:listOfPossibleStates"]["cell4d:state"][${sIndex}][_attributes].value`) &&
																																!!getIn(errors, `cell4d:speciesType[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][${bIndex}]["cell4d:listOfPossibleStates"]["cell4d:state"][${sIndex}][_attributes].value`)} />
																														<Form.Control.Feedback type="invalid">{getIn(errors, `cell4d:speciesType[${index}]["cell4d:listOfBindingSites"]["cell4d:bindingSite"][${bIndex}]["cell4d:listOfPossibleStates"]["cell4d:state"][${sIndex}][_attributes].value`)}</Form.Control.Feedback>
																													</Form.Group>
																													<div className="form-group">
																														<Button type="button" size="sm" variant="outline-danger" onClick={() => arrayHelpers.remove(sIndex)}>Remove state</Button>
																													</div>
																												</Form.Row>
																											</div>
																										)) : null
																								}
																									<Button type="button" size="sm" onClick={() => arrayHelpers.push(empty_bind_site)} className="justify-content-flex-start">
																										Add state
																									</Button>
																									<br />
																									<br />
																								</div>
																								)
																							}}
																							/>
																						</Col>
																					</Row>
																				</Card.Body>
																			</Card>
																			<br />
																		</div>
																	)) : null
															}
																<Button type="button" onClick={() => arrayHelpers.push(empty_site)} className="justify-content-flex-start">Add new molecule binding site</Button>
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
									<Button type="button" onClick={() => arrayHelpers.push(emptyAnnot)}>Add molecule</Button>
								</div>
								)
							}}
							/>
							<br />
							{/* <pre>{JSON.stringify(values?.["cell4d:speciesType"][0]["cell4d:listOfValidCompartments"]["cell4d:compartment"], null, 2)}</pre> */}

							<Button type="submit">Save base molecules to model</Button>
							{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

						</Container>
					</Form>
				)}
			</Formik>
		</div >
	);
}
