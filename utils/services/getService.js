import axios from "axios";

export default async function getServices(serviceId) {
	try {
		const {
			data: { status, service },
		} = await axios.get(`${process.env.NEXT_PUBLIC_API}/services/${serviceId}`);

		if (status && service) {
			return service;
		}

		return null;
	} catch (error) {
		return null;
	}
}
