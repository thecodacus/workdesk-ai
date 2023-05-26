import { useParams } from "react-router-dom";
import FileDrop from "./components/FileDrop";
import styles from "./styles.module.scss";
import DocumentsList from "./components/DocumentsList";
import DigestButton from "./components/DigestButton";

export default function Docs() {
	let { projectId } = useParams();
	if (!projectId) return <div>Invalid Project</div>;
	return (
		<div className={styles.container}>
			<FileDrop projectId={projectId}></FileDrop>
			<DigestButton projectId={projectId} />
			<div className={styles.docs}>
				<DocumentsList />
			</div>
		</div>
	);
}
