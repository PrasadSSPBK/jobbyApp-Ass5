import './index.css'

const EmploymentType = props => {
  const {employmentTypesList, onChangeEmploymentType} = props
  const {label, employmentTypeId} = employmentTypesList

  const onChangeEmployment = event => {
    const isChecked = event.target.checked

    onChangeEmploymentType(isChecked, employmentTypeId)
  }

  return (
    <li className="listItem">
      <input
        type="checkbox"
        className="inputCheck"
        value={label}
        id="employmentTypeId"
        onChange={onChangeEmployment}
      />
      <label className="label" htmlFor="employmentTypeId">
        {label}
      </label>
    </li>
  )
}
export default EmploymentType
