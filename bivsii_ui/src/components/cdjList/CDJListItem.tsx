import styles from "./cdjList.module.scss";

export default function CDJListItem({itemText}: {itemText: string}) {

    return (
      <>
        <button className={styles.listItem} id="listItem">{ itemText }</button>
      </>
    )
}