import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { Box, IconButton } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface IProps {
	items: { name: string; link: string; icon: any }[];
}

export default function Sidebar({ items }: PropsWithChildren<IProps>) {
	return (
		<Box bg="gray.600" p={1} borderTopRightRadius={25} borderBottomRightRadius={25} className={styles.container}>
			{items.map((item) => {
				return (
					<NavLink key={item.name} className={({ isActive, isPending }) => (isPending ? styles.pending : isActive ? styles.active : "")} to={item.link}>
						<IconButton color={"white"} size={"md"} borderRadius={20} aria-label={item.name} icon={item.icon} />
					</NavLink>
				);
			})}
		</Box>
	);
}
