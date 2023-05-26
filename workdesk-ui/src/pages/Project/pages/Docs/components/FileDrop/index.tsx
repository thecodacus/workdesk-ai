import { Button, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { useState, DragEvent, useRef, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { useAddDocumentMutation } from "../../../../../../state/services/documentService";

const allowedFileTypes = ["application/pdf", "text/plain"];
export default function FileDrop({ projectId }: PropsWithChildren<{ projectId: string }>) {
	const [files, setFiles] = useState<File[]>();
	const inputRef = useRef<HTMLInputElement>(null);
	const [uploadDocument, { isLoading }] = useAddDocumentMutation();

	const onDrop = (acceptedFiles: FileList | null) => {
		if (!acceptedFiles) return;
		let draggedFiles: File[] = [];
		for (let index = 0; index < acceptedFiles.length; index++) {
			const file = acceptedFiles[index];
			draggedFiles.push(file);
		}
		console.log(draggedFiles.map((file) => file));
		draggedFiles = draggedFiles.filter((file) => allowedFileTypes.includes(file.type));
		if (draggedFiles.length == 0) return;
		setFiles(draggedFiles);
	};
	const uploadFiles = async () => {
		if (!files) return;

		console.log(files);
		let uploadPrms = files.map(async (file) => {
			const formData = new FormData();
			formData.append("file", file);
			await uploadDocument({ data: formData, projectId }).unwrap();
		});
		let uploadResponses = await Promise.all(uploadPrms);
		console.log(uploadResponses);
		setFiles(undefined);
	};

	return (
		<div className={styles.container}>
			{!files?.length && (
				<div
					className={styles.dropzone}
					onDragOver={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onDrop={(e: DragEvent<HTMLDivElement>) => {
						e.preventDefault();
						e.stopPropagation();
						console.log(e);

						onDrop(e.dataTransfer.files);
					}}
				>
					<Heading>Drag and Drop Files To Upload</Heading>
					<Heading>Or</Heading>
					<input
						type="file"
						multiple
						onChange={(e) => {
							onDrop(e.target.files);
						}}
						hidden
						ref={inputRef}
					/>
					<Button onClick={() => inputRef.current?.click()}>Select Files</Button>
				</div>
			)}
			{files && (
				<>
					{isLoading ? (
						<div className={styles.loader}>
							<Heading>Uploading...</Heading>
							<Heading>Please Wait</Heading>
							<Heading>This may take a while</Heading>
						</div>
					) : (
						<>
							<div className={styles.dropzone}>
								<Heading>Files Selected</Heading>
								<UnorderedList style={{ paddingLeft: "0rem" }}>
									{files.map((file, index) => (
										<ListItem key={index}>{file.name}</ListItem>
									))}
								</UnorderedList>
								<Button onClick={uploadFiles}>Upload Files</Button>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
