import React from "react"

export interface DropDownProps {
	items: Array<string>
}

const DropDownComponent = ({ items }: DropDownProps) => {
	return (
		<div className="dropdown">
			<button
				className="btn btn-primary dropdown-toggle"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				Dropdown button
			</button>
			<ul className="dropdown-menu">
				{items.map((item) => (
					<li>
						<a className="dropdown-item" href="#">
							{item}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export const DropDown = React.memo(DropDownComponent)
