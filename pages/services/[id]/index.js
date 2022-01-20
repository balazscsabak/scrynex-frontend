import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { ServiceNav, SessionShow } from "../../../containers";
import { getActiveSessionsByService, getService } from "../../../utils";
import ContentLoader from "../../../components/Loader/ContentLoader";

export default function Service() {
	const router = useRouter();
	const serviceId = router.query.id;
	const [service, setService] = useState(null);
	const [serviceLoading, setServiceLoading] = useState(true);
	const [sessions, setSessions] = useState([]);
	const [sessionsLoading, setSessionsLoading] = useState(true);

	useEffect(() => {
		if (serviceId) {
			getActiveSessions();
			getServiceData();
		}
	}, [router.query.id]);

	const getActiveSessions = async () => {
		const activeSessions = await getActiveSessionsByService(serviceId);
		setSessions(activeSessions);
		setSessionsLoading(false);
	};

	const getServiceData = async () => {
		const service = await getService(serviceId);
		setService(service);
		setServiceLoading(false);
	};

	const data = {
		service,
		sessions,
	};

	return (
		<ServiceNav>
			<div className="relative" style={{ minHeight: "150px" }}>
				{!serviceLoading && !sessionsLoading ? (
					<SessionShow data={data} />
				) : (
					<ContentLoader />
				)}
			</div>
		</ServiceNav>
	);
}

Service.auth = true;
