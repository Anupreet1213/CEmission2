// chatbot/config.js
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
import WebAssWidget from "./WebAssWidget";
import HistoryWidget from "./HistoryWidget";
import IndividualWidget from "./IndividualWidget";
import IndustryWidget from "./IndustryWidget";
import RateExperienceWidget from "./RateExperienceWidget";

const config = {
  botName: "My Chatbot",
  initialMessages: [
    createChatBotMessage("Welcome to Reclaim Green! How may I help you ?", {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "Web Assistance",
      widgetFunc: (props) => <WebAssWidget {...props} />,
    },
    {
      widgetName: "history",
      widgetFunc: (props) => <HistoryWidget {...props} />,
    },
    {
      widgetName: "individual",
      widgetFunc: (props) => <IndividualWidget {...props} />,
    },
    {
      widgetName: "industry",
      widgetFunc: (props) => <IndustryWidget {...props} />,
    },
    {
      widgetName: "Rate Your Experience",
      widgetFunc: (props) => <RateExperienceWidget {...props} />,
    },
  ],
};

export default config;
