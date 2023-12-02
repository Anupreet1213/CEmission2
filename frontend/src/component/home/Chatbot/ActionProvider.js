import { createChatBotMessage } from "react-chatbot-kit";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleOptions = () => {
    const message = this.createChatBotMessage("Choose an option:", {
      widget: "options",
    });

    this.updateChatbotState(message);
  };
  handleWebAss = () => {
    const message = this.createChatBotMessage("Choose an option:", {
      widget: "Web Assistance",
    });

    this.updateChatbotState(message);
  };

  handleHistory = () => {
    const message = this.createChatBotMessage("Here is your history:", {
      widget: "history",
    });

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
