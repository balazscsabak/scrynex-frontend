import React, { useContext } from "react";
import { AuthContext } from "../../contexts";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

export default function Navbar() {
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);
	const { authDispatch } = useContext(AuthContext);

	const router = useRouter();

	const {
		authState: { user },
	} = useContext(AuthContext);

	const logout = () => {
		axios.interceptors.request.use(function (config) {
			config.headers.Authorization = ``;
			return config;
		});

		removeCookie(process.env.NEXT_PUBLIC_JWT_PREFIX, {
			path: "/",
		});

		authDispatch({
			type: "LOGOUT",
		});
		router.push("/auth/login");
	};

	return (
		<nav className="bg-white shadow dark:bg-gray-800">
			<div className="container py-4 mx-auto flex">
				<div className="flex items-center ">
					<div>
						<Link href="/">
							<a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
								Scrynex
							</a>
						</Link>
					</div>

					<div className="flex md:hidden">
						<button
							type="button"
							className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
							aria-label="toggle menu"
						>
							<svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
								<path
									fillRule="evenodd"
									d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
								></path>
							</svg>
						</button>
					</div>
				</div>

				<div className="items-center md:flex flex-1">
					<div className="flex flex-row w-full justify-between">
						{user ? (
							<>
								<div className="ml-10">
									<Link href="/services">
										<a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
											Services
										</a>
									</Link>
									<Link href="/profile">
										<a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
											Boards
										</a>
									</Link>
									<Link href="/profile">
										<a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
											FAQ
										</a>
									</Link>
								</div>
								<div>
									<Link href="/profile">
										<a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
											Profile
										</a>
									</Link>
									<a
										onClick={logout}
										className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
									>
										Logout
									</a>
								</div>
							</>
						) : (
							<>
								<div className="ml-10">
									<Link href="/">
										<a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
											Home
										</a>
									</Link>
								</div>
								<div>
									<Link href="/auth/login">
										<a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
											Login
										</a>
									</Link>
									<Link
										className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
										href="/register"
									>
										<a className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">
											Register
										</a>
									</Link>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
