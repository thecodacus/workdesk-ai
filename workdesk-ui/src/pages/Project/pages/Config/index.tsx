import { Container, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { setOpenAIApiKey } from "@src/state/services/configService";
export default function Config() {
	const [apiKey, setApiKey] = useState<string>();
	const dispatch = useDispatch();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let key = e.currentTarget.value;
		setApiKey(key);
	};
	useEffect(() => {
		if (apiKey) dispatch(setOpenAIApiKey(apiKey));
	}, [apiKey]);
	return (
		<Container className={styles.container}>
			<FormControl>
				<FormLabel>Open AI API Key</FormLabel>
				<Input onChange={handleChange} type="password" value={apiKey} />
				<FormHelperText>your api key never leaves your computer</FormHelperText>
			</FormControl>
		</Container>
	);
}
