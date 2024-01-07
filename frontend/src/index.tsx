import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";

import { App } from "./App";
import { Error } from "./Error";
import {StatusWeb} from "./components/StatusWeb";

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';
import "primereact/resources/themes/saga-blue/theme.css";
import '../utils/prime-theme/theme.scss';
import 'react-toastify/dist/ReactToastify.css';

import {addLocale, locale} from "primereact/api";

addLocale('fr', {
	firstDayOfWeek: 1,
	dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
	dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
	dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
	monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
	monthNamesShort: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jul', 'aou', 'sep', 'oct', 'nov', 'dec'],
	today: 'Aujourd \'hui',
	clear: 'Effacer'
});

locale('fr');

render(
	<StatusWeb>
		<Error>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Error>
	</StatusWeb>,
	document.getElementById("body")
);
