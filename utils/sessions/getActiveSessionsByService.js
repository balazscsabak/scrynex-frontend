import axios from "axios";

export default async function getActiveSessionsByService(serviceId) {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API}/sessions/service/${serviceId}`
		);
		const { status, sessions } = data;

		if (status && sessions) {
			return sessions;
		}

		return [];
	} catch (error) {
		return [];
	}
}
