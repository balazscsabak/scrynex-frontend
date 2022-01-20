import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts";

export default function InitAuthCheck({ children }) {
	const {
		authState: { loading },
		authDispatch,
	} = useContext(AuthContext);

	const router = useRouter();

	axios.interceptors.response.use(
		function (response) {
			// any with 2xx
			return response;
		},
		function (error) {
			let res = error.response;
			if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
				return new Promise((resolve, reject) => {
					authDispatch({
						type: "LOGOUT",
					});

					reject();

					router.push("/auth/login");
				});
			}

			return Promise.reject(error);
		}
	);

	return loading ? "Loading" : children;
}
