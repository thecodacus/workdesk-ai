import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
export default function Navbar() {
	return (
		<div className={styles.container}>
			<Link to={"/"} className={styles.logo}>
				<img src="/img/common/logo1.png" alt="workdesk logo" />
				<div className={styles.logoText}>Workdesk AI</div>
			</Link>
		</div>
	);
}
