interface IRoute {
	root: string;
	controller: string;
	endpoint: string
}

export class Route {

	static parse(path: string): IRoute | undefined {
		const reg = new RegExp("^/(?<root>\\w+)/(?<controller>\\w+)/(?<endpoint>.+)$", "g").exec(path);
		if (reg && reg.groups) {
			return {
				root: reg.groups.root,
				controller: reg.groups.controller,
				endpoint: reg.groups.endpoint
			}
		}
		return undefined;
	}

	static from(route: IRoute): string {
		return `/${route.root}/${route.controller}/${route.controller}`;
	}

	static pathify(parts: string[]): string {
		const res = parts.join("/");
		return `/${res}`;
	}

	static unpath(path: string): string[] {
		const parts = path.split("/");
		if (path[0] === "/") parts.shift();
		const res = [parts[0], parts[1], parts.splice(2, parts.length - 2).join("_")];
		return res.filter(e => !!e);
	}


}
