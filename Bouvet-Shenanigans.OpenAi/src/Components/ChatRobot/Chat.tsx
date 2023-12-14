import React, { useState } from "react"
import "./chat.css"
import boticon from "../../images/boticon.png"
import usericon from "../../images/usericon.png"
import { ChatMessage } from "../../Types/ChatRobot/ChatMessage"

export interface ChatProps {
	username: string
	messages: Array<ChatMessage>
	sendPrompt: (prompt: string) => unknown
}

const ChatComponent = ({ username, messages, sendPrompt }: ChatProps) => {
	const [value, setValue] = useState("")

	const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value)
	}

	return (
		<div style={{ height: "calc(100% - 50px)" }} className="d-flex flex-column">
			<main className="msger-chat">
				{messages.map((message) => {
					if (message.author == "bot") {
						return (
							<div
								key={`${message.author}${message.created_at}`}
								className="msg left-msg"
							>
								<div
									className="msg-img"
									style={{
										backgroundImage: `url(${boticon})`,
									}}
								/>
								<div className="msg-bubble">
									<div className="msg-info">
										<div className="msg-info-name">Shenanigano</div>
										<div className="msg-info-time">12:45</div>
									</div>

									<div className="msg-text">{message.message}</div>
								</div>
							</div>
						)
					} else {
						return (
							<div
								key={`${message.author}${message.created_at}`}
								className="msg right-msg"
							>
								<div
									className="msg-img"
									style={{
										backgroundImage: `url(${usericon})`,
									}}
								/>

								<div className="msg-bubble">
									<div className="msg-info">
										<div className="msg-info-name">{username}</div>
										<div className="msg-info-time">12:46</div>
									</div>

									<div className="msg-text">{message.message}</div>
								</div>
							</div>
						)
					}
				})}
			</main>

			<div className="msger-inputarea">
				<input
					id="chat-user-input"
					type="text"
					className="msger-input"
					placeholder="Enter your message..."
					value={value}
					onChange={onInputChange}
				/>
				<button onClick={() => sendPrompt(value)} className="msger-send-btn">
					Send
				</button>
			</div>
		</div>
	)
}

export const Chat = React.memo(ChatComponent)
