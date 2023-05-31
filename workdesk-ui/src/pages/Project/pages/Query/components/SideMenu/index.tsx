import {
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	IconButton,
	Icon,
	Select,
	FormControl,
	FormLabel,
	FormHelperText,
	Box,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	SliderMark,
} from "@chakra-ui/react";
import { AnswerMethod, ModelName, setAnswerMethod, setModel, setSourceMatchCount, setTemperature } from "@src/state/services/queryService";
import { useEffect, useRef, useState } from "react";
import { MdGraphicEq, MdOutlineDocumentScanner } from "react-icons/md";
import { VscGear } from "react-icons/vsc";
import { useDispatch } from "react-redux";

export default function SideMenu() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const [tempValue, setTempValue] = useState<number>(20);
	const [sourceCount, setSourceCount] = useState<number>(2);
	const [modelName, setModelName] = useState<ModelName>(ModelName.GPT3_5);
	const [ansMethod, setAnsMethod] = useState<AnswerMethod>(AnswerMethod.STUFF);
	const btnRef = useRef(null);

	const labelStyles = {
		mt: "2",
		ml: "-2.5",
		fontSize: "sm",
	};

	useEffect(() => {
		dispatch(setTemperature(tempValue / 100.0));
	}, [tempValue]);
	useEffect(() => {
		dispatch(setModel(modelName));
	}, [modelName]);
	useEffect(() => {
		dispatch(setAnswerMethod(ansMethod));
	}, [ansMethod]);

	useEffect(() => {
		dispatch(setSourceMatchCount(sourceCount));
	}, [sourceCount]);

	return (
		<>
			<IconButton bg={"transparent"} color={"whiteAlpha.800"} aria-label="Settings" icon={<Icon as={VscGear} />} ref={btnRef} colorScheme="teal" onClick={onOpen}>
				Open
			</IconButton>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Edit Parameters</DrawerHeader>

					<DrawerBody>
						{/* Model Name */}
						<FormControl pb={6}>
							<FormLabel>Select Model</FormLabel>
							<Select defaultValue={ModelName.GPT3_5} onChange={(val) => setModelName(val.currentTarget.value as ModelName)}>
								<option value={ModelName.GPT3_5}>GPT 3.5</option>
								<option value={ModelName.GPT4}>GPT 4</option>
							</Select>
							<FormHelperText>The AI model behind the scene</FormHelperText>
						</FormControl>
						{/* Temperature */}
						<FormControl pb={6}>
							<FormLabel>Temperature</FormLabel>
							<Box pt={7} pb={2}>
								<Slider aria-label="slider-ex-4" defaultValue={tempValue} onChange={(val) => setTempValue(val)}>
									<SliderMark value={0} {...labelStyles}>
										0%
									</SliderMark>
									<SliderMark value={100} {...labelStyles}>
										100%
									</SliderMark>
									<SliderMark value={tempValue} textAlign="center" bg="blue.500" color="white" mt="-10" ml="-6" w="12" borderRadius={4}>
										{tempValue}%
									</SliderMark>
									<SliderTrack bg="red.100">
										<SliderFilledTrack bg="tomato" />
									</SliderTrack>
									<SliderThumb boxSize={6}>
										<Box color="tomato" as={MdGraphicEq} />
									</SliderThumb>
								</Slider>
							</Box>
							<FormHelperText>Model Temperature to use, higher is more creative lower is more accurate</FormHelperText>
						</FormControl>
						{/* Answer Method */}
						<FormControl pb={6}>
							<FormLabel>Answer Method</FormLabel>
							<Select defaultValue={ansMethod} onChange={(val) => setAnsMethod(val.currentTarget.value as AnswerMethod)}>
								<option value={AnswerMethod.STUFF}>Stuff (Fastest)</option>
								<option value={AnswerMethod.MAP_REDUCE}>Map Reduce (Balanced)</option>
								<option value={AnswerMethod.REFINE}>Refine (Best results - Slow)</option>
							</Select>
							<FormHelperText>The method the AI wil use to research on the data</FormHelperText>
						</FormControl>
						{/* Source Match Count */}
						<FormControl pb={6}>
							<FormLabel>Source Match Count (K)</FormLabel>
							<Box pt={7} pb={2}>
								<Slider aria-label="slider-ex-4" defaultValue={sourceCount} max={10} min={1} onChange={(val) => setSourceCount(val)}>
									<SliderMark value={1} {...labelStyles}>
										1
									</SliderMark>
									<SliderMark value={10} {...labelStyles}>
										10
									</SliderMark>
									<SliderMark value={sourceCount} textAlign="center" bg="blue.500" color="white" mt="-10" ml="-6" w="12" borderRadius={4}>
										{sourceCount}
									</SliderMark>
									<SliderTrack bg="red.100">
										<SliderFilledTrack bg="tomato" />
									</SliderTrack>
									<SliderThumb boxSize={6}>
										<Box color="tomato" as={MdOutlineDocumentScanner} />
									</SliderThumb>
								</Slider>
							</Box>
							<FormHelperText>K - similarity match with source documents vector store</FormHelperText>
						</FormControl>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
