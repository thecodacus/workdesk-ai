import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../../../state/services/projectsService";
import styles from "./styles.module.scss";
import { Avatar, Box, Container, Icon, IconButton, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { query, resetChat, selectChatMessages, selectChatParameters, useGetAnswerMutation } from "@src/state/services/queryService";
import { useRef } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import SideMenu from "./components/SideMenu";
import SourceTag from "./components/SourceTag";
export default function Query() {
	let { projectId } = useParams();
	if (!projectId) return <div>invalid Project</div>;
	const dispatch = useDispatch();
	const { isLoading: isProjectLoading } = useGetProjectQuery(projectId);
	const parameters = useSelector(selectChatParameters);
	const [getAnswer] = useGetAnswerMutation();

	const messages = useSelector(selectChatMessages);
	const inputRef = useRef<HTMLInputElement>(null);

	if (isProjectLoading) {
		return <div>Loading</div>;
	}
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && inputRef.current && `${inputRef.current.value}`.trim() !== "") {
			onPostQuery(`${inputRef.current.value}`);
		}
	};

	const onPostQuery = (text: string) => {
		console.log(text);
		dispatch(query({ projectId: `${projectId}`, question: text }));
		getAnswer({ projectId: `${projectId}`, question: text, parameters });
		if (inputRef && inputRef.current) {
			inputRef.current.value = "";
		}
	};
	return (
		<Container maxW="container.xl" className={styles.container}>
			<div className={styles.sidemenu}>
				<SideMenu />
			</div>
			<Box w="100%" flex={1} p={4} className={styles.chatItems}>
				{messages.map((message, i) => {
					return (
						<Box w="100%" p={4} key={i} className={styles.chatItem}>
							<div className={styles.avatar}>{message.role == "AI" ? <Avatar name={message.role} src="/img/common/logo1.png" /> : <Avatar bg={"cyan.600"} />}</div>
							<div className={styles.content}>
								<div className={styles.message}>{message.message}</div>
								{message.source_documents && (
									<div className={styles.sources}>
										{message.source_documents.map((doc, i) => {
											let filename = doc.metadata.source.split("/").slice(-1)[0];
											let filenameShort = filename;
											if (filename.length > 23) {
												filenameShort = filename.substring(0, 8) + "..." + filename.slice(-8);
											}
											return (
												<SourceTag key={i} tagLabel={filenameShort}>
													<div className={styles.sourceContent}>
														<div className={styles.name}>
															<b>Source File: {filename}</b>
														</div>
														<div className={styles.text}>{doc.page_content}</div>
													</div>
												</SourceTag>
											);
										})}
									</div>
								)}
							</div>
						</Box>
					);
				})}
			</Box>
			<div className="inputSetup" style={{ display: "flex", gap: "1rem" }}>
				<IconButton
					onClick={() => {
						dispatch(resetChat());
					}}
					aria-label="clear"
					icon={<Icon as={MdOutlineCleaningServices} />}
				/>
				<Input ref={inputRef} onChange={() => {}} onKeyDown={handleKeyDown} onSubmit={(e) => onPostQuery(e.currentTarget.value)} placeholder="Type your Query" />
			</div>
		</Container>
	);
}
