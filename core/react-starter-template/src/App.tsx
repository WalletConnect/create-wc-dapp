import styles from "./styles/Home.module.css";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useState } from "react";

const WCLogo = () => (
	<svg
		fill="none"
		width="24"
		viewBox="0 0 480 332"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="m126.613 93.9842c62.622-61.3123 164.152-61.3123 226.775 0l7.536 7.3788c3.131 3.066 3.131 8.036 0 11.102l-25.781 25.242c-1.566 1.533-4.104 1.533-5.67 0l-10.371-10.154c-43.687-42.7734-114.517-42.7734-158.204 0l-11.107 10.874c-1.565 1.533-4.103 1.533-5.669 0l-25.781-25.242c-3.132-3.066-3.132-8.036 0-11.102zm280.093 52.2038 22.946 22.465c3.131 3.066 3.131 8.036 0 11.102l-103.463 101.301c-3.131 3.065-8.208 3.065-11.339 0l-73.432-71.896c-.783-.767-2.052-.767-2.835 0l-73.43 71.896c-3.131 3.065-8.208 3.065-11.339 0l-103.4657-101.302c-3.1311-3.066-3.1311-8.036 0-11.102l22.9456-22.466c3.1311-3.065 8.2077-3.065 11.3388 0l73.4333 71.897c.782.767 2.051.767 2.834 0l73.429-71.897c3.131-3.065 8.208-3.065 11.339 0l73.433 71.897c.783.767 2.052.767 2.835 0l73.431-71.895c3.132-3.066 8.208-3.066 11.339 0z"
			fill="currentColor"
		/>
	</svg>
);

const ETHLogo = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill="currentColor"
			d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
		/>
	</svg>
);

export default function App() {
	const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
		useState(false);
	const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

	const closeAll = () => {
		setIsNetworkSwitchHighlighted(false);
		setIsConnectHighlighted(false);
	};
	return (
		<>
			<header>
				<div
					className={styles.backdrop}
					style={{
						opacity:
							isConnectHighlighted || isNetworkSwitchHighlighted
								? 1
								: 0,
					}}
				/>
				<div className={styles.header}>
					<div className={styles.logo}>
						<img
							src="/logo.svg"
							alt="WalletConnect Logo"
							height="32"
							width="203"
						/>
					</div>
					<div className={styles.buttons}>
						<div
							onClick={closeAll}
							className={`${styles.highlight} ${
								isNetworkSwitchHighlighted
									? styles.highlightSelected
									: ``
							}`}
						>
							<Web3NetworkSwitch />
						</div>
						<div
							onClick={closeAll}
							className={`${styles.highlight} ${
								isConnectHighlighted
									? styles.highlightSelected
									: ``
							}`}
						>
							<Web3Button />
						</div>
					</div>
				</div>
			</header>
			<main className={styles.main}>
				<div className={styles.wrapper}>
					<div className={styles.container}>
						<h1>Next.js Starter Template</h1>
						<div className={styles.content}>
							<ul>
								<li>
									Edit <code>src/App.tsx</code> and save to
									reload.
								</li>
								<li>
									Click{" "}
									<span
										onClick={() => {
											setIsConnectHighlighted(
												!isConnectHighlighted
											);
											setIsNetworkSwitchHighlighted(
												false
											);
										}}
										className={styles.button}
									>
										<WCLogo />
										Connect Wallet
									</span>{" "}
									on the top right to connect to a
									WalletConnect v2.0 compatible wallet.
								</li>
								<li>
									Click{" "}
									<span
										onClick={() => {
											setIsNetworkSwitchHighlighted(
												!isNetworkSwitchHighlighted
											);
											setIsConnectHighlighted(false);
										}}
										className={styles.button}
									>
										<ETHLogo />
										Ethereum
									</span>{" "}
									to change networks.
								</li>
							</ul>
						</div>
					</div>
					<div className={styles.footer}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							height={16}
							width={16}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
							/>
						</svg>
						<a
							href="https://docs.walletconnect.com/2.0/web3modal/react/installation?utm_source=react-starter-template&utm_medium=github&utm_campaign=react-starter-template"
							target="_blank"
						>
							Check out the full documentation here
						</a>
					</div>
				</div>
			</main>
		</>
	);
}
