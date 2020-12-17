import React from "react";
import { Formik, Form, FieldArray, useFormikContext } from "formik";
import { Col, Button, InputGroup } from 'react-bootstrap'

import "./styles.css";

const peopleData = {
	count: 2,
	people: [
		{
			name: "John",
			contacts: [{ number: "000000000" }, { number: "111111111" }]
		},
		{ name: "Doe", contacts: [] }
	]
};

interface compartsFormat {
	count: 2,
	compartment: [{
		id: number,
		pointDef: Array<{
			name: string,
			contacts: Array<{ number: string }>,
		}>,
		properties?: {
			type: string,
			axis: string,
			face: string,
			membraneEmissionRate: number,
			absorptionRate: number,
		},
	}]
}

interface peopleDataFormat {
	count: number,
	people: Array<{
		name: string,
		contacts: Array<{ number: string }>,
	}>
}

function Contacts({personIndex, contactsArrayHelpers}: any) {
	const [number, setNumber] = React.useState("");
	const { values } = useFormikContext<peopleDataFormat>();

	const handleAddContactNumber = () => {
		const contact = { number: number };

		contactsArrayHelpers.push(contact);
		setNumber("");
	};

	const handleChange = (event: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
		setNumber(event.currentTarget.value);
	};

	return (
		<>
			{values.people[personIndex].contacts.map((contact, index) => (
				<div key={contact.number + index}>
					{". " + contact.number}
					<br />
				</div>
			))}

			<input type="text" value={number} onChange={handleChange} />
			<button type="button" onClick={handleAddContactNumber}>
				add contact to {values.people[personIndex].name}
			</button>
		</>
	);
};

function People({peopleArrayHelpers}: any) {
	const [name, setName] = React.useState("");
	const { values, setFieldValue } = useFormikContext<peopleDataFormat>();

	const handleAddPerson = () => {
		const person: { name: string, contacts: Array<{ number: number }> } = {
			name: name,
			contacts: [],
		};

		peopleArrayHelpers.push(person);
		setFieldValue("count", values.count + 1);
		setName("");
	};

	const handleChange = (event: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
		setName(event.currentTarget.value);
	};

	return (
		<>
			<input type="text" value={name} onChange={handleChange} />
			<button type="button" onClick={handleAddPerson}>
				add person
      </button>
			{values.people.map((person, index) => (
				<div key={person.name + index}>
					<br />
					<span>{person.name}'s contacts:</span>
					<FieldArray name={`people[${index}].contacts`}>
						{arrayHelpers => (
							<>
								<br />
								<Contacts
									personIndex={index}
									contactsArrayHelpers={arrayHelpers}
								/>
							</>
						)}
					</FieldArray>
				</div>
			))}
		</>
	);
};

function MyForm(props: any) {
	const handleSubmit = (values: any) => {
		console.log(values);
	}
	return (
		<Formik initialValues={{ ...peopleData }} enableReinitialize={true} onSubmit={handleSubmit}>
			{({ values, handleSubmit }) => (
				<Form
					onChange={event => {
						console.log();
					}}
					onSubmit={handleSubmit}
				>
					<div style={{ display: "flex" }}>
						<div style={{ float: "left" }}>
							<span>number of people: {values.count}</span>
							<FieldArray name="people">
								{arrayHelpers => {
									return (
										<>
											<br />
											<People peopleArrayHelpers={arrayHelpers} />
										</>
									);
								}}
							</FieldArray>
						</div>
						<div>
							<pre style={{ fontSize: "65%" }}>
								{JSON.stringify(values, null, 2)}
							</pre>
						</div>
					</div>
					<Button type="submit" />
				</Form>
			)}
		</Formik>
	);
};
export default function App() {
	return <MyForm />;
}
