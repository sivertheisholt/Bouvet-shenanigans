import React from "react"

interface SelectItem {
	displayName: string
	id: number
}

export interface SelectProps {
	items: Array<SelectItem>
	selectedId: number
	onChange?: () => unknown
}

const SelectComponent = ({ items, selectedId, onChange = () => {} }: SelectProps) => {
	return (
		<select
			value={selectedId}
			className="form-select"
			aria-label="Default select example"
			onChange={onChange}
		>
			<option disabled value={0}>
				Velg kategori
			</option>
			{items.map((item) => (
				<option key={item.id} value={item.id}>
					{item.displayName}
				</option>
			))}
		</select>
	)
}

export const Select = React.memo(SelectComponent)
