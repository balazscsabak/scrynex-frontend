import axios from "axios";

export default async function check() {
	try {
		const checkResponse = await axios.get(
			`${process.env.NEXT_PUBLIC_API}/auth/validate-cookie`
		);

		const {
			data: { status, customer },
		} = checkResponse;

		if (status && customer) {
			return {
				username: customer.username,
				email: customer.email,
				id: customer.id,
			};
		}

		return false;
	} catch (e) {
		return false;
	}
}
