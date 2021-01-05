import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Form, Button, InputGroup } from 'react-bootstrap'
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { schema } from '../../schema';
import { Formik, getIn, useFormikContext } from 'formik';
import modelContext from '../../modelContext';


interface envVarFormat {
	"cell4d:X_DIM": {
		"_text": number
	},
	"cell4d:Y_DIM": {
		"_text": number
	},
	"cell4d:Z_DIM": {
		"_text": number
	},
	"cell4d:GEOMETRY": {
		"_text": string
	},
	"cell4d:TIMESCALE": {
		"_text": number
	},
	"cell4d:SPACESCALE": {
		"_text": number
	},
	"cell4d:INACCESSIBLE_SPACE_PERCENT": {
		"_text": number
	},
	"cell4d:MAX_CYCLES": {
		"_text": number
	},

}

export default function FormEnv(props: any) {
	const modelChange = useContext(modelContext);

	const [submitSuccess, setSubmitSuccess] = useState(false);
	useEffect(() => { }, [submitSuccess])


	let ts_factor = 1e-6;
	let ss_factor = 1e-6;
	const handleSubmit = (values: any) => {
		let formObj = {
			"cell4d:environmentVariables": {
				"cell4d:X_DIM": {
					"_text": values["cell4d:X_DIM"]._text
				},
				"cell4d:Y_DIM": {
					"_text": values["cell4d:Y_DIM"]._text
				},
				"cell4d:Z_DIM": {
					"_text": values["cell4d:Z_DIM"]._text
				},
				"cell4d:GEOMETRY": {
					"_text": values["cell4d:GEOMETRY"]._text
				},
				"cell4d:TIMESCALE": {
					"_text": parseFloat(values["cell4d:TIMESCALE"]._text) * ts_factor
				},
				"cell4d:SPACESCALE": {
					"_text": parseFloat(values["cell4d:SPACESCALE"]._text) * ss_factor
				},
				"cell4d:INACCESSIBLE_SPACE_PERCENT": {
					"_text": values["cell4d:INACCESSIBLE_SPACE_PERCENT"]._text
				},
				"cell4d:MAX_CYCLES": {
					"_text": values["cell4d:MAX_CYCLES"]._text
				},
			}
		}
		modelChange.changeModelJson("cell4d:environmentVariables", formObj);
		setSubmitSuccess(true);
	}

	let { values } = useFormikContext<envVarFormat>() ?? {};

	return (
		<div>
			<Formik
				validationSchema={schema.envVar}
				// validationSchema={jsonSchema}
				onSubmit={handleSubmit}
				enableReinitialize={true}
				initialValues={props.initialValues}
			>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors,
				}) => (
					<Form onSubmit={handleSubmit} noValidate>
						<Form.Row>
							<Form.Group as={Col} md="4" controlId="validationFormik01">
								<Form.Label>X-Dim</Form.Label>
								<InputGroup size="sm">
									<Form.Control
										type="number"
										name={`cell4d:X_DIM._text`}
										value={values["cell4d:X_DIM"]._text}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={getIn(touched, 'cell4d:X_DIM._text') && !getIn(errors, 'cell4d:X_DIM._text')}
										isInvalid={getIn(touched, 'cell4d:X_DIM._text') && !!getIn(errors, 'cell4d:X_DIM._text')}
									/>
									<Form.Control.Feedback type="invalid">{getIn(errors, 'cell4d:X_DIM._text')}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} md="4" controlId="validationFormik02">
								<Form.Label>Y-Dim</Form.Label>
								<InputGroup size="sm">
									<Form.Control
										type="number"
										name="cell4d:Y_DIM._text"
										value={values["cell4d:Y_DIM"]._text}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={getIn(touched, 'cell4d:Y_DIM._text') && !getIn(errors, 'cell4d:Y_DIM._text')}
										isInvalid={getIn(touched, 'cell4d:Y_DIM._text') && !!getIn(errors, 'cell4d:Y_DIM._text')}
									/>
									<Form.Control.Feedback type="invalid">{errors.Y_DIM}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} md="4" controlId="validationFormik03">
								<Form.Label>Z-Dim</Form.Label>
								<InputGroup size="sm">
									<Form.Control
										type="number"
										name="cell4d:Z_DIM._text"
										value={values["cell4d:Z_DIM"]._text}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={getIn(touched, 'cell4d:Z_DIM._text') && !getIn(errors, 'cell4d:Z_DIM._text')}
										isInvalid={getIn(touched, 'cell4d:Z_DIM._text') && !!getIn(errors, 'cell4d:Z_DIM._text')}
									/>
									<Form.Control.Feedback type="invalid">{errors.Z_DIM}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} md="4" controlId="validationFormik04">
								<Form.Label>Space-scale</Form.Label>
								<InputGroup size="sm">
									<Form.Control
										type="text"
										name="cell4d:SPACESCALE._text"
										value={values["cell4d:SPACESCALE"]._text}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={getIn(touched, 'cell4d:SPACESCALE._text') && !getIn(errors, 'cell4d:SPACESCALE._text')}
										isInvalid={getIn(touched, 'cell4d:SPACESCALE._text') && !!getIn(errors, 'cell4d:SPACESCALE._text')}
									/>
									<InputGroup.Append>
										<InputGroup.Text id="ss_exponents">× 10 <sup>{Math.log10(ss_factor)}</sup>&nbsp;m</InputGroup.Text>
									</InputGroup.Append>
									<Form.Control.Feedback type="invalid">{getIn(errors, 'cell4d:SPACESCALE._text')}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group as={Col} md="4" controlId="validationFormik05">
								<Form.Label>Geometry</Form.Label>
								<InputGroup size="sm">
									<Form.Control
										type="text"
										name="cell4d:GEOMETRY._text"
										value={values["cell4d:GEOMETRY"]._text}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={getIn(touched, 'cell4d:GEOMETRY._text') && !getIn(errors, 'cell4d:GEOMETRY._text')}
										isInvalid={getIn(touched, 'cell4d:GEOMETRY._text') && !!getIn(errors, 'cell4d:GEOMETRY._text')}
										disabled
									/>
									<Form.Control.Feedback type="invalid">{getIn(errors, 'cell4d:GEOMETRY._text')}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group as={Col} md="4" controlId="validationFormik06">
								<Form.Label>Inaccessible space</Form.Label>
								<InputGroup size="sm">
									<Form.Control
										type="number"
										name="cell4d:INACCESSIBLE_SPACE_PERCENT._text"
										value={values["cell4d:INACCESSIBLE_SPACE_PERCENT"]._text}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={getIn(touched, 'cell4d:INACCESSIBLE_SPACE_PERCENT._text') && !getIn(errors, 'cell4d:INACCESSIBLE_SPACE_PERCENT._text')}
										isInvalid={getIn(touched, 'cell4d:INACCESSIBLE_SPACE_PERCENT._text') && !!getIn(errors, 'cell4d:INACCESSIBLE_SPACE_PERCENT._text')}
									/>
									<InputGroup.Append>
										<InputGroup.Text id="percent">%</InputGroup.Text>
									</InputGroup.Append>
									<Form.Control.Feedback type="invalid">{getIn(errors, 'cell4d:INACCESSIBLE_SPACE_PERCENT._text')}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} md="4" controlId="validationFormik07">
								<Form.Label>Time-scale</Form.Label>
								<InputGroup size="sm">
									<Form.Control
										type="text"
										name="cell4d:TIMESCALE._text"
										value={values["cell4d:TIMESCALE"]._text}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={getIn(touched, 'cell4d:TIMESCALE._text') && !getIn(errors, 'cell4d:TIMESCALE._text')}
										isInvalid={getIn(touched, 'cell4d:TIMESCALE._text') && !!getIn(errors, 'cell4d:TIMESCALE._text')}
									/>
									<InputGroup.Append>
										<InputGroup.Text id="ts_exponents">× 10 <sup>{Math.log10(ts_factor)}</sup>&nbsp;s</InputGroup.Text>
									</InputGroup.Append>
									<Form.Control.Feedback type="invalid">{getIn(errors, 'cell4d:TIMESCALE._text')}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} md="4" controlId="validationFormik08">
								<Form.Label>Max. simulation timesteps</Form.Label>
								<InputGroup size="sm">
									<Form.Control
										type="text"
										name="cell4d:MAX_CYCLES._text"
										value={values["cell4d:MAX_CYCLES"]._text}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={getIn(touched, 'cell4d:MAX_CYCLES._text') && !getIn(errors, 'cell4d:MAX_CYCLES._text')}
										isInvalid={getIn(touched, 'cell4d:MAX_CYCLES._text') && !!getIn(errors, 'cell4d:MAX_CYCLES._text')}
									/>
									<Form.Control.Feedback type="invalid">{getIn(errors, 'cell4d:MAX_CYCLES._text')}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

						</Form.Row>
						<Button type="submit" onClick={() => setSubmitSuccess(false)}>Save Environmental Variables to model</Button>
						{submitSuccess ? <><br/><br/><div className="alert-success col-lg justify-content-md-center">Environmental Variables saved to model!</div></> : null}

					</Form>
				)}
			</Formik>
		</div>
	);
}
