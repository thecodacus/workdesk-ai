import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { useAddProjectMutation } from "../../../../state/services/projectsService";

export default function AddProjectButton() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [addProject] = useAddProjectMutation();
	const nameRef = useRef<HTMLInputElement>(null);
	const onAddProject = async () => {
		console.log(nameRef.current?.value);
		await addProject({
			name: nameRef.current?.value,
		}).unwrap();
		onClose();
	};

	return (
		<>
			<Button colorScheme="cyan" onClick={onOpen}>
				New Project
			</Button>

			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create New Project</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Project Name</FormLabel>
							<Input ref={nameRef} placeholder="My Personal Research" />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button onClick={onAddProject} colorScheme="cyan" mr={3}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
