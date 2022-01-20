import React from "react";
import Link from "next/link";
import { LayoutOutlined, LoginOutlined } from "@ant-design/icons";
export default function ServiceListItem({ service }) {
	return (
		<div className="mb-10">
			<Link href={`/services/${service._id}`}>
				<div className="py-4 px-5 mb-2 rounded bg-indigo-100 cursor-pointer">
					<div className="flex justify-between">
						<div>{service.service_name}</div>
						<div>{service._id}</div>
					</div>
				</div>
			</Link>

			<div className="text-xs px-5 flex justify-between">
				<div>
					Last session started:
					<span className="text-gray-500 ml-4 italic">
						{service.last_session_timestamp || "Not started yet"}
					</span>
				</div>
				<div className="text-right">
					<Link href="/services/startnew">
						<a className="mb-2 cursor-pointer flex items-center justify-end text-indigo-700 hover:text-indigo-400">
							<LayoutOutlined /> <span className="ml-2">Manage screens</span>
						</a>
					</Link>
					<Link href="/services/startnew">
						<a className="cursor-pointer flex items-center justify-end text-green-700 hover:text-green-500">
							<LoginOutlined />
							<span className="ml-2">Start new session</span>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
