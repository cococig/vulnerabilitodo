type RequestBody = {
	[key in string]: string | number;
};

export abstract class BaseRestApiService {
	protected get(
		url: string,
		options?: { headers?: HeadersInit },
		needAuth = true,
	) {
		let authToken: string | null = null;
		if (needAuth) authToken = localStorage.getItem("auth_token");

		return fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
				...options?.headers,
			},
		});
	}

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

	protected put(
		url: string,
		options?: { headers?: HeadersInit; body?: RequestBody },
		needAuth = true,
	) {
		let authToken: string | null = null;
		if (needAuth) authToken = localStorage.getItem("auth_token");

		return fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
				...options?.headers,
			},
			body: options?.body ? JSON.stringify(options.body) : undefined,
		});
	}

	protected delete(
		url: string,
		options?: { headers?: HeadersInit; body?: RequestBody },
		needAuth = true,
	) {
		let authToken: string | null = null;
		if (needAuth) authToken = localStorage.getItem("auth_token");

		return fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
				...options?.headers,
			},
			body: options?.body ? JSON.stringify(options.body) : undefined,
		});
	}
}
