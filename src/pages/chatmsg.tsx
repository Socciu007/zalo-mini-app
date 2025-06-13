import React, { FC, useState } from "react";
import { Box, Header, Page, Icon, Input } from "zmp-ui";

const ChatMsgPageList: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState<any[]>([]);

  const handleSendMessage = (message: string) => {
    setConversation([...conversation, { role: "user", content: message }]);
  };

  return (
    <Box
      className="flex flex-col justify-between h-full overflow-hidden bg-gray-50"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      {/* Chat messages here */}
      <Box className="flex-1 overflow-y-auto p-4 my-5">
        {/* Nội dung chat hiện tại, có thể dùng map(...) sau này */}
        {conversation.map((message, index) => (
          <Box key={index} className="flex">
            <Box className="flex-1">{message.content}</Box>
          </Box>
        ))}
      </Box>

      {/* Suggestions */}
      <Box className="px-4 pb-2 flex flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-base cursor-pointer">
          上海-新加坡报价是多少？
        </span>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-base cursor-pointer">
          上海-曼谷 ONE船司本地费是多少？
        </span>
      </Box>

      {/* Input chat */}
      <Box className="px-4 mb-2 gap-2">
        <Input
          className="flex-1 bg-gray-100 rounded-full px-2 text-base"
          placeholder="有什么问题尽管问我"
          onChange={(e) => setInputValue(e.target.value)}
          prefix={
            <Box pl={1}>
              <Icon icon="zi-mic" className="text-3xl text-gray-500" />
            </Box>
          }
          suffix={
            <Box pr={1} className="flex">
              <Box onClick={handleSendMessage.bind(null, inputValue)}>
                <Icon
                  icon="zi-plus-circle"
                  className="text-3xl text-gray-500"
                />
              </Box>
              <Box onClick={handleSendMessage.bind(null, inputValue)}>
                <Icon icon="zi-send-solid" className="text-3xl text-gray-300" />
              </Box>
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

const ChatMsgPage: FC = () => {
  return (
    <Page className="relative flex-1 flex flex-col">
      <Header title="小泛" showBackIcon={false} />
      <ChatMsgPageList />
    </Page>
  );
};

export default ChatMsgPage;
