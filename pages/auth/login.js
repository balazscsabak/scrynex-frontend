import React, { useState, useContext, useEffect } from "react";
import { Input, Button } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { AuthContext } from "../../contexts";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Transition } from "@headlessui/react";
import { login as loginAttempt } from "../../utils";

export default function login() {
	const {
		authDispatch,
		authState: { redirected },
	} = useContext(AuthContext);
	const [email, setEmail] = useState("test@test.hu");
	const [password, setPassword] = useState("Test123?!");
	const [validationEmail, setValidationEmail] = useState(null);
	const [validationPassword, setValidationPassword] = useState(null);
	const [loading, setLoading] = useState(false);
	const [cookies, setCookie] = useCookies(["user"]);

	const router = useRouter();

	const loginOnClick = async () => {
		let validationFlag = false;

		if (!email) {
			setValidationEmail("Required field");
			validationFlag = true;
		} else {
			setValidationEmail(null);
		}

		if (!password) {
			setValidationPassword("Required field");
			validationFlag = true;
		} else {
			setValidationPassword(null);
		}

		if (validationFlag) {
			return false;
		}

		setLoading(true);

		const attempt = await loginAttempt(email, password);

		if (attempt) {
			const { token, user } = attempt;

			axios.interceptors.request.use(function (config) {
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			});

			setCookie(process.env.NEXT_PUBLIC_JWT_PREFIX, token, { path: "/" });

			authDispatch({
				type: "LOGIN",
				payload: {
					user,
				},
			});

			if (redirected) {
				const redirectUrl = redirected;

				authDispatch({
					type: "REDIRECTED_FROM",
					payload: false,
				});

				router.push(redirectUrl);
			} else {
				router.push("/");
			}
		}
	};

	return (
		<Transition
			appear={true}
			show={true}
			enter="transition-opacity duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-150"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div className="max-w-xs mx-auto mt-5">
				<div>
					<label htmlFor="email" className="text-base mb-1 block">
						Email
					</label>
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						id="email"
						prefix={<UserOutlined />}
					/>
					<div className="text-red-400 text-sm h-6">{validationEmail}</div>
				</div>
				<div>
					<label htmlFor="password" className="text-base mb-1 block">
						Password
					</label>
					<Input.Password
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						id="password"
					/>
					<div className="text-red-400 text-sm h-6">{validationPassword}</div>
				</div>
				<div className="text-center mt-3">
					<Button type="primary" onClick={() => loginOnClick()}>
						{loading ? <LoadingOutlined /> : "Login"}
					</Button>
				</div>
			</div>
		</Transition>
	);
}
