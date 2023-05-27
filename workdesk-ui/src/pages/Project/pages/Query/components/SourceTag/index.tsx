import { Tag, Popover, PopoverTrigger, Icon, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, TagLabel } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styles from "./styles.module.scss";
interface IProps {
	tagLabel: string;
}
export default function SourceTag({ tagLabel, children }: PropsWithChildren<IProps>) {
	return (
		<Tag style={{ position: "relative" }}>
			<TagLabel>{tagLabel}</TagLabel>
			<Popover placement="bottom">
				<PopoverTrigger>
					<Icon as={AiOutlineInfoCircle} />
				</PopoverTrigger>
				<PopoverContent style={{ top: "2rem" }}>
					<PopoverArrow className={styles.arrow} />
					<PopoverCloseButton />
					<PopoverHeader>Page Content</PopoverHeader>
					<PopoverBody>{children}</PopoverBody>
				</PopoverContent>
			</Popover>
		</Tag>
	);
}
