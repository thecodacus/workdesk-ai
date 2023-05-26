import { ChatIcon, CopyIcon } from "@chakra-ui/icons";
import Sidebar from "./components/Sidebar";
import styles from "./styles.module.scss";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "@src/common/components/Navbar";
import Footer from "@src/common/components/Footer";
export default function Project() {
	let { projectId } = useParams();
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
					]}
				></Sidebar>
			</aside>
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
