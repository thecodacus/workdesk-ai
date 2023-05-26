import { Link, useParams } from "react-router-dom";
import { useDeleteDocumentMutation, useGetDocumentsQuery } from "@src//state/services/documentService";
import styles from "./styles.module.scss";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";

export default function DocumentsList() {
	let { projectId } = useParams();
	const [deleteDocument] = useDeleteDocumentMutation();
	if (!projectId) return <div>Invalid Project</div>;
	const { data: documents, isLoading } = useGetDocumentsQuery(projectId);
	if (isLoading) return <div style={{ margin: "auto", textAlign: "center" }}>Loading...</div>;
	if (!documents || documents.length === 0) return <div style={{ margin: "auto", textAlign: "center" }}>No documents</div>;

	return (
		<div className={styles.container}>
			{documents.map((document) => (
				<Box>
					<div className={styles.deleteIcon}>
						<IconButton
							onClick={() => {
								deleteDocument({ projectId: `${projectId}`, documentId: document.id });
							}}
							bg={"transparent"}
							aria-label="Delete"
							icon={<DeleteIcon />}
						/>
					</div>
					<Link to={`/projects/${projectId}/documents/${document.id}/`} key={document.id}>
						<div className={styles.icon}></div>
						<div className={styles.name}>{document.name}</div>
					</Link>
				</Box>
			))}
		</div>
	);
}
