import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-12 sm:p-16 bg-blue-50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center
               justify-center animate-bounce shadow-md"
            >
              <MessageSquare className="w-9 h-9 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold text-blue-700">Welcome to Chatty!</h2>
        <p className="text-blue-500 text-base font-medium">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
