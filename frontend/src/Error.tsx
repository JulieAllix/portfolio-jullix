import * as React from "react";

import "./Error.scss";
import {Button} from "primereact/button";

namespace Error {
	export interface Props {
	}

	export interface State {
		hasError: boolean;
	}
}

export class Error extends React.Component<Error.Props, Error.State> {

	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		};
	}



	componentDidCatch(error, info) {

		// Display fallback UI
		this.setState({hasError: true});
	}


	public render() {
		if (this.state.hasError) {
			return (
				<div className="h-full flex flex-column justify-content-between error-page">
				<div className="flex mt-5 justify-content-start content-header">
				</div>
					<div className='flex flex-column align-items-center content-footer'>
						<span className="mb-3 text-error">Erreur 500</span>
						<span className="mb-5 text-description">Une erreur est survenue !</span>
						<Button label="Revenir sur la page d'accueil" onClick={()=>{ window.location.href = '/' }} className={"btn-redirect"} />
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}
