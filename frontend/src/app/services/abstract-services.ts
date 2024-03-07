type RequestBody = {
	[key in string]: string | number;
};

export abstract class BaseRestApiService {
	protected post(
		url: string,
		options: { headers?: HeadersInit; body: RequestBody },
		needAuth = true,
	) {
		let authToken: string | null = null;
		if (needAuth) authToken = localStorage.getItem("auth_token");

		return fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
				...options.headers,
			},
			body: JSON.stringify(options.body),
		});
	}
}
