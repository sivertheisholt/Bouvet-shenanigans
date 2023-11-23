import "./App.css"
import { Button } from "./Components/Button"
import { DropDown } from "./Components/DropDown"
import { Select } from "./Components/Select"
import { TextInput } from "./Components/TextInput"

function App() {
	return (
		<div className="wrapper">
			<div className="px-5 py-3">
				<h1>Hva har skjedd?</h1>
				<div className="pt-2">
					<Button title="Start tale til tekst" />
				</div>

				<div className="pt-4">
					<Select
						items={[
							"Functional",
							"Performance",
							"Usability",
							"Reliability",
							"Compatability",
							"Scalability",
							"Maintainability",
							"Regulatory Compliance",
							"Environmental",
						]}
					/>
				</div>

				<div className="pt-4">
					<TextInput />
				</div>
			</div>
		</div>
	)
}

export default App
