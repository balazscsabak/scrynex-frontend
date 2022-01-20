import axios from "axios";

export default async function getServices() {
	try {
		const {
			data: { status, services },
		} = await axios.get(`${process.env.NEXT_PUBLIC_API}/services`);

		if (status) {
			return services;
		}

		return [];
	} catch (error) {
		return [];
	}
}
