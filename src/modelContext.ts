import { createContext } from 'react';
import { modelInterface, annotSpecies } from './types';

const modelContext = createContext<modelInterface>({
	modelJson: {
		"cell4d:environmentVariables": null,
		"listOfCompartments": null,
		annotSpecies: null,
		"listOfSpecies": null,
		reactions: null,
		events: null,
	},
	changeModelJson: (key: string, new_state: any) => {},

	compartList: [], 
	setCompartList: (compartments: Array<string>) => {}, 

	annotSpeciesList: Array<annotSpecies>(), 
	setAnnotSpeciesList: (annotSpecies: Array<annotSpecies>) => {}, 
});

export default modelContext;
