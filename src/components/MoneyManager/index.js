import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    historyList: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  onTypeChange = event => {
    this.setState({type: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newHistory = {
      id: uuidv4(),
      title,
      amount,
      displayText: type === 'INCOME' ? 'Income' : 'Expenses',
    }
    if (type === 'EXPENSES') {
      this.setState(prevState => ({
        expenses: prevState.expenses + amount,
        balance: prevState.balance - amount,
      }))
    } else {
      this.setState(prevState => ({
        income: prevState.income + amount,
        balance: prevState.balance + amount,
      }))
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      title: '',
      amount: '',
      type: '',
    }))
  }

  onDelete = id => {
    const {historyList} = this.state
    const historyItem = historyList.filter(eachItem => eachItem.id === id)[0]
    console.log(historyItem)
    if (historyItem.displayText === 'Expenses') {
      this.setState(prevState => ({
        expenses: prevState.expenses - historyItem.amount,
        balance: prevState.balance + historyItem.amount,
      }))
    } else {
      this.setState(prevState => ({
        income: prevState.income - historyItem.amount,
        balance: prevState.balance - historyItem.amount,
      }))
    }
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {
      historyList,
      title,
      amount,
      type,
      balance,
      income,
      expenses,
    } = this.state
    return (
      <div className="money-manager-bg">
        <div className="welcome-container">
          <h1 className="welcome-title">Hi, Richard</h1>
          <p className="welcome-description">
            Welcome back to your
            <span className="welcome-span"> Money Manager</span>
          </p>
        </div>
        <div className="money-details">
          <ul className="money-details-unordered-list">
            <li className="money-details-list-item">
              <img
                className="money-details-list-item-icon"
                alt="balance"
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              />
              <div className="money-details-list-item-text">
                <p className="money-details-list-item-title">Your Balance</p>
                <p
                  data-testid="balanceAmount"
                  className="money-details-list-item-value"
                >
                  Rs {balance}
                </p>
              </div>
            </li>
            <li className="money-details-list-item">
              <img
                className="money-details-list-item-icon"
                alt="income"
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              />
              <div className="money-details-list-item-text">
                <p className="money-details-list-item-title">Your Income</p>
                <p
                  data-testid="incomeAmount"
                  className="money-details-list-item-value"
                >
                  Rs {income}
                </p>
              </div>
            </li>
            <li className="money-details-list-item">
              <img
                className="money-details-list-item-icon"
                alt="expenses"
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              />
              <div className="money-details-list-item-text">
                <p className="money-details-list-item-title">Your Expenses</p>
                <p
                  data-testid="expensesAmount"
                  className="money-details-list-item-value"
                >
                  Rs {expenses}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="transaction-and-history">
          <div className="transaction">
            <h1 className="form-title">Add Transaction</h1>
            <form onSubmit={this.onSubmitForm} className="transaction-form">
              <div className="form-item">
                <label className="form-title-label" htmlFor="title">
                  TITLE
                </label>
                <br />
                <input
                  value={title}
                  onChange={this.onTitleChange}
                  id="title"
                  className="form-title-input"
                  type="text"
                  placeholder="Title"
                />
              </div>
              <div className="form-item">
                <label className="form-title-label" htmlFor="amount">
                  AMOUNT
                </label>
                <br />
                <input
                  value={amount}
                  onChange={this.onAmountChange}
                  id="amount"
                  className="form-title-input"
                  type="text"
                  placeholder="Amount"
                />
              </div>
              <div className="form-item">
                <label className="form-title-label" htmlFor="type">
                  TYPE
                </label>
                <br />
                <select
                  onChange={this.onTypeChange}
                  value={type}
                  className="form-title-input"
                  id="type"
                >
                  <option
                    className="form-title-input-option"
                    value={transactionTypeOptions[0].optionId}
                  >
                    Income
                  </option>
                  <option
                    className="form-title-input-option"
                    value={transactionTypeOptions[1].optionId}
                  >
                    Expenses
                  </option>
                </select>
              </div>
              <button className="form-submit" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="history">
            <h1 className="history-title">History</h1>
            <table className="history-table">
              <tbody>
                <tr className="history-table-row">
                  <th className="history-table-row">Title</th>
                  <th className="history-table-row">Amount</th>
                  <th className="history-table-row">Type</th>
                  <th className="history-table-row">{}</th>
                </tr>
                {historyList.map(eachItem => (
                  <TransactionItem
                    key={eachItem.id}
                    eachItem={eachItem}
                    onDelete={this.onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
