export type RetrievalQueryDto = {
	queries: [
		{
			query: string
			filter: {
				source: string
				source_id: string
				author: string
			}
			top_k: number
		}
	]
}
