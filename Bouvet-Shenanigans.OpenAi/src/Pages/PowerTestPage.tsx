import React from "react"

export interface PowerTestPageProps {}

const PowerTestPageComponent = (props: PowerTestPageProps) => {
	return (
		<iframe
			title="AI Showcase LR BU2"
			width="1140"
			height="541.25"
			src="https://app.powerbi.com/reportEmbed?reportId=4bc43a4b-420b-4f24-99cc-32c926ec4682"
			frameBorder="0"
			allowFullScreen={true}
		></iframe>
	)
}

export const PowerTestPage = React.memo(PowerTestPageComponent)
