import { Button, Spinner } from "@chakra-ui/react";
import { useDigestDocumentMutation } from "@src/state/services/documentService";
import { MouseEvent } from "react";

export default function DigestButton({ projectId }: { projectId: string }) {
	const [uploadDocument, { isLoading }] = useDigestDocumentMutation();
	const handleDigest = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		uploadDocument(projectId);
	};
	return (
		<Button onClick={handleDigest} disabled={isLoading}>
			{isLoading && <Spinner />}
			Digest Docs
		</Button>
	);
}
