interface Metadata {
	source: string
	source_id: string
	url: string
	created_at: string
	author: string
	document_id: string
}

interface Result {
	id: string
	text: string
	metadata: Metadata
	embedding: number[]
	score: number
}

interface QueryResult {
	query: string
	results: Result[]
}

export type RetrievalQueryResponseDto = {
	results: QueryResult[]
}
