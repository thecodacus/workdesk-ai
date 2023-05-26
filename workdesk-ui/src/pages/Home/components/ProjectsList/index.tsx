import { Link } from "react-router-dom";
import { useDeleteProjectMutation, useGetProjectsQuery } from "@src/state/services/projectsService";
import { Box, IconButton } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import { DeleteIcon } from "@chakra-ui/icons";
export default function ProjectsList() {
	const { data: projects, isLoading } = useGetProjectsQuery();
	const [deleteProject] = useDeleteProjectMutation();
	if (isLoading) return <div style={{ margin: "auto", textAlign: "center" }}>Loading...</div>;
	if (!projects || projects.length === 0) return <div style={{ margin: "auto", textAlign: "center" }}>No projects</div>;
	return (
		<div className={styles.container}>
			{projects.map((project) => (
				<Box key={project.id}>
					<div className={styles.deleteIcon}>
						<IconButton
							onClick={() => {
								deleteProject(project.id);
							}}
							bg={"transparent"}
							aria-label="Delete"
							icon={<DeleteIcon />}
						/>
					</div>
					<Link to={`/projects/${project.id}/`} key={project.id}>
						<div className={styles.icon}></div>
						<div className={styles.name}>{project.name}</div>
					</Link>
				</Box>
			))}
		</div>
	);
}
