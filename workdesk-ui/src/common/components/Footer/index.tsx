import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { VscGithub } from "react-icons/vsc";
export default function Footer() {
	return (
		<div className={styles.container}>
			<div className={styles.disclaimer} style={{ display: "flex" }}>
				<span>Created By Codacus, </span>
				<Link to={"#"} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
					<VscGithub />
					<span>github</span>
				</Link>
			</div>
		</div>
	);
}
