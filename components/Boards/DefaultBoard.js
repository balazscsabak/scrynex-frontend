import React from "react";

export default function DefaultBoard() {
	return (
		<div className="flex">
			<div
				className="text-center mx-3 flex flex-col"
				style={{ height: "200px", width: "80px" }}
			>
				<div className="text-gray-700 font-bold mb-2">START</div>
				<div className="bg-gray-200 flex-grow rounded flex justify-center items-center">
					<span className="text-xs text-gray-600">Board 1</span>
				</div>
			</div>

			<div
				className="text-center mx-3 flex flex-col"
				style={{ height: "200px", width: "80px" }}
			>
				<div className="text-gray-700 font-bold mb-2">PENDING</div>
				<div className="bg-gray-200 flex-grow rounded flex justify-center items-center">
					<span className="text-xs text-gray-600">Board 2</span>
				</div>
			</div>

			<div
				className="text-center mx-3 flex flex-col"
				style={{ height: "200px", width: "80px" }}
			>
				<div className="text-gray-700 font-bold mb-2">FINISH</div>
				<div className="bg-gray-200 flex-grow rounded flex justify-center items-center">
					<span className="text-xs text-gray-600">Board 3</span>
				</div>
			</div>
		</div>
	);
}
