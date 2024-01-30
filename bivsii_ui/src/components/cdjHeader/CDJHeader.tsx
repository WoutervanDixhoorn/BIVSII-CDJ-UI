import styles from "./cdjHeader.module.scss";

export default function CDJHeader({ title }: { title: string })
{
    return (
        <>
            <div className={styles.cdjHeader}>
                <h3>{ title }</h3>
            </div>
        </>
    );
};