import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure, Button } from "@chakra-ui/react";
import { PropsWithChildren, useRef } from "react";

interface IProps {
	header: string;
	body: string;
	yesBtnText?: string;
	noBtnText?: string;
	callback: (bool: boolean) => void;
}

export default function AlertBox({ header, body, yesBtnText, noBtnText, callback, children }: PropsWithChildren<IProps>) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Button onClick={onOpen}>{children}</Button>
			<AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>{header}</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>{body}</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							{noBtnText || "No"}
						</Button>
						<Button
							onClick={() => {
								callback(true);
							}}
							colorScheme="red"
							ml={3}
						>
							{yesBtnText || "Yes"}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
