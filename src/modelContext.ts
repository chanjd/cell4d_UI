import { createContext } from 'react';

interface modelInterface {
	modelJson: {
		"cell4d:environmentVariables": any,
		"listOfCompartments": any,
		annotSpecies: any,
		species: any,
		reactions: any,
		events: any,
	}
	changeModelJson: Function,
}
const modelContext = createContext<modelInterface>({
	modelJson: {
		"cell4d:environmentVariables": null,
		"listOfCompartments": null,
		annotSpecies: null,
		species: null,
		reactions: null,
		events: null,
	},
	changeModelJson: (key: string, new_state: any) => {},
});

export default modelContext;
