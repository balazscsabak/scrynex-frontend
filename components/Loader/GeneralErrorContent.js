import React from "react";

export default function GeneralErrorContent({onClose}) {
	return (
		<div className="inset-0 absolute bg-white bg-opacity-70 text-black flex justify-center items-center z-50">
			<div>
				<div class="text-indigo-700 text-2xl text-center font-medium">
					
					<div className="mb-3 bg-white bg-opacity-90 rounded">Oops, something went wrong! Try again later.</div>

					<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto my-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>

					<div>
						<button onClick={onClose} className="uppercase mt-4 py-2 px-4 bg-indigo-700 hover:bg-indigo-400 text-white text-sm rounded">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
