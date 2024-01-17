export default function CDJListItem({itemText}: {itemText: string}) {

    return (
      <>
        <button type="button" className="listItem">{ itemText }</button>
      </>
    )
}