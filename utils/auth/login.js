import axios from "axios";

export default async function login(loginEmail, password) {
	try {
		const loginResponse = await axios.post(
			`${process.env.NEXT_PUBLIC_API}/auth/login`,
			{
				loginname: loginEmail,
				password,
			}
		);

		const {
			data: { email, id, status, token, username },
		} = loginResponse;

		if (status && token) {
			return {
				token,
				user: {
					username,
					email,
					id,
				},
			};
		}

		return false;
	} catch (error) {
		return false;
	}
}
