import { Outlet, RouterProvider, createBrowserRouter, useNavigation } from "react-router-dom";
import Home from "../../pages/Home";
import Project from "../../pages/Project";
import Query from "../../pages/Project/pages/Query";
import Docs from "../../pages/Project/pages/Docs";
import Config from "@src/pages/Project/pages/Config";

export default function AppRoutes() {
	const router = createBrowserRouter([
		{
			path: "",
			element: <AppLoader />,
			children: [
				{
					index: true,
					element: <Home />,
					handle: {
						crumb: () => <span>Home</span>,
					},
				},
				{
					path: "projects",
					element: <Project />,
					handle: {
						crumb: () => <span>Projects</span>,
					},
					children: [
						{
							path: ":projectId",
							element: <Query />,
							handle: {
								crumb: () => <span>Project Home</span>,
							},
						},
						{
							path: ":projectId/docs",
							element: <Docs />,
							handle: {
								crumb: () => <span>Docs</span>,
							},
						},
						{
							path: ":projectId/config",
							element: <Config />,
							handle: {
								crumb: () => <span>Config</span>,
							},
						},
					],
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}

export function AppLoader() {
	const { state } = useNavigation();
	if (state == "loading") {
		console.log("Loading Screen");
		return <></>;
	}
	return <Outlet />;
}
