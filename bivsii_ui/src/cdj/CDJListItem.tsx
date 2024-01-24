export default function CDJListItem({itemText}: {itemText: string}) {

    return (
      <>
        <button className="listItem">{ itemText }</button>
      </>
    )
}