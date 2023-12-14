export type RetrievalUpsertDto = {
	documents: [
		{
			text: string
			metadata: {
				source: string
				created_at: string
				author: string
			}
		}
	]
}
