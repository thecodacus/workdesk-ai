import { Heading } from "@chakra-ui/react";
import AddProjectButton from "./components/AddProjectButton";
import ProjectsList from "./components/ProjectsList";
import styles from "./styles.module.scss";
import Navbar from "@src/common/components/Navbar";
import Footer from "@src/common/components/Footer";
export default function Home() {
	return (
		<div className={styles.container}>
			<Navbar />
			<main>
				<Heading>Welcome to Workdesk AI</Heading>
				<div className={styles.divider}>
					<h2>Projects</h2>
					<AddProjectButton />
				</div>
				<ProjectsList></ProjectsList>
			</main>
			<Footer />
		</div>
	);
}
