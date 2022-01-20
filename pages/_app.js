import "../styles/globals.css";
import {
	InitAuthCheck,
	AuthCheck,
	Navbar,
	Header,
	Footer,
} from "../containers";
import { AuthProvider } from "../contexts";
import { CookiesProvider } from "react-cookie";
import NextNprogress from "nextjs-progressbar";

function App({ Component, pageProps }) {
	return (
		<CookiesProvider>
			<AuthProvider>
				<InitAuthCheck>
					<NextNprogress
						color="#4338CA"
						startPosition={0.3}
						stopDelayMs={100}
						height={2}
						showOnShallow={false}
					/>

					<div className="flex flex-col h-screen">
						<Header />
						<main className="mb-auto py-5">
							{Component.auth ? (
								<AuthCheck>
									<Component {...pageProps} />
								</AuthCheck>
							) : (
								<Component {...pageProps} />
							)}
						</main>
						<Footer />
					</div>
				</InitAuthCheck>
			</AuthProvider>
		</CookiesProvider>
	);
}

export default App;
