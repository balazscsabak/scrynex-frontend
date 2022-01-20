import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts";

export default function AuthCheck({ children }) {
	const {
		authState: { user },
		authDispatch,
		redirected,
	} = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		if (!user) {
			authDispatch({
				type: "REDIRECTED_FROM",
				payload: router.pathname,
			});

			router.push("/auth/login");

			return null;
		}
	}, []);

	if (!user) {
		return null;
	}

	return children;
}
