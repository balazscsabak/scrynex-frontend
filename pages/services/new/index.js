import React, { useState } from "react";
import ServiceNav from "../../../containers/ServiceNav";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import NewServiceForm from "./NewServiceForm";

export default function Services() {
	const [showNewForm, setShowNewForm] = useState(false);

	return (
		<ServiceNav>
			<div className="mb-8">
				<div className="mb-3">
					<h1 className="text-2xl">
						Services: <span className="ml-5 font-bold">1</span>
					</h1>
				</div>

				<div>
					<h1 className="text-2xl mb-3">
						Available services: <span className="ml-5 font-bold">1</span>
					</h1>
					<div className="text-xs mb-1 text-gray-600">
						In your current tier. The maximum number of active services is 2.
					</div>
					<div className="text-xs text-indigo-700">
						<Link href="#">
							Upgrade to a higher plan to increase the number.
						</Link>
					</div>
				</div>
			</div>

			<div>
				{!showNewForm && (
					<button
						onClick={() => setShowNewForm(true)}
						className="uppercase py-2 px-4 bg-indigo-700 hover:bg-indigo-400 text-white text-base rounded"
					>
						Create new
					</button>
				)}
			</div>

			<div>
				<Transition
					show={showNewForm}
					enter="transition-opacity duration-75"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-75"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<NewServiceForm closeNewForm={() => setShowNewForm(false)} />
				</Transition>
			</div>
		</ServiceNav>
	);
}

Services.auth = true;
