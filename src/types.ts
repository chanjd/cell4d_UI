export interface annotSpecies {
	id: string,
	sites: Array<{
		id: string,
		states: Array<string>
	}>
}

export interface species {
	id: string,
	sites: Array<{
		id: string,
		state: string
		binding: boolean
	}>
}


export interface modelInterface {
	modelJson: {
		"cell4d:environmentVariables": any,
		"listOfCompartments": any,
		"annotSpecies": any,
		"listOfSpecies": any,
		reactions: any,
		events: any,
	}
	changeModelJson: Function,

	compartList: Array<string>,
	setCompartList: Function, 

	annotSpeciesList: Array<annotSpecies>, 
	setAnnotSpeciesList: Function,
}
