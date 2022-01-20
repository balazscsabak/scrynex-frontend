import React from "react";
import Link from "next/link";

export default function ServiceNav({ children }) {
	return (
		<div className="container mx-auto mt-7">
			<div className="w-auto flex">
				<div className="w-80">
					<ul className="flex flex-col">
						<li>
							<Link href="/services">
								<a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
									<span className="text-sm font-medium">Services</span>
									<span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
										2/2
									</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/services">
								<a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
									<span className="text-sm font-medium">Running Services</span>
									<span className="ml-auto mr-6 text-sm bg-green-100 rounded-full px-3 py-px text-green-500">
										0/2
									</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/services/new">
								<a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
									<span className="text-sm font-medium">Create new</span>
								</a>
							</Link>
						</li>
						<hr />
						<li>
							<Link href="/services">
								<a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
									<span className="text-sm font-medium">Global inventory</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/services">
								<a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
									<span className="text-sm font-medium">History</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/services">
								<a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
									<span className="text-sm font-medium">Statistics</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/services">
								<a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
									<span className="text-sm font-medium">Upgrade</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/services">
								<a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
									<span className="text-sm font-medium">Informations</span>
								</a>
							</Link>
						</li>
					</ul>
				</div>

				<div className="flex-1">
					<div className="px-10">{children}</div>
				</div>
			</div>
		</div>
	);
}
