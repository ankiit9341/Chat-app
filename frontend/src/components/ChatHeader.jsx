import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b bg-blue-100 border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-300"
            />
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-blue-900">{selectedUser.fullName}</h3>
            <p className="text-sm text-blue-600">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
