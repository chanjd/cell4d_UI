import { validate_xml } from '../xml_validate';
import { define_schemas } from "../schema";

let possible_general_errors = ["missing_env_var", "missing_annot_species",
	"missing_compartment", "missing_species"];
let schema = define_schemas();


describe('basic model', () => {
	test('all components', () => {
		let test_xml_obj = validate_xml("../tests/basic/test_all.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(true);
	});
	test('only compartments', () => {
		let test_xml_obj = validate_xml("../tests/basic/compart.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(true);
	});
	test('only compartments, annotspecies', () => {
		let test_xml_obj = validate_xml("../tests/basic/compart_annot.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(true);
	});
	test('only compartments, annotspecies, species', () => {
		let test_xml_obj = validate_xml("../tests/basic/compart_annot_species.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(true);
	});
	test('missing env_vars', () => {
		let test_xml_obj = validate_xml("../tests/basic/no_env_vars.xml", schema);
		expect(test_xml_obj.pass).toBe(false);
		expect(test_xml_obj.errors).toHaveProperty("general", [possible_general_errors[0]]);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
	});
	test('missing annot_species', () => {
		let test_xml_obj = validate_xml("../tests/basic/no_annot_species.xml", schema);
		expect(test_xml_obj.pass).toBe(false);
		expect(test_xml_obj.errors).toHaveProperty("general", [possible_general_errors[1]]);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
	});
	test('missing compart', () => {
		let test_xml_obj = validate_xml("../tests/basic/no_comparts.xml", schema);
		expect(test_xml_obj.pass).toBe(false);
		expect(test_xml_obj.errors).toHaveProperty("general", [possible_general_errors[2]]);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
	});
	test('missing species', () => {
		let test_xml_obj = validate_xml("../tests/basic/no_species.xml", schema);
		expect(test_xml_obj.pass).toBe(false);
		expect(test_xml_obj.errors).toHaveProperty("general", [possible_general_errors[3]]);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
	});
	test('missing events', () => {
		let test_xml_obj = validate_xml("../tests/basic/no_events.xml", schema);
		expect(test_xml_obj.pass).toBe(true);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
	});
	test('missing reactions', () => {
		let test_xml_obj = validate_xml("../tests/basic/no_reactions.xml", schema);
		expect(test_xml_obj.pass).toBe(true);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
	});
})

describe('env vars', () => {
	let possible_env_errors = ["missing_var", "invalid_var"];
	test('all pass', () => {
		let test_xml_obj = validate_xml("../tests/env/test_all.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(true);
	});

	test('empty parameters', () => {
		let test_xml_obj = validate_xml("../tests/env/empty_params.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", Array(8).fill(possible_env_errors[0]));
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});

	// the 3 dimension parameters are wrong types (not positive integers)
	test('wrong dimensions', () => {
		let test_xml_obj = validate_xml("../tests/env/wrong_dim.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", Array(3).fill(possible_env_errors[1]));
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});

	// timescale/spacescale are wrong types
	test('wrong scales', () => {
		let test_xml_obj = validate_xml("../tests/env/wrong_scale.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", Array(2).fill(possible_env_errors[1]));
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});

	// all wrong parameter types
	test('wrong parameters', () => {
		let test_xml_obj = validate_xml("../tests/env/all_wrong_params.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", Array(8).fill(possible_env_errors[1]));
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});
})

describe('compartments', () => {
	let possible_compart_errors = ["missing_var", "invalid_var"];
	test('all pass', () => {
		let test_xml_obj = validate_xml("../tests/comparts/test_all.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(true);
	});

	test('empty parameters', () => {
		let test_xml_obj = validate_xml("../tests/comparts/no_comparts.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", [possible_general_errors[2]]);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", []);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});
	test('missing id', () => {
		let test_xml_obj = validate_xml("../tests/comparts/missing_id.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", [possible_compart_errors[0]]);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});
	// different ways of missing compartment latt definition
	test('missing x1', () => {
		let test_xml_obj = validate_xml("../tests/comparts/missing_latt.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", [possible_compart_errors[0]]);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});
	test('missing latt', () => {
		let test_xml_obj = validate_xml("../tests/comparts/missing_latt_2.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", [possible_compart_errors[0]]);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});
	test('missing annotation', () => {
		let test_xml_obj = validate_xml("../tests/comparts/missing_latt_3.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", [possible_compart_errors[0]]);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});
	// different membrane definition errors
	test('wrong type', () => {
		let test_xml_obj = validate_xml("../tests/comparts/mem_wrong_type.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", [possible_compart_errors[1]]);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});
	test('wrong axis', () => {
		let test_xml_obj = validate_xml("../tests/comparts/mem_wrong_axis.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", [possible_compart_errors[1]]);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});
	test('wrong face', () => {
		let test_xml_obj = validate_xml("../tests/comparts/mem_wrong_face.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", [possible_compart_errors[1]]);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});
	test('wrong rate', () => {
		let test_xml_obj = validate_xml("../tests/comparts/mem_wrong_rate.xml", schema);
		expect(test_xml_obj.errors).toHaveProperty("general", []);
		expect(test_xml_obj.errors).toHaveProperty("env_var", []);
		expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
		expect(test_xml_obj.errors).toHaveProperty("compartment", [possible_compart_errors[1]]);
		expect(test_xml_obj.errors).toHaveProperty("species", []);
		expect(test_xml_obj.errors).toHaveProperty("reactions", []);
		expect(test_xml_obj.errors).toHaveProperty("events", []);
		expect(test_xml_obj.pass).toBe(false);
	});

	describe('annot species', () => {
		let possible_annot_species_errors = ["missing_var", "invalid_var"];
		test('all pass', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/test_all.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
	
		test('missing annot_species id', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/missing_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing annot_species type', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/missing_speciesType.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing compart 1', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/missing_comparts.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing compart 2', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/missing_comparts_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid compart id', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/invalid_compart.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('metabolite has binding sites', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/metab_binding.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing binding id', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/wrong_binding.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});

		test('wrong annot display', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/wrong_display.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing annot display', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/missing_display.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing annot display_2', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/missing_display_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", Array(2).fill(possible_annot_species_errors[0]));
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong annot difc', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/wrong_difc.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing annot difc', () => {
			let test_xml_obj = validate_xml("../tests/annot_species/missing_difc.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", [possible_annot_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
	});
	describe('species', () => {
		let possible_species_errors = ["missing_var", "invalid_var", "no_match"];
		test('all pass', () => {
			let test_xml_obj = validate_xml("../tests/species/test_all.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
		test('missing annotation', () => {
			let test_xml_obj = validate_xml("../tests/species/missing_annotation.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing id', () => {
			let test_xml_obj = validate_xml("../tests/species/missing_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing compart id', () => {
			let test_xml_obj = validate_xml("../tests/species/missing_compart_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing comparts', () => {
			let test_xml_obj = validate_xml("../tests/species/missing_comparts.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing comparts_2', () => {
			let test_xml_obj = validate_xml("../tests/species/missing_comparts_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing compart initial', () => {
			let test_xml_obj = validate_xml("../tests/species/missing_compart_initial.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong compart id', () => {
			let test_xml_obj = validate_xml("../tests/species/wrong_compart_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong compart initial', () => {
			let test_xml_obj = validate_xml("../tests/species/wrong_compart_initial.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong species types', () => {
			let test_xml_obj = validate_xml("../tests/species/wrong_speciestypes.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing species types', () => {
			let test_xml_obj = validate_xml("../tests/species/missing_speciestypes.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing species types 2', () => {
			let test_xml_obj = validate_xml("../tests/species/missing_speciestypes_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});

		test('missing species binding', () => {
			let test_xml_obj = validate_xml("../tests/species/missing_binding.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong species binding', () => {
			let test_xml_obj = validate_xml("../tests/species/wrong_binding.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong species binding 2', () => {
			let test_xml_obj = validate_xml("../tests/species/wrong_binding_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong species binding 3', () => {
			let test_xml_obj = validate_xml("../tests/species/wrong_binding_3.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong species binding 4', () => {
			let test_xml_obj = validate_xml("../tests/species/wrong_binding_4.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong species binding 5', () => {
			let test_xml_obj = validate_xml("../tests/species/wrong_binding_5.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", [possible_species_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
	});

	describe('species', () => {
		let possible_reaction_errors = ["missing_var", "invalid_var", "no_match"];
		test('all pass', () => {
			let test_xml_obj = validate_xml("../tests/reactions/test_all.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});

		test('missing react compart', () => {
			let test_xml_obj = validate_xml("../tests/reactions/missing_compart.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing react compart 2', () => {
			let test_xml_obj = validate_xml("../tests/reactions/missing_compart_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
		test('missing reactant id', () => {
			let test_xml_obj = validate_xml("../tests/reactions/missing_reactant_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing product id', () => {
			let test_xml_obj = validate_xml("../tests/reactions/missing_product_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong reactant id', () => {
			let test_xml_obj = validate_xml("../tests/reactions/wrong_reactant_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong product id', () => {
			let test_xml_obj = validate_xml("../tests/reactions/wrong_product_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong reactant bind', () => {
			let test_xml_obj = validate_xml("../tests/reactions/wrong_bind_reactant.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('wrong product bind', () => {
			let test_xml_obj = validate_xml("../tests/reactions/wrong_bind_product.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing reactant bind', () => {
			let test_xml_obj = validate_xml("../tests/reactions/missing_bind_reactant.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
		test('missing product bind', () => {
			let test_xml_obj = validate_xml("../tests/reactions/missing_bind_product.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
		test('invalid reactant bind', () => {
			let test_xml_obj = validate_xml("../tests/reactions/invalid_reactant_bind.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid product bind', () => {
			let test_xml_obj = validate_xml("../tests/reactions/invalid_product_bind.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid reactant bind_2', () => {
			let test_xml_obj = validate_xml("../tests/reactions/invalid_reactant_bind_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid product bind_2', () => {
			let test_xml_obj = validate_xml("../tests/reactions/invalid_product_bind_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});


		test('test enzymatic', () => {
			let test_xml_obj = validate_xml("../tests/reactions/test_enz.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
		test('enzymatic invalid param name', () => {
			let test_xml_obj = validate_xml("../tests/reactions/enz_invalid_name.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('enzymatic invalid param name 2', () => {
			let test_xml_obj = validate_xml("../tests/reactions/enz_invalid_name_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('enzymatic invalid param value', () => {
			let test_xml_obj = validate_xml("../tests/reactions/enz_invalid_name.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('enzymatic invalid modifier', () => {
			let test_xml_obj = validate_xml("../tests/reactions/enz_invalid_mod.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('enzymatic invalid modifier 2', () => {
			let test_xml_obj = validate_xml("../tests/reactions/enz_invalid_mod_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[2]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('reaction invalid param name', () => {
			let test_xml_obj = validate_xml("../tests/reactions/invalid_react_param_name.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('reaction invalid param name 2', () => {
			let test_xml_obj = validate_xml("../tests/reactions/invalid_react_param_name_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('reaction invalid param value', () => {
			let test_xml_obj = validate_xml("../tests/reactions/invalid_react_param_value.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[1]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('reaction missing param value', () => {
			let test_xml_obj = validate_xml("../tests/reactions/missing_react_param_value.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", [possible_reaction_errors[0]]);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(false);
		});
	})

	describe("event testing", () => {
		let possible_event_errors = ["missing_var", "invalid_var", "no_match"];
		test('all pass', () => {
			let test_xml_obj = validate_xml("../tests/events/test_all.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
		test('missing event attributes', () => {
			let test_xml_obj = validate_xml("../tests/events/missing_attrs.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid event attribute type', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_event_attr_type.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid event attribute trigger', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_event_attr_trigger.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid event attribute probability', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_event_attr_prob.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid event attribute probability 2', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_event_attr_prob_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});

		// add_mols event
		test('missing add mols element', () => {
			let test_xml_obj = validate_xml("../tests/events/add_mols_missing_element.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid add mols id', () => {
			let test_xml_obj = validate_xml("../tests/events/add_mols_invalid_element_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[2]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid add mols amount', () => {
			let test_xml_obj = validate_xml("../tests/events/add_mols_invalid_element_amount.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		// remove_mols event
		test('missing delete mols element', () => {
			let test_xml_obj = validate_xml("../tests/events/delete_mols_missing_element.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid delete mols id', () => {
			let test_xml_obj = validate_xml("../tests/events/delete_mols_invalid_element_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[2]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid delete mols amount', () => {
			let test_xml_obj = validate_xml("../tests/events/delete_mols_invalid_element_amount.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		// transport_mols event
		test('missing transport mols element', () => {
			let test_xml_obj = validate_xml("../tests/events/transport_mols_missing_element.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid transport mols id', () => {
			let test_xml_obj = validate_xml("../tests/events/transport_mols_invalid_element_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[2]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid transport mols amount', () => {
			let test_xml_obj = validate_xml("../tests/events/transport_mols_invalid_element_amount.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		// test transport_destination location node
		test('missing transport location node', () => {
			let test_xml_obj = validate_xml("../tests/events/transport_mols_missing_element_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing transport location attrs', () => {
			let test_xml_obj = validate_xml("../tests/events/missing_transport_attrs.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid transport location compart', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_transport_compart.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[2]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid transport location coords', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_transport_coords.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid transport location coords 2', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_transport_coords_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing transport location coords', () => {
			let test_xml_obj = validate_xml("../tests/events/missing_transport_coords.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing transport location coords 2', () => {
			let test_xml_obj = validate_xml("../tests/events/missing_transport_coords_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('extra transport location coords', () => {
			let test_xml_obj = validate_xml("../tests/events/extra_transport_coords_compart.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		// test time trigger
		test('time trigger pass', () => {
			let test_xml_obj = validate_xml("../tests/events/time_trigger.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
		test('time trigger missing node', () => {
			let test_xml_obj = validate_xml("../tests/events/time_trigger_missing_node.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('time trigger missing attrs', () => {
			let test_xml_obj = validate_xml("../tests/events/time_trigger_missing_attrs.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('time trigger invalid attrs', () => {
			let test_xml_obj = validate_xml("../tests/events/time_trigger_invalid_attrs.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", Array(3).fill(possible_event_errors[1]));
			expect(test_xml_obj.pass).toBe(false);
		});
		// test event trigger
		test('event trigger pass', () => {
			let test_xml_obj = validate_xml("../tests/events/event_trigger.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
		test('event trigger missing element', () => {
			let test_xml_obj = validate_xml("../tests/events/event_trigger_missing_element.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('event trigger missing attrs', () => {
			let test_xml_obj = validate_xml("../tests/events/event_trigger_missing_attrs.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('event trigger invalid name', () => {
			let test_xml_obj = validate_xml("../tests/events/event_trigger_invalid_name.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[2]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('event trigger invalid name 2', () => {
			let test_xml_obj = validate_xml("../tests/events/event_trigger_invalid_name_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[2]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('event trigger invalid delay', () => {
			let test_xml_obj = validate_xml("../tests/events/event_trigger_invalid_delay.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		//test state trigger
		test('state trigger pass', () => {
			let test_xml_obj = validate_xml("../tests/events/time_trigger.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", []);
			expect(test_xml_obj.pass).toBe(true);
		});
		test('state trigger missing element', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_missing_element.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger missing loc element', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_missing_loc_element.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger invalid loc compart', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_invalid_loc.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[2]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger invalid loc 2', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_invalid_loc_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger invalid loc 3', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_invalid_loc_3.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger missing attrs', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_missing_attrs.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger invalid attr amount', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_invalid_attrs_amount.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger invalid attr condition', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_invalid_attrs_condition.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger invalid attr id', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_invalid_attrs_id.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[2]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger invalid attr interval', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_invalid_attrs_interval.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('state trigger invalid attr repeat', () => {
			let test_xml_obj = validate_xml("../tests/events/state_trigger_invalid_attrs_repeat.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});


		// test location node
		test('missing event location node', () => {
			let test_xml_obj = validate_xml("../tests/events/missing_location_node.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing event location attrs', () => {
			let test_xml_obj = validate_xml("../tests/events/missing_location_attrs.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid event location compart', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_location_compart.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[2]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid event location coords', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_location_coords.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('invalid event location coords 2', () => {
			let test_xml_obj = validate_xml("../tests/events/invalid_location_coords_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[1]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing event location coords', () => {
			let test_xml_obj = validate_xml("../tests/events/missing_location_coords.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('missing event location coords 2', () => {
			let test_xml_obj = validate_xml("../tests/events/missing_location_coords_2.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});
		test('extra event location coords', () => {
			let test_xml_obj = validate_xml("../tests/events/extra_location_coords_compart.xml", schema);
			expect(test_xml_obj.errors).toHaveProperty("general", []);
			expect(test_xml_obj.errors).toHaveProperty("env_var", []);
			expect(test_xml_obj.errors).toHaveProperty("annot_species", []);
			expect(test_xml_obj.errors).toHaveProperty("compartment", []);
			expect(test_xml_obj.errors).toHaveProperty("species", []);
			expect(test_xml_obj.errors).toHaveProperty("reactions", []);
			expect(test_xml_obj.errors).toHaveProperty("events", [possible_event_errors[0]]);
			expect(test_xml_obj.pass).toBe(false);
		});

	})
})
