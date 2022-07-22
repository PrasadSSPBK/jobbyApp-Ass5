import './index.css'

const SalaryRange = props => {
  const {salaryRangesList, onChangeSalaryRange} = props
  const {label, salaryRangeId} = salaryRangesList

  const onChangeSalary = event => {
    const isChecked = event.target.checked
    onChangeSalaryRange(isChecked, salaryRangeId)
  }

  return (
    <li className="listItem">
      <input
        type="radio"
        className="inputCheck"
        value={label}
        id="salaryRangeId"
        onChange={onChangeSalary}
      />
      <label className="label" htmlFor="salaryRangeId">
        {label}
      </label>
    </li>
  )
}
export default SalaryRange
