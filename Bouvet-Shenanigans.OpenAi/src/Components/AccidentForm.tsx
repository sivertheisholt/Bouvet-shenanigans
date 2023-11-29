import React, { useState } from "react"
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
	return (
		<div className="px-5 py-3 h-100">
			<h1 className="fs-1">Hva har skjedd?</h1>
			<div className="mt-4 alert alert-info fs-6" role="alert">
				Bruk tale til tekst funksjonen så vil systemet foreslå riktig kategori og lage en
				oppsummert beskrivelse
			</div>
			<div>
				<Button
					className="fs-5"
					onClick={() => setIsRecording(true)}
					title="Start tale til tekst"
				/>
			</div>

			<Select
				className="mt-4"
				selectedId={data ? data.categoryId : 0}
				items={categories.categories.map((cat) => {
					return {
						displayName: cat.displayName,
						id: cat.id,
					}
				})}
			/>

			<TextInput className="mt-4 h-25" value={data ? data.summary : ""} />

			<div className="pt-4">
				<Button className="me-2 fs-5" title="Start på nytt" />
				<Button className="fs-5" title="Lagre" />
			</div>
		</div>
	)
}

export const AccidentForm = React.memo(AccidentFormComponent)
