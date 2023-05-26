import { ChatIcon, CopyIcon } from "@chakra-ui/icons";
import Sidebar from "./components/Sidebar";
import styles from "./styles.module.scss";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "@src/common/components/Navbar";
import Footer from "@src/common/components/Footer";
import { VscGear } from "react-icons/vsc";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Container } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectOpenAIConfig } from "@src/state/services/configService";
export default function Project() {
	let { projectId } = useParams();
	let { apiKey } = useSelector(selectOpenAIConfig);
	if (!projectId) return <div>invalid Project</div>;
	return (
		<div className={styles.container}>
			<nav>
				<Navbar />
			</nav>
			<aside>
				<Sidebar
					items={[
						{ name: "Q&A", link: `/projects/${projectId}/`, icon: <ChatIcon /> },
						{ name: "Docs", link: `/projects/${projectId}/docs`, icon: <CopyIcon /> },
						{ name: "Config", link: `/projects/${projectId}/config`, icon: <VscGear /> },
					]}
				></Sidebar>
			</aside>
			<main>
				<Container>
					{(!apiKey || apiKey == "") && (
						<Alert status="error">
							<AlertIcon />
							<AlertTitle>OpenAI api key is required!</AlertTitle>
							<AlertDescription>You Need to set the api key in the config</AlertDescription>
						</Alert>
					)}
				</Container>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
