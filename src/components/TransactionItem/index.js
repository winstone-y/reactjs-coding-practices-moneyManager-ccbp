const TransactionItem = props => {
  const {eachItem, onDelete} = props
  const {amount, id, displayText, title} = eachItem
  const onDeleteBtn = () => {
    onDelete(id)
  }
  return (
    <li className="history-table-row">
      <p className="history-table-row-item">{title}</p>
      <p className="history-table-row-item">Rs {amount}</p>
      <p className="history-table-row-item">{displayText}</p>
      <p className="history-table-row-btn-item">
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
      </p>
    </li>
  )
}
export default TransactionItem
