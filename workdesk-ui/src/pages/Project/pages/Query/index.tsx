import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../../../state/services/projectsService";
import styles from "./styles.module.scss";
import { Box, Container, Icon, IconButton, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { query, resetChat, selectChatMessages, selectChatParameters, useGetAnswerMutation } from "@src/state/services/queryService";
import { useEffect, useRef } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import SideMenu from "./components/SideMenu";
import ChatMessage from "./components/ChatMessage";
export default function Query() {
	let { projectId } = useParams();
	const messages = useSelector(selectChatMessages);
	const parameters = useSelector(selectChatParameters);
	const inputRef = useRef<HTMLInputElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();
	const [getAnswer, { isLoading: isLoadingAnswer }] = useGetAnswerMutation();

	if (!projectId) return <div>invalid Project</div>;
	// const { isLoading: isProjectLoading } = useGetProjectQuery(projectId);

	// if (isProjectLoading) {
	// 	return <div>Loading</div>;
	// }
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && inputRef.current && `${inputRef.current.value}`.trim() !== "") {
			onPostQuery(`${inputRef.current.value}`);
		}
	};

	const onPostQuery = (text: string) => {
		console.log(text);
		dispatch(query({ projectId: `${projectId}`, question: text }));
		getAnswer({ projectId: `${projectId}`, question: text, parameters, messages });
		if (inputRef && inputRef.current) {
			inputRef.current.value = "";
		}
	};
	useEffect(() => {
		if (bottomRef?.current) {
			bottomRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [isLoadingAnswer, bottomRef]);
	return (
		<Container maxW="container.xl" className={styles.container}>
			<div className={styles.sidemenu}>
				<SideMenu />
			</div>
			<Box w="100%" flex={1} p={4} className={styles.chatItems}>
				{messages.map((message, i) => {
					return <ChatMessage key={i} message={message} />;
				})}
				{isLoadingAnswer && <ChatMessage isLoading={isLoadingAnswer} message={{ role: "AI", message: "" }} />}
				<div ref={bottomRef} />
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
