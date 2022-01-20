import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import Link from "next/dist/client/link";
import DefaultBoard from "../../../components/Boards/DefaultBoard";
import ContentLoader from "../../../components/Loader/ContentLoader";
import axios from "axios";
import GeneralErrorContent from "../../../components/Loader/GeneralErrorContent";
import { useRouter } from "next/router";

export default function NewServiceForm({ closeNewForm }) {
	const [serviceName, setServiceName] = useState("");
	const [serviceNameError, setServiceNameError] = useState(null);
	const [boardType, setBoardType] = useState("default");
	const [showLoader, setShowLoader] = useState(false);
	const [showServerError, setShowServerError] = useState(false);

	// router
	const router = useRouter();

	const createNewService = async () => {
		if (!serviceName) {
			setServiceNameError("Service name required");
			return false;
		}

		if (serviceName.length < 5) {
			setServiceNameError("Service name must be atleast 5 characters long");
			return false;
		}

		setShowLoader(true);

		const selectedBoardTypes = generateBoardType();

		try {
			const createServiceResponse = await axios.post(
				`${process.env.NEXT_PUBLIC_API}/services`,
				{
					service_name: serviceName,
					screens: selectedBoardTypes,
				},
				{
					withCredentials: true,
				}
			);

			const { data } = createServiceResponse;

			if (data.status) {
				router.push(`/services/${data.data._id}`);
			} else {
				// TODO error handling
			}
		} catch (error) {
			setShowLoader(false);
			setShowServerError(true);
		}
	};

	const setServiceNameInput = (e) => {
		if (serviceNameError && e.target.value !== "") {
			setServiceNameError(null);
		}

		setServiceName(e.target.value);
	};

	const generateBoardType = () => {
		switch (boardType) {
			case "default":
				return [
					{ name: "__start", slug: "START" },
					{ name: "__pending", slug: "PENDING" },
					{ name: "__finish", slug: "FINISH" },
				];
		}
	};

	return (
		<>
			<div className="relative">
				<div className="mb-1">
					<h2 className="text-xl mb-2">New service name</h2>
					<Input
						type="text"
						value={serviceName}
						onChange={setServiceNameInput}
						placeholder="your-service-name"
					/>
					<div style={{ height: "30px" }} className="mt-1 text-sm text-red-400">
						{serviceNameError}
					</div>
				</div>

				<div>
					<h2 className="text-xl mb-1">Boards</h2>

					<div className="text-xs text-gray-600 mb-4">
						Boards settings gonna determine the dataflow{" "}
						<Link href="#">
							<a className="text-indigo-700">Learn more</a>
						</Link>
					</div>

					<div className="mb-6">
						<Radio.Group
							options={[
								{ label: "Default", value: "default" },
								{ label: "Custom", value: "custom", disabled: true },
							]}
							onChange={(e) => setBoardType(e.target.value)}
							value={boardType}
							optionType="button"
							buttonStyle="solid"
						/>
					</div>

					<div className="mb-16">
						{boardType === "default" ? (
							<div>
								<DefaultBoard />
							</div>
						) : null}
					</div>
				</div>

				<div className="flex justify-start">
					<button
						onClick={closeNewForm}
						className="mr-4 uppercase py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-900 text-sm rounded"
					>
						Cancel
					</button>
					<button
						onClick={() => createNewService()}
						className="uppercase py-2 px-4 bg-indigo-700 hover:bg-indigo-400 text-white text-sm rounded"
					>
						Create
					</button>
				</div>

				{showLoader && <ContentLoader />}
				{showServerError && (
					<GeneralErrorContent onClose={() => router.push("/services")} />
				)}
			</div>
		</>
	);
}

NewServiceForm.auth = true;
