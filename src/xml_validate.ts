declare var require: any
const { strict, match } = require("assert");
const { ENGINE_METHOD_DSA } = require("constants");
const fs = require("fs")
const xmlParser = require("xml2json")


export let get_env = function (model_obj: any): any {
	let env_model = model_obj?.["annotation"]?.["cell4d:environmentVariables"];
	if (!env_model) {
		return false;
	}
	return (env_model);
}



function isPositiveInt(str: any) {
	return !isNaN(str) && Number.isInteger(parseFloat(str)) && str >= 0;
}

// case insensitive string matching to target list
let is_correct_string = function (input: string, valid_strings: Array<string>): boolean {
	valid_strings = valid_strings.map(function (x) { return x.toLocaleUpperCase(); });
	if (input && valid_strings.includes(input.toLocaleUpperCase())) {
		return (true);
	}
	return (false);
}

let is_in_range = function (input: number, valid_range: Array<number>): boolean {
	if (valid_range.length != 2) {
		console.error(`Invalid range ${valid_range} used in is_in_range() call`)
	}
	if(valid_range[0] > valid_range[1]) {
		valid_range = [valid_range[1], valid_range[0]];
	}
	if (!isNaN(input) && input >= valid_range[0] && input <= valid_range[1]) {
		return (true);
	}

	return (false);
}

// validate env variables
let validate_env = function (env_model: any): { pass: boolean; errors: Array<string>; } {
	let output = { pass: true, errors: Array<string>() }
	let possible_errors = ["missing_var", "invalid_var"];
	let env_var_array = ["cell4d:X_DIM", "cell4d:Y_DIM", "cell4d:Z_DIM",
		"cell4d:GEOMETRY", "cell4d:TIMESCALE", "cell4d:SPACESCALE",
		"cell4d:INACCESSIBLE_SPACE_PERCENT", "cell4d:MAX_CYCLES"];

	for (const env_element of env_var_array) {
		if (!env_model[env_element]) {
			console.log(`environmental variables must contain '${env_element}'`);
			output.errors.push(possible_errors[0]);
		}

		if (env_element.match("DIM") && env_model[env_element]) {
			if (!isPositiveInt(env_model[env_element].$t)) {
				console.log("dimensions must be positive integer values");
				output.errors.push(possible_errors[1]);
			}
		}
	}

	if (!env_model["cell4d:GEOMETRY"]) {
	} else if (!is_correct_string(env_model["cell4d:GEOMETRY"].$t, ["cube"])) {
		console.log(`geometry parameter '${env_model["cell4d:GEOMETRY"].$t}' should be 'cube'`);
		output.errors.push(possible_errors[1]);
	}
	if (!env_model["cell4d:TIMESCALE"]) {
	} else if (!is_in_range(env_model["cell4d:TIMESCALE"].$t, [0,1])) {
		console.log("timescale parameter should not be greater than 1");
		output.errors.push(possible_errors[1]);
	}
	if (!env_model["cell4d:SPACESCALE"]) {
	} else if (!is_in_range(env_model["cell4d:SPACESCALE"].$t, [0,1])) {
		console.log("spacescale parameter should not be greater than 1");
		output.errors.push(possible_errors[1]);
	}
	if (!env_model["cell4d:INACCESSIBLE_SPACE_PERCENT"]) {
	} else if (!is_in_range(env_model["cell4d:INACCESSIBLE_SPACE_PERCENT"].$t, [0,100])) {
		console.log("INACCESSIBLE_SPACE_PERCENT parameter should be between 0 and 100");
		output.errors.push(possible_errors[1]);
	}
	if (!env_model["cell4d:MAX_CYCLES"]) {
	} else if (!isPositiveInt(env_model["cell4d:MAX_CYCLES"].$t)) {
		console.log("Simulation cycles must be a positive integer");
		output.errors.push(possible_errors[1]);
	}


	if (output.errors.length !== 0) output.pass = false;
	return (output)
}

let validate_comparts = function (compart_model: any): { pass: boolean; errors: Array<string>; } {
	let output = { pass: true, errors: Array<string>() }
	let possible_errors = ["missing_var", "invalid_var"];

	if (!Array.isArray(compart_model)) compart_model = [compart_model];
	Object.values(compart_model).forEach(function (compart: any) {
		if (!compart.id) {
			console.log("compartment must have id attribute");
			output.errors.push(possible_errors[0]);
		}
		if (compart.id === "default") return;
		if (!compart["annotation"]) {
			console.log("compartment " + compart.id + " is missing annotation tags")
			output.errors.push(possible_errors[0]);
			return;
		}
		// optional compart properties field for membranes
		if (compart["annotation"]["cell4d:compartmentProperties"]) {
			let compart_props = compart["annotation"]["cell4d:compartmentProperties"];
			if (compart_props.type === "membrane") {
				if (!(compart_props.axis && compart_props.face && compart_props.membraneEmissionRate && compart_props.absorptionRate)) {
					console.log("membrane attributes 'axis' 'face' membraneEmissionRate' 'absorptionRate' missing")
					output.errors.push(possible_errors[0]);
				}
				let allowable_axis = ["x", "y", "z"];
				let allowable_faces = ["front", "back"];
				if(!is_correct_string(compart_props.axis, allowable_axis)) {
					console.log("membrane axis must be 'x' 'y' or 'z'")
					output.errors.push(possible_errors[1]);
				}
				if(!is_correct_string(compart_props.face, allowable_faces)) {
					console.log("membrane face must be 'front' (plane close to 0) or 'back' (plane away from 0)")
					output.errors.push(possible_errors[1]);
				}
				if (!is_in_range(compart_props.membraneEmissionRate, [0,1])) {
					console.log("membraneEmissionRate between 0 and 1")
					output.errors.push(possible_errors[1]);
				}
				if (!is_in_range(compart_props.absorptionRate, [0,1])) {
					console.log("absorptionRate between 0 and 1")
					output.errors.push(possible_errors[1]);
				}
			} else {
				console.log("compartment type must be membrane")
				output.errors.push(possible_errors[1]);
			}
		}
		if (!compart["annotation"]["cell4d:latticePointDefinition"]) {
			console.log("compartment must have lattice point definition in annotation tag");
			output.errors.push(possible_errors[0]);
			return;
		}

		// ensure all lattice point def's are integers
		let lpd = compart["annotation"]["cell4d:latticePointDefinition"];

		if (!Array.isArray(lpd)) {
			lpd = [lpd];
		}
		for (var i = 0; i < lpd.length; i++) {
			if (lpd[i].type !== "solid") {
				console.log("compartment " + compart.id + " has invalid " + lpd[i].type + " compartment type")
				output.errors.push(possible_errors[1]);
			}
			let lpd_dim = ["x1", "x2", "y1", "y2", "z1", "z2"];
			for (const dim_attr of lpd_dim) {
				// console.log(lpd[i][dim_attr])
				if (!lpd[i][dim_attr]) {
					output.errors.push(possible_errors[0]);
					continue;
				}
				if (!isPositiveInt(lpd[i][dim_attr])) {
					console.log("dimension attributes must be positive integers")
					output.errors.push(possible_errors[1]);
				}
			}
		}
	})

	if (output.errors.length !== 0) output.pass = false;
	return (output);
}

let validate_annot_species = function (annot_model: any, compart_list: Array<string>): { pass: boolean; errors: Array<string>; } {
	let output = { pass: true, errors: Array<string>() }
	let possible_errors = ["missing_var", "invalid_var"];
	if (!Array.isArray(annot_model)) annot_model = [annot_model];
	Object.values(annot_model).forEach(function (annotspecies: any) {
		if (!annotspecies.id) {
			console.log("annotation species must have id attribute");
			output.errors.push(possible_errors[0]);
		}
		if(!is_correct_string(annotspecies.speciesMoleculeType, ["SIMPLE_MOLECULE", "PROTEIN"])) {
			console.log("annotation species type must be either SIMPLE_MOLECULE or PROTEIN");
			output.errors.push(possible_errors[0]);
		}

		// check validcompartments
		let has_comparts = true;
		if (annotspecies?.["cell4d:listOfValidCompartments"]?.["cell4d:compartment"] === undefined) {
			console.log("annotation species must have at least 1 valid compartment");
			output.errors.push(possible_errors[0]);
			has_comparts = false;
		}
		if (has_comparts) {
			let comparts = annotspecies["cell4d:listOfValidCompartments"]["cell4d:compartment"];
			// deal with 1 or more comparts (array of obj or obj)
			if (!Array.isArray(comparts)) comparts = [comparts];
			let valid_comparts: Array<string> = comparts.map((compart: { id: string; }) => { return compart.id })
			if (!valid_comparts.every(compart => compart_list.includes(compart))) {
				console.log("a 'validCompartment' of " + annotspecies.id + " is not in list of compartments.");
				output.errors.push(possible_errors[1]);
			}
		}
		if (annotspecies["cell4d:listOfBindingSites"]) {
			if (annotspecies.speciesMoleculeType === "SIMPLE_MOLECULE") {
				console.log("simple molecules cannot have binding or modification sites");
				output.errors.push(possible_errors[1]);
			} else if (!annotspecies["cell4d:listOfBindingSites"]["cell4d:bindingSite"]) {
				console.log("annotation species binding sites element should not be empty, if exists");
				output.errors.push(possible_errors[0]);
			}
			if (annotspecies.speciesMoleculeType === "PROTEIN") {
				let binding_sites = annotspecies["cell4d:listOfBindingSites"]["cell4d:bindingSite"];
				if (!Array.isArray(binding_sites)) binding_sites = [binding_sites];
				Object.values(binding_sites).forEach(function (site: any) {
					if (!site.id) {
						console.log("annotation species binding site must have id attribute");
						output.errors.push(possible_errors[0]);
					}
					if (site.states) {
						let states: Array<string> = site.states;
						if (!Array.isArray(states)) states = [states];
						Object.values(states).forEach(function (state: string) {
							if (!state) {
								console.log("annotation species binding states must have value attribute");
								output.errors.push(possible_errors[0]);
							}
						})
					}
				})
			}
		}

		if (!annotspecies["cell4d:diffusionConstant"]) {
			console.log("annotation species must have diffusion constant attribute");
			output.errors.push(possible_errors[0]);
		} else if (!is_in_range(annotspecies["cell4d:diffusionConstant"].value, [0,1])) {
			console.log("diffusion constant should be between 0 and 1");
			output.errors.push(possible_errors[1]);
		}
		if (!annotspecies["cell4d:displayProperties"]) {
			console.log("annotation species must have displayProperties attribute");
			output.errors.push(possible_errors[0]);
		} else if (annotspecies["cell4d:displayProperties"]) {
			let display_colors = ["redValue", "greenValue", "blueValue"];
			for (const color of display_colors) {
				if (!annotspecies["cell4d:displayProperties"][color]) {
					output.errors.push(possible_errors[0]);
				} else if (!is_in_range(annotspecies["cell4d:displayProperties"][color], [0,255])) {
					console.log("color properties must be between 0 and 255")
					output.errors.push(possible_errors[1]);
				}
			}
		}
	})

	if (output.errors.length !== 0) output.pass = false;
	return (output);
}

let validate_species = function (species_model: any, compart_list: Array<string>, annotspecies_bindings_list: any): { pass: boolean; errors: Array<string>; } {
	let output = { pass: true, errors: Array<string>() }
	let possible_errors = ["missing_var", "invalid_var", "no_match"];
	if (!Array.isArray(species_model)) species_model = [species_model];
	Object.values(species_model).forEach(function (species: any) {
		if (!species.id) {
			console.log("species must have id attribute");
			output.errors.push(possible_errors[0]);
		}
		if (!species["annotation"]) {
			console.log("species information must be inside annotation tags");
			output.errors.push(possible_errors[0]);
			return;
		}

		// check compartments
		let compartments_list;
		if (species?.["annotation"]?.["cell4d:listOfValidCompartments"]?.["cell4d:compartment"] === undefined) {
			console.log(`species ${species.id} missing valid compartment info`);
			output.errors.push(possible_errors[0]);
		} else {
			compartments_list = species["annotation"]["cell4d:listOfValidCompartments"]["cell4d:compartment"];
			// turn single entries into array length 1 to loop
			if (!Array.isArray(compartments_list)) compartments_list = [compartments_list];
			for (let i = 0; i < compartments_list.length; i++) {
				if (!compartments_list[i].id) {
					console.log("initial compartment id must be specified");
					output.errors.push(possible_errors[0]);
				} else if (!compart_list.includes(compartments_list[i].id)) {
					output.errors.push(possible_errors[2]);
				}
				if (!compartments_list[i].initial) {
					console.log(`initial placement counts of ${species.id} in ${compartments_list[i].id} must be specified (can be 0)`);
					output.errors.push(possible_errors[0]);
				} else if (!isPositiveInt(compartments_list[i].initial)) {
					console.log(`initial counts of ${species.id} in ${compartments_list[i].id} must be a positive integer`);
					output.errors.push(possible_errors[1]);
				}
			}
		}

		if (species?.["annotation"]?.["cell4d:listOfSpeciesTypes"]?.["cell4d:speciesType"] === undefined) {
			output.errors.push(possible_errors[0]);
		} else {
			let species_types = species["annotation"]["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"]
			if (!Array.isArray(species_types)) species_types = [species_types];
			for (let species_type of species_types) {
				let species_sites = species_type["cell4d:bindingSite"];
				if (!species_sites) species_sites = [];
				if (!Array.isArray(species_sites)) species_sites = [species_sites];
				// there is a difference between bind sites and mod sites. only 1 of state and binding should be filled
				for (let species_site of species_sites) {
					// state XOR binding filled
					if (!(species_site.state === "") ? !(species_site.binding === "") : (species_site.binding === "")) {
						console.log(`Species ${species_type.id}: only 1 of state or binding site should be filled`);
						output.errors.push(possible_errors[1]);
					}
					// if binding filled, must be target strings
					if (!(is_correct_string(species_site.binding, ["unbind", "unbound","bind","bound"])) && species_site.binding !== "") {
						console.log(`Species ${species_type.id}: invalid binding parameter ${species_site.binding}`);
						output.errors.push(possible_errors[1]);
					}
				}
				// don't allow wildcard matches, all bind sites/states must be filled in species info
				if (!match_species(species_type, annotspecies_bindings_list)) {
					output.errors.push(possible_errors[2]);
				}
			}
		}


		// diffusionConstant and displayProperties are optional here, validate if exists
		if (species["annotation"]["cell4d:diffusionConstant"]) {
			let difc = species["annotation"]["cell4d:diffusionConstant"].value;
			if(!is_in_range(difc, [0,1])) {
				console.log("diffusion constant cannot be negative");
				output.errors.push(possible_errors[1]);
			}
		}
		if (species["annotation"]["cell4d:displayProperties"]) {
			let display_colors = ["redValue", "greenValue", "blueValue"];
			for (const color of display_colors) {
				if (!is_in_range(species["annotation"]["cell4d:displayProperties"][color], [0,255])) {
					console.log("color properties must be between 0 and 255")
					output.errors.push(possible_errors[1]);
				}
			}
		}
		
	})

	if (output.errors.length !== 0) output.pass = false;
	return (output);
}

// reaction validation
let validate_reactions = function (reactions_model: any, compart_list: Array<string>,
	annotspecies_bindings_list: any, metabolite_list: string[]): { pass: boolean; errors: Array<string>; } {
	let output = {
		pass: true,
		errors: Array<string>()
	}
	let possible_errors = ["missing_var", "invalid_var", "no_match"];
	if (!Array.isArray(reactions_model)) reactions_model = [reactions_model];
	Object.values(reactions_model).forEach(function (reaction: any) {
		let reaction_id = reaction.id;
		let annotation = reaction["annotation"];
		let list_reactants = reaction["listOfReactants"];
		let list_modifiers = reaction["listOfModifiers"];
		let list_products = reaction["listOfProducts"];
		if (!list_reactants || !list_modifiers || !list_products) {
			console.log("missing reactant/product/modifier lists in reaction " + reaction_id);
			output.errors.push(possible_errors[0]);
			return;
		}

		// scan optional list of compartments elements in reaction annotation
		if (annotation) {
			if (annotation["cell4d:listOfCompartments"]) {
				let reaction_comparts = annotation["cell4d:listOfCompartments"]["cell4d:compartment"];
				if (!reaction_comparts) {
					output.errors.push(possible_errors[0]);
					return;
				}
				if (!Array.isArray(reaction_comparts)) reaction_comparts = [reaction_comparts];
				let reaction_comparts_list = reaction_comparts.map((compart: { id: any; }) => { return compart.id })
				for (let react_compart of reaction_comparts_list) {
					if (!compart_list.every((compart: string) => compart_list.includes(react_compart))) {
						console.log(`an allowed compartment of reaction ${reaction_id} does not exist.`)
						output.errors.push(possible_errors[1]);
					}
				}
			}
		}

		// check for placeholders, sbml compliance
		if (!list_reactants["speciesReference"] || !list_products["speciesReference"] || !list_modifiers["modifierSpeciesReference"]) {
			console.log("reaction list must have 'speciesReference' or 'modifierSpeciesReference' placeholder elements");
			output.errors.push(possible_errors[0]);
		} else if (!list_reactants["speciesReference"].species ||
			!list_modifiers["modifierSpeciesReference"].species ||
			!list_products["speciesReference"].species) {
			console.log("'speciesReference' must have 'species' placeholder attribute");
			output.errors.push(possible_errors[0]);
		}

		let reactants = list_reactants["annotation"]["cell4d:speciesReference"];
		if (!Array.isArray(reactants)) reactants = [reactants];
		for (let reactant of reactants) {
			if (reactant?.["cell4d:listOfSpeciesTypes"]?.["cell4d:speciesType"] === undefined) {
				console.log("list of reactants in reaction " + reaction_id + " missing species list.")
				output.errors.push(possible_errors[0]);
				return;
			}
			let species_types = reactant["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"];
			if (!Array.isArray(species_types)) species_types = [species_types];
			for (let species_type of species_types) {
				if (!species_type.id) {
					output.errors.push(possible_errors[0]);
					return;
				}
				let species_sites = species_type["cell4d:bindingSite"];
				if (!species_sites) species_sites = [];
				if (!Array.isArray(species_sites)) species_sites = [species_sites];
				// there is a difference between bind sites and mod sites. only 1 of state and binding should be filled
				let invalid_found = false;
				for (let species_site of species_sites) {
					// state XOR binding filled
					if (!(species_site.state === "") ? !(species_site.binding === "") : (species_site.binding === "")) {
						console.log(`Species ${species_type.id}: only 1 of state or binding site should be filled`);
						output.errors.push(possible_errors[1]);
						invalid_found = true;
					}
					if (!(is_correct_string(species_site.binding, ["unbind", "unbound","bind","bound"])) && species_site.binding !== "") {
						console.log(`Species ${species_type.id}: invalid binding parameter ${species_site.binding}`);
						output.errors.push(possible_errors[1]);
						invalid_found = true;
					}
				}
				if (invalid_found) continue;
				// allow wildcard matches, all bind sites/states must be filled in species info
				if (!match_species(species_type, annotspecies_bindings_list, true)) {
					output.errors.push(possible_errors[2]);
				}
			}
		}

		let products = list_products["annotation"]["cell4d:speciesReference"];
		if (!Array.isArray(products)) products = [products];
		for (let product of products) {
			if (!product["cell4d:listOfSpeciesTypes"]) {
				console.log("list of products in reaction " + reaction_id + " missing species list.")
			}
			let species_types = product["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"];
			if (!Array.isArray(species_types)) species_types = [species_types];
			for (let species_type of species_types) {
				if (!species_type.id) {
					output.errors.push(possible_errors[0]);
					return;
				}
				let species_sites = species_type["cell4d:bindingSite"];
				if (!species_sites) species_sites = [];
				if (!Array.isArray(species_sites)) species_sites = [species_sites];
				// there is a difference between bind sites and mod sites. only 1 of state and binding should be filled
				let invalid_found = false;
				for (let species_site of species_sites) {
					// state XOR binding filled
					if (!(species_site.state === "") ? !(species_site.binding === "") : (species_site.binding === "")) {
						console.log(`Species ${species_type.id}: only 1 of state or binding site should be filled`);
						output.errors.push(possible_errors[1]);
						invalid_found = true;
					}
					if (!(is_correct_string(species_site.binding, ["unbind", "unbound","bind","bound"])) && species_site.binding !== "") {
						console.log(`Species ${species_type.id}: invalid binding parameter ${species_site.binding}`);
						output.errors.push(possible_errors[1]);
						invalid_found = true;
					}
				}
				if (invalid_found) continue;
				// allow wildcard matches, all bind sites/states must be filled in species info
				if (!match_species(species_type, annotspecies_bindings_list, true)) {
					output.errors.push(possible_errors[2]);
				}
			}
			// products can have optional active transport field
			if (products["cell4d:activeTransport"]) {
				if (products["cell4d:activeTransport"].destination) {
					if (!compart_list.includes(products["cell4d:activeTransport"].destination)) {
						console.log("destination compartment " + products["cell4d:activeTransport"].destination +
							" of reaction " + reaction_id + " does not exist.");
						output.errors.push(possible_errors[1]);
					}
				} else {
					console.log("destination of transport of product in " + reaction_id + " must be in 'destination' attribute")
					output.errors.push(possible_errors[0]);
				}
			}
		}

		// deal with modifier field
		let modifier = list_modifiers["annotation"]["cell4d:speciesReference"];
		let is_enzymatic = false;
		if (Array.isArray(modifier)) {
			console.log("There should only be one 'modifier' in reaction " + reaction_id)
			output.errors.push(possible_errors[1]);
		}
		let modifier_species = modifier["cell4d:listOfSpeciesTypes"]["cell4d:speciesType"].id;
		if (modifier_species != "empty") {
			is_enzymatic = true;
			if (metabolite_list.includes(modifier_species)) {
				console.log(`modifier species ${modifier_species} cannot be a bulk molecule.`)
				output.errors.push(possible_errors[1]);
			} else if (!annotspecies_bindings_list.find((species: { id: any; }) => species.id === modifier_species)) {
				console.log(`modifier species ${modifier_species} does not exist.`)
				output.errors.push(possible_errors[2]);
			}
		}

		// kinetics
		let parameters = reaction?.["kineticLaw"]?.["listOfParameters"]?.["parameter"];
		if (!parameters) {
			console.log(`Reaction ${reaction_id} missing kinetic fields`)
			output.errors.push(possible_errors[0]);
		}
		let list_of_params_normal = ["Kforward", "Kreverse", "radius"];
		let list_of_params_enzmatic = ["Ka", "Kp", "Keq", "Vm"];

		if (!Array.isArray(parameters)) parameters = [parameters];
		let param_names: Array<string> = parameters.map((param: { name: string; }) => param.name)
		if (is_enzymatic) {
			// check both ways
			if (!list_of_params_enzmatic.every((l_param: string) => is_correct_string(l_param, param_names)) ||
				!param_names.every((param: string) => is_correct_string(param, list_of_params_enzmatic))) {
				console.log(`Enzymatic reactions have four reaction parameters "Ka", "Kp", "Keq", "Vm"`);
				output.errors.push(possible_errors[1]);
			}
		} else {
			if (!param_names.every((param: string) => is_correct_string(param, list_of_params_normal))) {
				console.log(`Reaction parameters are valid if "Kforward", "Kreverse", "radius"`);
				output.errors.push(possible_errors[1]);
			}
		}
		Object.values(parameters).forEach(function (param: any) {
			if (!param.name) {
				output.errors.push(possible_errors[0]);
			}
			if (!param.value) {
				output.errors.push(possible_errors[0]);
			} else if (!is_in_range(param.value, [0,Infinity])) {
				console.log(`Reaction ${reaction_id} parameter values must be a positive value.`);
				output.errors.push(possible_errors[1]);
			}
		})
	})
	if (output.errors.length !== 0) output.pass = false;
	return (output);
}

// match a given species info with description in annot species. optional wildcard parameter allows
// wobbly matching of states (all species sites must be in annot but not vice versa)
let match_species = function (species_type: any, annotspecies_bindings_list: any, wildcard = false): boolean {
	let id = species_type.id;
	let species_sites = species_type["cell4d:bindingSite"];
	if (!species_sites) species_sites = [];
	if (!Array.isArray(species_sites)) species_sites = [species_sites];

	if (!annotspecies_bindings_list.find((species: { id: any; }) => species.id === id)) {
		return false;
	}
	let annot_bindings = annotspecies_bindings_list.find((species: { id: any; }) => species.id === id).sites;
	let matching = false;
	// check for equality between binding list blueprint annot and species type binding list
	let list_of_species_sites = species_sites.map((site: { id: any; }) => {
		if (!site) return null;
		return site.id;
	})
	let list_of_annot_sites = annot_bindings.map((site: { id: any; }) => {
		if (!site) return null;
		return site.id;
	})
	// try to match the state of binding site to one of possible states described in annot
	let state_match = true;
	for (let species_site of species_sites) {
		if (species_site.state) {
			let found = false;
			for (let annot_site of annot_bindings) {
				if (annot_site.states && species_site.id === annot_site.id) {
					if (annot_site.states.includes(species_site.state)) found = true;
				}
				if (found) break;
			}
			if (!found) state_match = false;
		} else {
			let matched_site = annot_bindings.find((site: { id: any; }) => site.id === species_site.id);
			if (!matched_site) {
				state_match = false;
				break;
			} else {
				if (matched_site.states) {
					state_match = false;
					break;
				}
			}
		}
	}
	if (state_match) {
		if (list_of_species_sites.every((site: string) => list_of_annot_sites.includes(site))) {
			matching = true;
		}
	}

	if ((annot_bindings.length !== species_sites.length) && !wildcard) {
		matching = false;
		console.log("Species " + id + ": all binding site info must be filled");
	}

	if (!matching) {
		console.log("Species " + id + " has mismatched binding site with annotation info");
	}
	return (matching);
}

let validate_events = function (events_model: any, compart_list: Array<string>, species_list: Array<string>): { pass: boolean; errors: Array<string>; } {
	let output = { pass: true, errors: Array<string>() }
	let possible_errors = ["missing_var", "invalid_var", "no_match"];
	let event_name_list: Array<string> = events_model.map((event: { name: string; }) => {
		return event.name;
	})
	Object.values(events_model).forEach(function (event: any) {
		if (!(event.name && event.type && event.trigger && event.probability)) {
			console.log(`Not all attributes of event are filled`)
			output.errors.push(possible_errors[0]);
			return;
		}
		let possible_event_types = ["add_mols", "remove_mols", "transport_mols"];
		let possible_event_triggers = ["time", "state", "event"];
		let location_keywords = ["xloc", "yloc", "zloc", "xloc_1", "xloc_2", "yloc_1", "yloc_2", "zloc_1", "zloc_2"];
		if (!is_correct_string(event.type, possible_event_types)) {
			console.log(`Event ${event.name} has invalid event type ${event.type}`)
			output.errors.push(possible_errors[1]);
			return;
		}
		if (!is_correct_string(event.trigger, possible_event_triggers)) {
			console.log(`Event ${event.name} has invalid event type ${event.trigger}`)
			output.errors.push(possible_errors[1]);
			return;
		}
		if (isNaN(Number(event.probability)) || (event.probability > 1 || event.probability < 0)) {
			console.log(`Event ${event.name} probability must be 0 < x < 1, but is "${event.probability}"`)
			output.errors.push(possible_errors[1]);
		}

		if (!event[event.type]) {
			console.log(`Event ${event.name} missing ${event.type} element`);
			output.errors.push(possible_errors[0]);
			return;
		}
		if (!event[event.type].id || !event[event.type].amount) {
			console.log(`Event ${event.name} element ${event.type} must have 'id' and 'amount' attributes`);
			output.errors.push(possible_errors[0]);
		}
		if (!species_list.includes(event[event.type].id)) {
			console.log(`Event ${event.name} ${event.type} 'id' attribute must be a valid species`);
			output.errors.push(possible_errors[2]);
		}
		if (!isPositiveInt(event[event.type].amount)) {
			console.log(`Event ${event.name} element ${event.type} 'amount' attribute must be a positive integer`);
			output.errors.push(possible_errors[1]);
		}
		if (!event["location"]) {
			console.log(`Event ${event.name} must have 'location' element`);
			output.errors.push(possible_errors[0]);
			return;
		} else if (Object.keys(event["location"]).length === 1) {
			if (!event["location"].compartment) {
				console.log(`Event ${event.name} 'location' element must have 'compartment' attribute`);
				output.errors.push(possible_errors[0]);
			} else if (!compart_list.includes(event["location"].compartment)) {
				console.log(`Event ${event.name} compartment must be a valid compartment from listOfCompartments`)
				output.errors.push(possible_errors[2]);
			}
		} else {
			let coords_valid = true;
			if (Object.keys(event["location"]).length === 3) {
				if (!location_keywords.slice(0, 3).every(word => Object.keys(event["location"]).includes(word))) {
					console.log(`Event ${event.name} destination coordinates must be ${location_keywords.slice(0, 3)}`)
					output.errors.push(possible_errors[0]);
					coords_valid = false;
				}
			} else if (Object.keys(event["location"]).length === 6) {
				if (!location_keywords.slice(3, 9).every(word => Object.keys(event["location"]).includes(word))) {
					console.log(`Event ${event.name} location coordinate range must be ${location_keywords.slice(3, 9)}`)
					output.errors.push(possible_errors[0]);
					coords_valid = false;
				}
			} else {
				console.log(`Event ${event.name} 'location' element must have valid location information.`);
				output.errors.push(possible_errors[0]);
				coords_valid = false;
			}
			if (coords_valid) {
				for (let coord of Object.keys(event["location"])) {
					if (!isPositiveInt(event["location"][coord])) {
						console.log(`Event ${event.name} 'location' element ${coord} must be a positive integer`);
						output.errors.push(possible_errors[1]);
						break;
					}
				}
			}
		}

		if (event.type === "transport_mols") {
			if (!event["transport_destination"]) {
				console.log(`Event ${event.name} must have 'transport_destination' element`);
				output.errors.push(possible_errors[0]);
			} else if (Object.keys(event["transport_destination"]).length === 1) {
				if (!event["transport_destination"].compartment) {
					console.log(`Event ${event.name} 'transport_destination' element must have 'compartment' attribute`);
					output.errors.push(possible_errors[0]);
				} else if (!compart_list.includes(event["transport_destination"].compartment)) {
					console.log(`Event ${event.name} destination must be a valid compartment from listOfCompartments`)
					output.errors.push(possible_errors[2]);
				}
			} else {
				let coords_valid = true;
				if (Object.keys(event["transport_destination"]).length === 3) {
					if (!location_keywords.slice(0, 3).every(word => Object.keys(event["transport_destination"]).includes(word))) {
						console.log(`Event ${event.name} destination coordinates must be ${location_keywords.slice(0, 3)}`)
						output.errors.push(possible_errors[0]);
						coords_valid = false;
					}
				} else if (Object.keys(event["transport_destination"]).length === 6) {
					if (!location_keywords.slice(3, 9).every(word => Object.keys(event["transport_destination"]).includes(word))) {
						console.log(`Event ${event.name} destination coordinate range must be ${location_keywords.slice(3, 9)}`)
						output.errors.push(possible_errors[0]);
						coords_valid = false;
					}
				} else {
					console.log(`Event ${event.name} 'transport_destination' element must have destination information.`);
					output.errors.push(possible_errors[0]);
					coords_valid = false;
				}
				if (coords_valid) {
					for (let coord of Object.keys(event["transport_destination"])) {
						if (!isPositiveInt(event["transport_destination"][coord])) {
							console.log(`Event ${event.name} 'transport_destination' element ${coord} must be a positive integer`);
							output.errors.push(possible_errors[1]);
						}
					}
				}
			}
		}

		if (event.trigger === "time") {
			if (!event["time_trigger"]) {
				console.log(`Event ${event.name} must have 'time_trigger' element`);
				output.errors.push(possible_errors[0]);
				return;
			}
			if (!event["time_trigger"].repeat || !event["time_trigger"].interval || !event["time_trigger"].initial) {
				console.log(`Event ${event.name} 'time_trigger' element must have 'repeat' 'interval' 'initial' attributes`);
				output.errors.push(possible_errors[0]);
				return;
			}
			if (!is_correct_string(event["time_trigger"].repeat, ["true","false"])) {
				console.log(`Event ${event.name} 'repeat' attribute must be true or false`);
				output.errors.push(possible_errors[1]);
			}
			if (!isPositiveInt(event["time_trigger"].interval)) {
				console.log(`Event ${event.name} 'interval' attribute must be a positive integer`);
				output.errors.push(possible_errors[1]);
			}
			if (!isPositiveInt(event["time_trigger"].initial)) {
				console.log(`Event ${event.name} 'initial' attribute must be a positive integer`);
				output.errors.push(possible_errors[1]);
			}
		} else if (event.trigger === "state") {
			if (!event["state_trigger"]) {
				console.log(`Event ${event.name} must have 'state_trigger' element`);
				output.errors.push(possible_errors[0]);
				return;
			}
			if (!event["state_trigger"].repeat || !event["state_trigger"].condition || !event["state_trigger"].id ||
				!event["state_trigger"].amount || !event["state_trigger"].interval) {
				console.log(`Event ${event.name} 'state_trigger' must have 'repeat' 'condition' 'id' 'amount' 'interval' attributes`);
				output.errors.push(possible_errors[0]);
				return;
			}
			if (!is_correct_string(event["state_trigger"].repeat, ["true","false"])) {
				console.log(`Event ${event.name} 'repeat' attribute must be 'true' or 'false'`);
				output.errors.push(possible_errors[1]);
			}
			if (!is_correct_string(event["state_trigger"].condition, ["less_than","greater_than"])) {
					console.log(`Event ${event.name} 'condition' attribute must be 'less_than' or 'greater_than'`);
				output.errors.push(possible_errors[1]);
			}
			if (!species_list.includes(event["state_trigger"].id)) {
				console.log(`Event ${event.name} trigger species 'id' must be a valid species from listOfSpecies`)
				output.errors.push(possible_errors[2]);
			}
			if (!isPositiveInt(event["state_trigger"].interval)) {
				console.log(`Event ${event.name} 'interval' attribute must be a positive integer`);
				output.errors.push(possible_errors[1]);
			}
			if (!isPositiveInt(event["state_trigger"].amount)) {
				console.log(`Event ${event.name} 'amount' attribute must be a positive integer`);
				output.errors.push(possible_errors[1]);
			}

			if (!event["state_trigger_loc"]) {
				console.log(`Event ${event.name} must have 'state_trigger_loc' element`);
				output.errors.push(possible_errors[0]);
			} else if (Object.keys(event["state_trigger_loc"]).length === 1) {
				if (!event["state_trigger_loc"].compartment) {
					console.log(`Event ${event.name} 'state_trigger_loc' element must have 'compartment' attribute`);
					output.errors.push(possible_errors[0]);
				} else if (!compart_list.includes(event["state_trigger_loc"].compartment)) {
					console.log(`Event ${event.name} trigger location must be a valid compartment from listOfCompartments`)
					output.errors.push(possible_errors[2]);
				}
			} else {
				let coords_valid = true;
				if (Object.keys(event["state_trigger_loc"]).length === 3) {
					if (!location_keywords.slice(0, 3).every(word => Object.keys(event["state_trigger_loc"]).includes(word))) {
						console.log(`Event ${event.name} destination coordinates must be ${location_keywords.slice(0, 3)}`)
						output.errors.push(possible_errors[0]);
						coords_valid = false;
					}
				} else if (Object.keys(event["state_trigger_loc"]).length === 6) {
					if (!location_keywords.slice(3, 9).every(word => Object.keys(event["state_trigger_loc"]).includes(word))) {
						console.log(`Event ${event.name} destination coordinate range must be ${location_keywords.slice(3, 9)}`)
						output.errors.push(possible_errors[0]);
						coords_valid = false;
					}
				} else {
					console.log(`Event ${event.name} 'state_trigger_loc' element must have compartment information.`);
					output.errors.push(possible_errors[0]);
					coords_valid = false;
				}
				if (coords_valid) {
					for (let coord of Object.keys(event["state_trigger_loc"])) {
						if (!isPositiveInt(event["state_trigger_loc"][coord])) {
							console.log(`Event ${event.name} 'state_trigger_loc' element ${coord} must be a positive integer`);
							output.errors.push(possible_errors[1]);
						}
					}
				}
			}
		} else if (event.trigger === "event") {
			if (!event["event_trigger"]) {
				console.log(`Event ${event.name} must have 'state_trigger' element`);
				output.errors.push(possible_errors[0]);
				return;
			}
			if (!event["event_trigger"].name || !event["event_trigger"].delay) {
				console.log(`Event ${event.name} 'event_trigger' element must have 'name' 'delay' attributes`);
				output.errors.push(possible_errors[0]);
				return;
			}
			if (!event_name_list.includes(event["event_trigger"].name)) {
				console.log(`Event ${event.name} triggering event does not exist`);
				output.errors.push(possible_errors[2]);
			} else if (event["event_trigger"].name === event.name) {
				console.log(`Event ${event.name} triggering event cannot be itself`);
				output.errors.push(possible_errors[2]);
			}
			if (!isPositiveInt(event["event_trigger"].delay)) {
				console.log(`Event ${event.name} triggering event timestep delay must be a positive integer`);
				output.errors.push(possible_errors[1]);
			}

		}

	})
	if (output.errors.length !== 0) output.pass = false;
	return (output);
}


let validate_model = function (xml_obj: any): any {
	let output = {
		pass: true,
		errors: {
			general: Array<string>(),
			env_var: Array<string>(),
			annot_species: Array<string>(),
			compartment: Array<string>(),
			species: Array<string>(),
			reactions: Array<string>(),
			events: Array<string>(),
		}
	}

	let error = false;
	// validate sbml -> model levels
	if (!xml_obj["sbml"]["model"]) {
		console.log("top level must be 'sbml' followed by 'model'");
		error = true;
	}
	let xml_model = xml_obj["sbml"]["model"];

	// ensure all mandatory groups are there. Environmental variables, compartments
	let env_var = false;
	let annot_species = false;
	let compart = false;
	let species = false;
	let reactions = false;
	let events = false;
	if (xml_model?.["annotation"]?.["cell4d:environmentVariables"]) {
		env_var = true;
	}
	if (xml_model?.["listOfCompartments"]?.["compartment"] !== undefined) {
		compart = true;
	}
	if (xml_model?.["annotation"]?.["cell4d:listOfAnnotationSpeciesTypes"]?.["cell4d:speciesType"] !== undefined) {
		annot_species = true;
	}
	if (xml_model?.["listOfSpecies"]?.["species"] !== undefined) {
		species = true;
	}
	if (xml_model?.["listOfReactions"]?.["reaction"] !== undefined) {
		reactions = true;
	}
	if (xml_model?.["annotation"]?.["cell4d:events"]?.["event"] !== undefined) {
		events = true;
	}

	// dependencies between groups: events and reactions are optional.
	let possible_general_errors = ["missing_env_var", "missing_annot_species", "missing_compartment", "missing_species"];
	if (!env_var) {
		output.errors.general.push(possible_general_errors[0]);
	}
	if (species) {
		if (!annot_species) output.errors.general.push(possible_general_errors[1]);
	}
	if (!compart) {
		output.errors.general.push(possible_general_errors[2]);
	}
	if (events || reactions) {
		if (!species) output.errors.general.push(possible_general_errors[3]);
	}
	// if any general errors exist, stop
	if (output.errors.general.length > 0) {
		output.pass = false;
		return (output);
	}


	// validate env variables
	let env_model = xml_model["annotation"]["cell4d:environmentVariables"];
	let check_env = validate_env(env_model);
	if (!check_env.pass) {
		output.errors.env_var = check_env.errors.slice();
		output.pass = false;
	}

	// validate compartments
	let compart_model = xml_model["listOfCompartments"]["compartment"];
	if (!Array.isArray(compart_model)) compart_model = [compart_model];
	let compart_list: Array<string> = compart_model.map((compart: { id: any; }) => { return compart.id })
	let check_compart = validate_comparts(compart_model);
	if (!check_compart.pass) {
		output.errors.compartment = check_compart.errors.slice();
		output.pass = false;
	}

	// validate annotation species
	let metabolite_list: Array<string> = [];
	let annotspecies_bindings_list: Array<{ id: string, sites: any }> = [];
	if (annot_species) {
		let annotspecies_model = xml_model["annotation"]["cell4d:listOfAnnotationSpeciesTypes"]["cell4d:speciesType"];
		if (!Array.isArray(annotspecies_model)) annotspecies_model = [annotspecies_model];
		let metabolites = annotspecies_model.filter((species: { speciesMoleculeType: string; id: any; }) => {
			if (species.speciesMoleculeType === "SIMPLE_MOLECULE") {
				return (species.id)
			}
		});
		metabolite_list = metabolites.map((metab: any) => {
			return metab.id;
		})
		annotspecies_bindings_list = annotspecies_model.map((annotspecies: any) => {
			let species_id = annotspecies.id;
			if (!annotspecies["cell4d:listOfBindingSites"]) {
				return { id: species_id, sites: [] }
			}
			let sites = annotspecies["cell4d:listOfBindingSites"]["cell4d:bindingSite"]
			// deal with 1 or more binding sites (array of obj or obj)
			if (!Array.isArray(sites)) sites = [sites];
			Object.values(sites).forEach(function (site: any) {
				if (site["cell4d:listOfPossibleStates"]) {
					if (site["cell4d:listOfPossibleStates"]["cell4d:state"]) {
						site.states = site["cell4d:listOfPossibleStates"]["cell4d:state"].map((state: { value: any; }) => { return state.value });
						delete site["cell4d:listOfPossibleStates"];
					}
				}
			})
			return { id: species_id, sites: sites }
		})

		let check_annotspecies = validate_annot_species(annotspecies_model, compart_list);
		if (!check_annotspecies.pass) {
			output.errors.annot_species = check_annotspecies.errors.slice();
			output.pass = false;
		}
	}

	// validate list of species
	let species_list: Array<string> = [];
	if (species) {
		let species_model = xml_model["listOfSpecies"]["species"];
		if (!Array.isArray(species_model)) species_model = [species_model];
		species_list = species_model.map((species: { id: any; }) => { return species.id });
		let check_species = validate_species(species_model, compart_list, annotspecies_bindings_list);
		if (!check_species.pass) {
			output.errors.species = check_species.errors.slice();
			output.pass = false;
		}
	}

	// validate list of reactions
	let check_reactions;
	if (reactions) {
		let reactions_model = xml_model["listOfReactions"]["reaction"];
		if (!Array.isArray(reactions_model)) reactions_model = [reactions_model];
		check_reactions = validate_reactions(reactions_model, compart_list, annotspecies_bindings_list, metabolite_list);
		if (!check_reactions.pass) {
			output.errors.reactions = check_reactions.errors.slice();
			output.pass = false;
		}
	}

	// validate list of events
	let check_events;
	if (events) {
		let events_model = xml_model["annotation"]["cell4d:events"]["event"];
		if (!Array.isArray(events_model)) events_model = [events_model];
		check_events = validate_events(events_model, compart_list, species_list);
		if (!check_events.pass) {
			output.errors.events = check_events.errors.slice();
			output.pass = false;
		}
	}

	// if ((output.pass)) {
	// 	console.log("xml model is well-formed.")
	// }
	return (output);
};

export let validate_xml = function (xml_file: string): any {
	var xml_string;
	try {
		xml_string = fs.readFileSync(xml_file, "utf-8");
	} catch (err) {
		if (err.code === "ENOENT") {
			console.error(`File ${xml_file} not found.`)
			return;
		}
	}


	const xml_object = xmlParser.toJson(xml_string, { reversible: true, object: true });

	let valid = validate_model(xml_object);
	return (valid);
}

let test = validate_xml("./tests/events/state_trigger_invalid_loc_2.xml");
console.log(test);
