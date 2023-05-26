import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../../../state/services/projectsService";
import styles from "./styles.module.scss";
import { Box, Container, Icon, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tag, TagLabel } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { query, resetChat, selectChatMessages, selectChatParameters, useGetAnswerMutation } from "@src/state/services/queryService";
import { useRef } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SideMenu from "./components/SideMenu";
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
			<Box w="100%" flex={1} p={4} className={styles.chatItem}>
				{messages.map((message, i) => {
					return (
						<Box w="100%" p={4} key={i}>
							<div className={styles.avatar}>{message.role}</div>
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
												<Tag key={i} style={{ position: "relative" }}>
													<Popover>
														<PopoverTrigger>
															<Icon as={AiOutlineInfoCircle} />
														</PopoverTrigger>
														<PopoverContent>
															<PopoverArrow />
															<PopoverCloseButton />
															<PopoverHeader>Page Content</PopoverHeader>
															<PopoverBody>
																<div>Source File :{filename}</div>
																<div className="content">{doc.page_content}</div>
															</PopoverBody>
														</PopoverContent>
													</Popover>
													<TagLabel>{filenameShort}</TagLabel>
												</Tag>
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
