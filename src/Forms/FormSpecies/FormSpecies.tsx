import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Form, Button, Container, Card, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { schema } from '../../schema';
import { Formik, FieldArray, getIn } from 'formik';
import ColorPicker from '../colorPicker'
import "../../optional"; // custom "optional" function for yup validation
import modelContext from '../../modelContext';
import { annotSpecies } from '../../types';


// interface SpeciesFields {
// 	species: Array<{
// 		_attributes: {
// 			id: string,
// 			name: string,
// 			compartment: string
// 		},
// 		annotation: {
// 			"cell4d:listOfValidCompartments": {
// 				"cell4d:compartment": [
// 					{
// 						_attributes: {
// 							id: string,
// 							initial: number,
// 							distribution: string,
// 							xPoint: string,
// 							yPoint: string,
// 							zPoint: string,
// 							rate: number,
// 						}
// 					}
// 				]
// 			},
// 			"cell4d:listOfSpeciesTypes": {
// 				"cell4d:speciesType": Array<any>
// 			}
// 		},
// 	}>
// }

// use multiselect dropdown for compartemnts
export default function FormAnnot(props: any) {
	let emptySpecies = {
		_attributes: {
			id: "",
			name: "",
			compartment: "default"
		},
		annotation: {
			"cell4d:listOfValidCompartments": {
				"cell4d:compartment": [
					{
						_attributes: {
							id: "",
							initial: "0",
							distribution: "random",
							xPoint: "",
							yPoint: "",
							zPoint: "",
							rate: ""
						}
					}
				]
			},
			"cell4d:listOfSpeciesTypes": {
				"cell4d:speciesType": []
			}
		},
	}
	let empty_speciesType = {
		_attributes: {
			id: ""
		},
		"cell4d:bindingSite": []
	}
	let empty_bind_site = {
		_attributes: {
			id: "",
			state: "",
			binding: ""
		}
	}

	const model = useContext(modelContext);
	const handleSubmit = (values: any) => {
		let annot_out = {
			annotSpecies: {
				"species": values["species"]
			}
		}
		model.changeModelJson("annotSpecies", annot_out);
		console.log(JSON.stringify(values["species"]));
	}
	const [showDiff, setShowDiff] = useState(Array<boolean>());
	const [showColor, setShowColor] = useState(Array<boolean>());

	// delete the value if the field is not mounted
	useEffect(() => {
		setShowDiff(model.modelJson["listOfSpecies"]["species"].map((species: any, index: number) => {
			return (!!species.annotation?.["cell4d:diffusionConstant"]?._attributes?.value)
		}))
		setShowColor(model.modelJson["listOfSpecies"]["species"].map((species: any, index: number) => {
			return (!!species.annotation?.["cell4d:displayProperties"]?._attributes)
		}))
	}, [JSON.stringify(model.modelJson?.["listOfSpecies"]?.["species"])])

	// using filter instead of find here, returns an array of matching elements. Use this function by appending [0] to get first match. bypasses typescript possibly undefined check
	// which is accounted for with a value ? <code> : null ternary
	function getAnnotSpecies(annot_id: string) {
		let species = model.annotSpeciesList.find((species: annotSpecies) => {
			return species.id === annot_id;
		});
		return (species);
		// let name_array = model.annotSpeciesList.map((species: annotSpecies) => {
		// 	return species.id;
		// })
		// return (name_array.indexOf(annot_id))
	}

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
						{/* <pre>{JSON.stringify(showDiff, null, 2)}</pre> */}
						<Container>
							<FieldArray name="species" render={arrayHelpers => {
								return (<div> {
									values?.["species"] && values?.["species"].length > 0 ? values["species"].map((compart: any, index: number) => (
										<div key={index}>
											<Card >
												{/* Molecule ID, compartment, base species */}
												<Row style={{ paddingTop: 10 }}>
													<Col xs={3} style={{ paddingLeft: 30 }}>
														<Form.Label>Molecule name</Form.Label>
														<Form.Control className="form-control" size="sm"
															name={`species.[${index}]._attributes.id`}
															value={values["species"][index]._attributes.id}
															onChange={handleChange}
															onBlur={handleBlur}
															isValid={getIn(touched, `species.[${index}]._attributes.id`) &&
																!getIn(errors, `species.[${index}]._attributes.id`)}
															isInvalid={getIn(touched, `species.[${index}]._attributes.id`) &&
																!!getIn(errors, `species.[${index}]._attributes.id`)} />
														<Form.Control.Feedback type="invalid">{getIn(errors, `species.[${index}]._attributes.id`)}</Form.Control.Feedback>
														<br />
														<Button className="form-control" type="button" variant="outline-danger" onClick={() => arrayHelpers.remove(index)}>Remove molecule</Button>
														<br />
														<br />

														{/* optional diffusion and color display */}
														{showDiff[index] ?
															<>
																<Form.Label>Diffusion constant</Form.Label>
																<InputGroup size="sm">
																	<Form.Control type="number" className="form-control" size="sm"
																		name={`species.[${index}]["annotation"][cell4d:diffusionConstant]._attributes.value`}
																		value={values["species"][index]["annotation"]["cell4d:diffusionConstant"]._attributes.value}
																		onChange={handleChange}
																		onBlur={handleBlur}
																		isValid={getIn(touched, `species.[${index}]["annotation"][cell4d:diffusionConstant]._attributes.value`) &&
																			!getIn(errors, `species.[${index}]["annotation"][cell4d:diffusionConstant]._attributes.value`)}
																		isInvalid={getIn(touched, `species.[${index}]["annotation"][cell4d:diffusionConstant]._attributes.value`) &&
																			!!getIn(errors, `species.[${index}]["annotation"][cell4d:diffusionConstant]._attributes.value`)} />
																	<InputGroup.Append>
																		<InputGroup.Text id="diff_const">m<sup>2</sup>/s</InputGroup.Text>
																	</InputGroup.Append>
																	<Form.Control.Feedback type="invalid">{getIn(errors, `species.[${index}]["annotation"][cell4d:diffusionConstant]._attributes.value`)}</Form.Control.Feedback>
																</InputGroup>
																<div className="form-group align-self-start">
																	<Button type="button" size="sm" variant="outline-danger" onClick={() => {
																		let new_diffs = [...showDiff];
																		new_diffs[index] = false;
																		setShowDiff(new_diffs);
																		setFieldValue(`species.[${index}]["annotation"][cell4d:diffusionConstant]`, undefined)
																	}}>Remove custom diffusion constant</Button>
																</div>
															</>
															:
															<Button className="align-middle"
																type="button"
																size="sm"
																variant="secondary"
																onClick={() => {
																	let new_diffs = [...showDiff];
																	new_diffs[index] = true;
																	setShowDiff(new_diffs);
																	setFieldValue(`species.[${index}]["annotation"][cell4d:diffusionConstant]`, { _attributes: { value: 0 } })
																}}>
																Add custom diffusion constant
															</Button>
														}
														<br />
														<br />
														{showColor[index] ?
															<>
																<Form.Label>Custom color</Form.Label>
																<ColorPicker onChange={(color: { rgb: any }) => {
																	setFieldValue(`species.[${index}]["annotation"]["cell4d:displayProperties"]._attributes.redValue`, color.rgb.r)
																	setFieldValue(`species.[${index}]["annotation"]["cell4d:displayProperties"]._attributes.greenValue`, color.rgb.g)
																	setFieldValue(`species.[${index}]["annotation"]["cell4d:displayProperties"]._attributes.blueValue`, color.rgb.b)
																}}
																	red={values["species"][index]["annotation"]["cell4d:displayProperties"]._attributes.redValue}
																	green={values["species"][index]["annotation"]["cell4d:displayProperties"]._attributes.greenValue}
																	blue={values["species"][index]["annotation"]["cell4d:displayProperties"]._attributes.blueValue}
																/>
																<div className="form-group align-self-start">
																	<Button type="button" size="sm" variant="outline-danger" onClick={() => {
																		let new_colors = [...showColor];
																		new_colors[index] = false;
																		setShowColor(new_colors);
																		setFieldValue(`species.[${index}]["annotation"]["cell4d:displayProperties"]`, undefined)
																	}}>Remove custom color</Button>
																</div>
															</>
															:
															<>
																<Button className="align-middle"
																	type="button"
																	size="sm"
																	variant="secondary"
																	onClick={() => {
																		let new_colors = [...showColor];
																		new_colors[index] = true;
																		setShowColor(new_colors);
																		setFieldValue(`species.[${index}]["annotation"]["cell4d:displayProperties"]`, { _attributes: { redValue: 0, greenValue: 0, blueValue: 0 } })
																	}}>
																	Add custom color
																</Button>
																<br />
																<br />
															</>
														}
													</Col>
													<Col xs={3}>
														<FieldArray name={`species.[${index}]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"]`} render={arrayHelpers => {
															return (<div> {
																values?.["species"]?.[index]?.["annotation"]?.["cell4d:listOfValidCompartments"]?.["cell4d:compartment"] && values?.["species"]?.[index]?.["annotation"]?.["cell4d:listOfValidCompartments"]?.["cell4d:compartment"].length > 0 ?
																	values["species"][index]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"].map((compart: any, cIndex: number) => (
																		<div key={cIndex}>
																			{cIndex === 0 ? <Form.Label>Initial amount</Form.Label> : null}
																			{/* <InputGroup> */}
																			<Form.Control as="select" custom
																				id="dropdown-basic-button"
																				size="sm"
																				name={`species.[${index}]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"].[${cIndex}][_attributes].id`}
																				value={values["species"][index]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"][cIndex]._attributes.id}
																				// title={selected ? props.value : props.menuLabel}
																				onChange={handleChange}
																				onBlur={handleBlur}
																			>
																				{!values["species"][index]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"][cIndex]._attributes.id ?
																					<option value="">compartment</option>
																					: null}
																				{model.compartList.map((element: any, index: number) => {
																					return (
																						<option value={element}>{element}</option>
																					)
																				})
																				}
																			</Form.Control>
																			<Form.Control className="form-control" type="number" size="sm"
																				name={`species.[${index}]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"].[${cIndex}][_attributes].initial`}
																				value={values["species"][index]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"][cIndex]._attributes.initial}
																				onChange={handleChange}
																				onBlur={handleBlur}
																				isValid={getIn(touched, `species.[${index}]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"].[${cIndex}][_attributes].initial`) &&
																					!getIn(errors, `species.[${index}]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"].[${cIndex}][_attributes].initial`)}
																				isInvalid={getIn(touched, `species.[${index}]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"].[${cIndex}][_attributes].initial`) &&
																					!!getIn(errors, `species.[${index}]["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"].[${cIndex}][_attributes].initial`)} />
																			{/* </InputGroup> */}
																			<div className="form-group align-self-start">
																				<Button type="button" size="sm" variant="outline-danger" onClick={() => arrayHelpers.remove(cIndex)}>Remove compartment</Button>
																			</div>
																		</div>
																	)) : null
															}
																<Button
																	type="button"
																	size="sm"
																	onClick={() => arrayHelpers.push(emptySpecies["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"][0])}
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
													<Col xs={6} style={{ paddingRight: 30 }}>
														<FieldArray name={`species.[${index}]["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"]`} render={arrayHelpers => {
															return (<div> {
																values?.["species"]?.[index]?.["annotation"]?.["cell4d:listOfSpeciesTypes"]?.["cell4d:speciesType"] && values?.["species"]?.[index]?.["annotation"]?.["cell4d:listOfSpeciesTypes"]?.["cell4d:speciesType"].length > 0 ?
																	values["species"][index]["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"].map((species: any, mIndex: number) => (
																		<div key={mIndex}>
																			{mIndex === 0 ? <Form.Label>Molecule species list</Form.Label> : null}
																			<Card border="light">
																				<Card.Body>
																					<Col xs={6}>
																						<Form.Control as="select" custom
																							id="dropdown-basic-button"
																							size="sm"
																							name={`species.[${index}]["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"].[${mIndex}][_attributes].id`}
																							value={values["species"][index]["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"][mIndex]._attributes.id}
																							onChange={handleChange}
																							onBlur={handleBlur}
																						>
																							{!values["species"][index]["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"][mIndex]._attributes.id ?
																								<option value="">select species</option>
																								: null}
																							{model.annotSpeciesList.map((species: annotSpecies, index: number) => {
																								let species_id = species.id;
																								return (
																									<option value={species_id}>{species_id}</option>
																								)
																							})
																							}
																						</Form.Control>
																						<div className="form-group align-self-start">
																							<Button type="button" size="sm" variant="outline-danger" onClick={() => arrayHelpers.remove(mIndex)}>Remove molecule</Button>
																						</div>
																					</Col>
																					{/* show the states of the selected molecule, if there is an id value there */}
																					<Col xs={6}>
																						{values?.["species"]?.[index]?.["annotation"]?.["cell4d:listOfSpeciesTypes"]?.["cell4d:speciesType"]?.[mIndex]?._attributes?.id ?
																							<>
																								{/* Show the species sites if the site array exists and isn't empty */}
																								{values?.["species"]?.[index]?.["annotation"]?.["cell4d:listOfSpeciesTypes"]?.["cell4d:speciesType"]?.[mIndex]?.["cell4d:bindingSite"] &&
																									values?.["species"]?.[index]?.["annotation"]?.["cell4d:listOfSpeciesTypes"]?.["cell4d:speciesType"]?.[mIndex]?.["cell4d:bindingSite"].length > 0 ?
																									// map will create as many fields as binding sites on the molecule
																									values["species"][index]["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"][mIndex]["cell4d:bindingSite"].map((site: any, siteIndex: number) => {
																										return (
																											<Form.Control as="select" custom
																												id="dropdown-basic-button"
																												size="sm"
																												name={`species.[${index}]["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"].[${mIndex}]["cell4d:bindingSite"][${siteIndex}][_attributes]id`}
																												value={values["species"][index]["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"][mIndex]["cell4d:bindingSite"][siteIndex]._attributes.id}
																												onChange={handleChange}
																												onBlur={handleBlur}
																											>
																												{!values["species"][index]["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"][mIndex]._attributes.id ?
																													<option value="">select species</option>
																													: null}
																												{getAnnotSpecies(species._attributes.id) ?
																													getAnnotSpecies(species._attributes.id)?.sites[siteIndex].states.map((state: string, index: number) => {
																														return (
																															<option value={state}>{state}</option>
																														)
																													})
																													: null}
																											</Form.Control>
																										)
																									})
																									: null}
																							</>
																							: null}
																					</Col>
																				</Card.Body>
																			</Card>
																			<br />
																		</div>
																	)) : null
															}
																<Button
																	type="button"
																	size="sm"
																	onClick={() => arrayHelpers.push(emptySpecies["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"][0])}
																	className="justify-content-flex-start">
																	Add base molecule
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
									<Button type="button" onClick={() => arrayHelpers.push(emptySpecies)}>Add new molecule</Button>
								</div>
								)
							}}
							/>
							{/* <br /> */}
							{/* <pre>{JSON.stringify(values?.["species"][0], null, 2)}</pre> */}
							<hr />

							<Button variant="success" type="submit">Save base molecules to model</Button>
							{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

						</Container>
					</Form>
				)
				}
			</Formik>
		</div >
	);
}
