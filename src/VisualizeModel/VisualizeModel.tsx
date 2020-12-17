import React, { useContext, useEffect } from 'react';
import ReactJson from 'react-json-view';
import modelContext from '../modelContext';
import './VisualizeModel.css'

function transform_json_visual() {

}

export default function VisualizeModel() {
	const modelChange = useContext(modelContext);

	useEffect(() => {

	}, [modelChange.modelJson])

	return (
		<div className="viewer">
			<ReactJson src={modelChange.modelJson} theme="summerfruit:inverted" enableClipboard={false} displayDataTypes={false} indentWidth={2} />
		</div>
	);
};
