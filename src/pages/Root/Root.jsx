import {Outlet} from "react-router-dom";
import styles from "./Root.module.scss";

const Root = () => {
    return (
        <div className={styles.root}>
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default Root;
