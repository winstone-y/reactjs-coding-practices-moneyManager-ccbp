const TransactionItem = props => {
  const {eachItem, onDelete} = props
  const {amount, id, displayText, title} = eachItem
  const onDeleteBtn = () => {
    onDelete(id)
  }
  return (
    <tr className="history-table-row">
      <td className="history-table-row">{title}</td>
      <td className="history-table-row">Rs {amount}</td>
      <td className="history-table-row">{displayText}</td>
      <td className="history-table-row">
        <button
          data-testid="delete"
          onClick={onDeleteBtn}
          type="button"
          className="delete-button"
        >
          <img
            className="delete-icon"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          />
        </button>
      </td>
    </tr>
  )
}
export default TransactionItem
