import * as yup from 'yup'; // for everything
import "./optional"; // custom "optional" function for yup validation


function define_schemas() {
	let possible_env_errors = ["missing_var", "invalid_var"];
	const envvarSchema = yup.object({
		"cell4d:X_DIM": yup.object({
			"_text": yup.number().required(possible_env_errors[0])
				.typeError(possible_env_errors[1])
				.positive(possible_env_errors[1])
				.integer(possible_env_errors[1])
		}),
		"cell4d:Y_DIM": yup.object({
			"_text": yup.number().required(possible_env_errors[0])
				.typeError(possible_env_errors[1])
				.positive(possible_env_errors[1])
				.integer(possible_env_errors[1])
		}),
		"cell4d:Z_DIM": yup.object({
			"_text": yup.number().required(possible_env_errors[0])
				.typeError(possible_env_errors[1])
				.positive(possible_env_errors[1])
				.integer(possible_env_errors[1])
		}),
		"cell4d:GEOMETRY": yup.object({
			"_text": yup.string().required(possible_env_errors[0])
				.oneOf(["cube"], possible_env_errors[1])
		}),
		"cell4d:TIMESCALE": yup.object({
			"_text": yup.number().required(possible_env_errors[0])
				.typeError(possible_env_errors[1])
				.positive(possible_env_errors[1])
				.lessThan(1, possible_env_errors[1])
		}),
		"cell4d:SPACESCALE": yup.object({
			"_text": yup.number().required(possible_env_errors[0])
				.typeError(possible_env_errors[1])
				.positive(possible_env_errors[1])
				.lessThan(1, possible_env_errors[1])
		}),
		"cell4d:INACCESSIBLE_SPACE_PERCENT": yup.object({
			"_text": yup.number().required(possible_env_errors[0])
				.typeError(possible_env_errors[1])
				.min(0, possible_env_errors[1])
				.max(100, possible_env_errors[1])
		}),
		"cell4d:MAX_CYCLES": yup.object({
			"_text": yup.number().required(possible_env_errors[0])
				.typeError(possible_env_errors[1])
				.positive(possible_env_errors[1])
				.integer(possible_env_errors[1])
		})
	}).defined();


	let possible_compart_errors = ["missing_var", "invalid_var"];

	const compartSchema = yup.object().shape({
		compartment: yup.array().of(
			yup.object().shape({
				_attributes: yup.object().shape({
					id: yup.string().required()
						.min(1),
				}).required(),
				annotation: yup.object().shape({
					"cell4d:latticePointDefinition": yup.array().of(
						yup.object().shape({
							_attributes: yup.object().shape({
								type: yup.string().required()
									.oneOf(["solid"]),
								x1: yup.number().required()
									.typeError()
									.integer()
									.min(0),
								y1: yup.number().required()
									.typeError()
									.integer()
									.min(0),
								z1: yup.number().required()
									.typeError()
									.integer()
									.min(0),
								x2: yup.number().required()
									.typeError()
									.integer()
									.min(0),
								y2: yup.number().required()
									.typeError()
									.integer()
									.min(0),
								z2: yup.number().required()
									.typeError()
									.integer()
									.min(0),
							})
						})
					).required(),
					compartmentProperties: yup.object().shape({
						type: yup.string().required()
							.oneOf(["membrane"]),
						axis: yup.string().required()
							.oneOf(["x", "y", "z"]),
						face: yup.string().required()
							.oneOf(["front", "back"]),
						membraneEmissionRate: yup.number().required()
							.typeError()
							.min(0)
							.max(1),
						absorptionRate: yup.number().required()
							.typeError()
							.min(0)
							.max(1),
					}).optional(),
				}).required(),
			})
		)
	});
	
	let possible_annot_species_errors = ["missing_var", "invalid_var", "no_match"];

	const annotSpeciesSchema = yup.object({
		_attributes: yup.object({
			id: yup.string().required(possible_annot_species_errors[0]),
			speciesMoleculeType: yup.string().required(possible_annot_species_errors[0])
				.oneOf(["SIMPLE_MOLECULE", "PROTEIN"], possible_annot_species_errors[1]),
		}),
		"cell4d:listOfValidCompartments": yup.object({
			"cell4d:compartment": yup.array().of(
				yup.object({
					_attributes: yup.object({
						id: yup.string().required(possible_annot_species_errors[0]),
					}),
				}).required(),
			).required(possible_annot_species_errors[0]).test({
				name: "valid compartments",
				message: possible_annot_species_errors[2],
				exclusive: false,
				test: function (compart_array: any) {
					// skip this test if the valid compart array is missing
					if (!compart_array) {
						return (true);
					}
					// typescript doesn't know what properties context obj has, will try to give error
					// force cast the context to the right type, check to make sure property exists after
					let extracted_context: any = this.options.context;
					let external_compart_list: Array<string> = extracted_context;

					// get the compartment id list from nested compartment json
					let valid_comparts = compart_array.map((compart: { _attributes: { id: string; } }) => { return compart._attributes.id })
					if (!external_compart_list) {
						return (false);
					}
					return (valid_comparts.every((compart: string) => external_compart_list.includes(compart)));
				},
			}),
		}),
		"cell4d:listOfBindingSites": yup.object({
			"cell4d:bindingSite": yup.array().of(
				yup.object().shape({
					_attributes: yup.object({
						id: yup.string().required(possible_annot_species_errors[0]),
					}),
					"cell4d:listOfPossibleStates": yup.object({
						"cell4d:state": yup.array().of(
							yup.object().shape({
								_attributes: yup.object().shape({
									value: yup.string().required(possible_annot_species_errors[0]),
								}),
							}).required(possible_annot_species_errors[0]),
						).required(possible_annot_species_errors[0]),
					}).optional(),
				}).required(possible_annot_species_errors[0]),
			).required(possible_annot_species_errors[0]),
		}).optional(),
		"cell4d:diffusionConstant": yup.object({
			_attributes: yup.object({
				value: yup.number().required(possible_annot_species_errors[0])
					.typeError(possible_annot_species_errors[1])
					.positive(possible_annot_species_errors[1])
					.lessThan(1, possible_annot_species_errors[1]),
			}),
		}),
		"cell4d:displayProperties": yup.object({
			_attributes: yup.object({
				redValue: yup.number().required(possible_annot_species_errors[0])
					.typeError(possible_annot_species_errors[1])
					.min(0, possible_annot_species_errors[1])
					.max(255, possible_annot_species_errors[1]),
				greenValue: yup.number().required(possible_annot_species_errors[0])
					.typeError(possible_annot_species_errors[1])
					.min(0, possible_annot_species_errors[1])
					.max(255, possible_annot_species_errors[1]),
				blueValue: yup.number().required(possible_annot_species_errors[0])
					.typeError(possible_annot_species_errors[1])
					.min(0, possible_annot_species_errors[1])
					.max(255, possible_annot_species_errors[1]),
			}),
		}),
	});
	interface annotSpecies {
		id: string,
		sites: Array<{
			id: string,
			states: Array<string>
		}>
	}
	interface species {
		id: string,
		sites: Array<{
			id: string,
			state: string
			binding: boolean
		}>
	}

	// custom deep compare function of base annotation species
	// fullMatch requires annotSpecies and species to have matching numbers of sites & site states must all be consistent
	// non-fullMatch only requires state consistency, species sites can be a subset of annotspecies sites
	// let compare_to_annotSpecies = function (species: species, annot: annotSpecies, fullMatch = true) {
	// 	let matched = true;
	// 	// check name of species
	// 	if (species.id !== annot.id) {
	// 		matched = false;
	// 	} else {
	// 		let species_site_ids = species.sites.map((site: any) => { return site.id });
	// 		let annotSpecies_site_ids = annot.sites.map((site: any) => { return site.id });

	// 		let matched_site_id = species_site_ids.every((site: string) => annotSpecies_site_ids.includes(site))
	// 		let reversed_matched_site_id = annotSpecies_site_ids.every((site: string) => species_site_ids.includes(site))
	// 		// check if site names match
	// 		if (fullMatch && ((species.sites.length !== annot.sites.length) || !matched_site_id || !reversed_matched_site_id)) {
	// 			matched = false;
	// 		} else {
	// 			// match every site of species with annotation species
	// 			let matched_sites: boolean = species.sites.every((species_site: any) => {
	// 				// get the matching site of the annotation species
	// 				let annot_site = annot.sites.find((annot_site) => {
	// 					annot_site.id === species_site.id
	// 				}, (species_site))
	// 				if (!annot_site) {
	// 					return (false)
	// 				}
	// 				// if species site is state and annot site is binding, or vice versa, return false
	// 				if ((!species_site.state && annot_site?.states.length !== 0) || (species_site.state && annot_site?.states.length === 0)) {
	// 					return (false);
	// 				}
	// 				// match species site state to annot species site states
	// 				let matched = annot_site?.states.find(species_site.state);
	// 				if (!matched) {
	// 					return (false);
	// 				}
	// 				return (true);
	// 			});
	// 			matched = matched_sites;
	// 		}

	// 	}
	// 	return (matched);
	// }

	let schema = {
		envVar: envvarSchema,
		compart: compartSchema,
		annotSpecies: annotSpeciesSchema,
		// compare_to_annotSpecies: compare_to_annotSpecies,
	}
	return (schema);
}

export const schema = define_schemas();
