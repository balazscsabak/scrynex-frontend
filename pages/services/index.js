import React, { useEffect, useState } from "react";
import ServiceNav from "../../containers/ServiceNav";
import ContentLoader from "../../components/Loader/ContentLoader";
import { getServices } from "../../utils";
import { ServiceListItem } from "../../components";

export default function Services() {
	const [pageLoading, setPageLoading] = useState(true);
	const [services, setServices] = useState([]);

	useEffect(() => {
		initServices();
	}, []);

	const initServices = async () => {
		const services = await getServices();
		setServices(services);
		setPageLoading(false);
	};

	return (
		<ServiceNav>
			<div className="relative" style={{ minHeight: "200px" }}>
				<div className="mb-4">
					<h2 className="text-lg">Available</h2>
				</div>

				{pageLoading ? (
					<ContentLoader />
				) : (
					<div>
						{services.map((service) => {
							return <ServiceListItem service={service} key={service._id} />;
						})}
					</div>
				)}
			</div>
		</ServiceNav>
	);
}

Services.auth = true;
