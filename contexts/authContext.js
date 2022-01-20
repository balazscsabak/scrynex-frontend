import axios from "axios";
import { useReducer, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { check as authCheck } from "../utils";

const initialState = {
	user: null,
	loading: true,
	showLoginForm: false,
	redirected: false
};

// create context
const AuthContext = createContext();

// auth reducer
const AuthReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		case "INIT_AUTH_TRUE":
			return { ...state, user: action.payload, loading: false };
		case "INIT_AUTH_FALSE":
			return { ...state, user: null, loading: false };
		case "SHOW_LOGIN":
			return { ...state, showLoginForm: true };
		case "HIDE_LOGIN":
			return { ...state, showLoginForm: false };
		case "REDIRECTED_FROM":
			return { ...state, redirected: action.payload };
		default:
			return state;
	}
};

// auth provider
const AuthProvider = ({ children }) => {
	const [authState, authDispatch] = useReducer(AuthReducer, initialState);
	const [cookies, setCookie] = useCookies(["user"]);

	// init user check
	useEffect(() => {
		initUserCheck();
	}, []);

	const initUserCheck = async () => {
		const userToken = cookies[process.env.NEXT_PUBLIC_JWT_PREFIX];

		if (!userToken) {
			authDispatch({
				type: "INIT_AUTH_FALSE",
			});
		} else {
			try {
				axios.interceptors.request.use(function (config) {
					config.headers.Authorization = `Bearer ${userToken}`;

					return config;
				});

				const userData = await authCheck();

				if (userData) {
					authDispatch({
						type: "INIT_AUTH_TRUE",
						payload: userData,
					});
				} else {
					axios.interceptors.request.use(function (config) {
						config.headers.Authorization = ``;
						return config;
					});

					authDispatch({
						type: "INIT_AUTH_FALSE",
					});
				}
			} catch (e) {
				axios.interceptors.request.use(function (config) {
					config.headers.Authorization = ``;
					return config;
				});

				authDispatch({
					type: "INIT_AUTH_FALSE",
				});
			}
		}
	};

	const showLogin = function () {
		authDispatch({
			type: "SHOW_LOGIN",
		});
	};

	const hideLogin = function () {
		authDispatch({
			type: "HIDE_LOGIN",
		});
	};

	return (
		<AuthContext.Provider
			value={{ authState, authDispatch, showLogin }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
