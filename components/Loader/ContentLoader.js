import React from 'react'

export default function ContentLoader() {
	return (
		<div className="inset-0 absolute bg-white bg-opacity-70 text-black flex justify-center items-center z-50">
			<div>
				<div style={{borderTopColor: "transparent"}}
							className="w-16 h-16 border-4 border-indigo-700 border-solid rounded-full animate-spin">
				</div>
			</div>
		</div>
	)
}
