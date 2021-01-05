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

	compartList: Array<string>,
	setCompartList: Function, 

	annotSpeciesList: Array<any>, 
	setAnnotSpeciesList: Function,
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

	compartList: [], 
	setCompartList: (compartments: Array<string>) => {}, 

	annotSpeciesList: [], 
	setAnnotSpeciesList: (annotSpecies: Array<any>) => {}, 
});

export default modelContext;
