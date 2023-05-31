import { Avatar, Box, IconButton, Spinner } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.scss";
import { IChat } from "@src/state/services/queryService";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import SourceTag from "../SourceTag";
import { CopyIcon } from "@chakra-ui/icons";

interface IProps {
	message: IChat;
	isLoading?: boolean;
}

export default function ChatMessage({ message, isLoading }: IProps) {
	const copyCode = (code: string) => {
		navigator.clipboard.writeText(code);
	};
	return (
		<Box w="100%" p={4} className={styles.chatItem}>
			<div className={styles.avatar}>{message.role == "AI" ? <Avatar name={message.role} src="/img/common/logo1.png" /> : <Avatar bg={"cyan.600"} />}</div>
			<div className={styles.content}>
				{isLoading ? (
					<div className={styles.loader}>
						<Spinner />
						Searching docs for context
					</div>
				) : (
					<div className={styles.message}>
						<ReactMarkdown
							components={{
								code({ node, inline, className, children, ...props }) {
									const match = /language-(\w+)/.exec(className || "language-python");

									return !inline && match ? (
										<>
											<IconButton
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													copyCode(String(children).replace(/\n$/, ""));
												}}
												className={styles.copyBtn}
												icon={<CopyIcon />}
												aria-label={"Copy Code"}
											/>
											<SyntaxHighlighter {...props} className={className} children={String(children).replace(/\n$/, "")} style={darcula} language={match[1]} PreTag="div" />
										</>
									) : (
										<code {...props} className={className}>
											{children}
										</code>
									);
								},
							}}
						>
							{message.message}
						</ReactMarkdown>
					</div>
				)}
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
}
