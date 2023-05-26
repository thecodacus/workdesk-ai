import "./App.scss";
import AppRoutes from "./setup/routes/AppRoutes";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { theme } from "./themes/themes";

function App() {
	return (
		<>
			<ChakraBaseProvider theme={theme}>
				<div className="App">
					<AppRoutes></AppRoutes>
				</div>
			</ChakraBaseProvider>
		</>
	);
}

export default App;
