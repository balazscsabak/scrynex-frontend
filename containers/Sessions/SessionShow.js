import React from "react";
import Link from "next/link";
import {
	RollbackOutlined,
	CaretRightOutlined,
	LineOutlined,
} from "@ant-design/icons";
import DefaultBoard from "../../components/Boards/DefaultBoard";
import { format } from "date-fns";

export default function SessionShow({ data }) {
	const { service, sessions } = data;
	const sessionsLength = sessions.length;

	const renderSwitch = (screensType) => {
		console.log(screensType);
		switch (screensType) {
			case "default":
				return <DefaultBoard />;
			case "custom":
				return "CUSTOM BOARDS";
			default:
				return "defalt board";
		}
	};

	return (
		<div className="flex justify-between">
			<div>
				<div className="mb-5">
					<Link href="/services">
						<a className="text-indigo-700 hover:text-indigo-500 flex items-center">
							<RollbackOutlined />
							<span className="ml-2">Back to services</span>
						</a>
					</Link>
				</div>
				<div className="flex items-baseline mb-2">
					<div className="text-gray-700 mr-3">Service name:</div>
					<h1 className="text-lg">{service.service_name}</h1>
				</div>
				<div className="flex items-baseline mb-2">
					<div className="text-gray-700 mr-3">Status:</div>
					<h1
						className={`text-lg ${
							sessionsLength > 0 ? "text-red-500" : "text-green-500"
						}`}
					>
						{sessionsLength} running session(s)
					</h1>
				</div>

				{sessionsLength > 0 && (
					<div className="mb-5">
						{sessions.map((session) => (
							<Link href="#">
								<div className="flex items-center ml-8 mb-1 cursor-pointer">
									<span className="text-red-400 mr-3">-</span>

									<div className=" underline italic">
										Started at:{" "}
										{format(session.start_time, "yyyy.MM.dd - hh:mm:ss")}
									</div>

									<CaretRightOutlined className="ml-2 text-red-700" />
								</div>
							</Link>
						))}
					</div>
				)}

				<div>
					<div className="flex items-baseline mb-2">
						<div className="text-gray-700 mr-3">Boards type:</div>
						<h1 className="text-lg">{service.screens_type}</h1>
					</div>
					<div>
						<div className="text-gray-700 mb-3">Boards:</div>

						{renderSwitch(service.screens_type)}
					</div>
				</div>
			</div>
			<div>
				<Link href="#">
					<a className="px-3 py-2 bg-green-200 text-green-800 hover:text-green-500 rounded">
						Start new session
					</a>
				</Link>
			</div>
		</div>
	);
}
