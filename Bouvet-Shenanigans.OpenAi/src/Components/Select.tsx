import React from "react"

export interface SelectProps {
	items: Array<string>
}

const SelectComponent = ({ items }: SelectProps) => {
	return (
		<select className="form-select" aria-label="Default select example">
			{items.map((item) => (
				<option selected>{item}</option>
			))}
		</select>
	)
}

export const Select = React.memo(SelectComponent)
