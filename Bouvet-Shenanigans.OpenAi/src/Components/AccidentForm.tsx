import React, { ReactElement, useState } from "react"
import { Select } from "./Select"
import { Button } from "./Button"
import { TextInput } from "./TextInput"
import { categories } from "../Static/categories"
import { ChatGptResponseSchemaDto } from "../Types/Hooks/ChatGptResponseSchemaDto"

export interface AccidentFormProps {
	data: ChatGptResponseSchemaDto
	setIsRecording: (state: boolean) => unknown
}

const AccidentFormComponent = ({ data, setIsRecording }: AccidentFormProps) => {
	const [, setSelectedParentCategory] = useState(0)
	const [, setSelectedSubCategory] = useState(0)

	const onChangeParentCategory = (element: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedParentCategory(parseInt(element.target.value))
		data.categoryId = parseInt(element.target.value)
	}

	const onChangeSubCategory = (element: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSubCategory(parseInt(element.target.value))
		data.subCategoryId = parseInt(element.target.value)
	}

	const startRecording = () => {
		navigator.mediaDevices
			.getUserMedia({ video: false, audio: true })
			.then(() => {
				setIsRecording(true)
			})
			.catch((err) => {
				console.error(`you got an error: ${err}`)
			})
	}

	const reset = () => {
		window.location.reload()
	}

	return (
		<div className="px-5 py-3 d-flex flex-column flex-grow-1">
			<h1 className="fs-2">Hva har skjedd?</h1>
			<div className="mt-2 alert alert-info fs-6" role="alert">
				Bruk tale til tekst funksjonen så vil systemet foreslå riktig kategori og lage en
				oppsummert beskrivelse
			</div>
			<div>
				<Button className="fs-5" onClick={startRecording} title="Start tale til tekst" />
			</div>

			<label className="mt-3 mb-2">
				<strong>Kategori:</strong>
			</label>
			<Select
				onChange={onChangeParentCategory}
				selectedId={data ? data.categoryId : 0}
				items={categories.categories.map((cat) => {
					return {
						displayName: cat.displayName,
						id: cat.id,
					}
				})}
			/>

			{data.categoryId != 0 && (
				<Select
					placeholder="Velg underkategori"
					onChange={onChangeSubCategory}
					className="mt-4"
					selectedId={data ? data.subCategoryId : 0}
					items={categories.categories[data.categoryId - 1].subCategories.map((cat) => {
						return {
							displayName: cat.displayName,
							id: cat.id,
						}
					})}
				/>
			)}

			{data.categoryId != 0 && (
				<>
					<label className="mt-3 mb-2">
						<strong>Alvorlighetsgrad:</strong>
					</label>
					<Select
						placeholder="Velg grad"
						onChange={() => {}}
						selectedId={1}
						items={[
							{ displayName: "Høy", id: 0 },
							{ displayName: "Moderat", id: 1 },
							{ displayName: "Lav", id: 2 },
						]}
					/>
				</>
			)}

			<TextInput className="mt-4" value={data ? data.summary : ""} />

			<div className="pt-4">
				<Button onClick={reset} className="me-2 fs-5" title="Start på nytt" />
				<Button className="fs-5" title="Lagre" />
			</div>
		</div>
	)
}

export const AccidentForm = React.memo(AccidentFormComponent)
