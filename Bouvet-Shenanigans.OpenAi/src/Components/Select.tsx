import React, { ChangeEventHandler } from "react"

interface SelectItem {
	displayName: string
	id: number
}

export interface SelectProps {
	items: Array<SelectItem>
	selectedId: number
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => unknown
	className?: string
}

const SelectComponent = ({
	items,
	selectedId,
	onChange = () => {},
	className = "",
}: SelectProps) => {
	className += " form-select"
	return (
		<select
			value={selectedId}
			className={className}
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
