import {Api} from "./utils/Api";
import {Roles} from "./types/bases/Roles";

/**
 * ? Before starting replace User and Role in types/base
 * ? vocabulary :
 * ? /root/controller/endpoint
 * ! body & returned are mandatory
 * ! endpoint name mustn't contain the "_" in it.
 * * examples :
 * * /api/example/userImages				-> OK
 * * /api/example/user_images				-> ERROR
 * * /api/example/userImages/create			-> OK
 * * /api/example/user_images/create		-> ERROR
 * * /api/example/userImages/createTest		-> OK
 * * /api/example/userImages/create_test	-> ERROR
 */

export interface ApiInterface {
	api: {
		health: {
			"/": {
				body: {},
				returned: {
					result: "ok"
				}
			},
			"version": {
				body: {},
				returned: {
					backend: string;
					frontend: string;
				}
			}
		}
	}
}

/**
 * ! Default allow access to all routes
 */
export const permissions: Api.Permissions = {
	[Roles.guest]: []
}
