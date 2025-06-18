import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-blue-400 bg-blue-50 flex flex-col transition-all duration-200">
  <div className="border-b bg-blue-100 border-blue-400 w-full p-5">
    <div className="flex items-center gap-2">
      <Users className="size-6 text-blue-700" />
      <span className="font-semibold text-blue-900 hidden lg:block">Contacts</span>
    </div>
    <div className="mt-3 hidden lg:flex items-center gap-2">
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="checkbox"
          checked={showOnlineOnly}
          onChange={(e) => setShowOnlineOnly(e.target.checked)}
          className="checkbox checkbox-sm text-blue-600 accent-blue-600"
        />
        <span className="text-sm text-blue-800">Show online only</span>
      </label>
      <span className="text-xs text-blue-700">({onlineUsers.length > 0 ?onlineUsers.length-1 : 0} online)</span>
    </div>
  </div>

  <div className="overflow-y-auto bg-blue-100 w-full py-3">
    {filteredUsers.map((user) => (
      <button
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className={`
          w-full p-3 flex items-center gap-3
          hover:bg-blue-200 transition-colors
          ${selectedUser?._id === user._id ? "bg-blue-200 ring-1 ring-blue-400" : ""}
        `}
      >
        <div className="relative mx-auto lg:mx-0">
          <img
            src={user.profilePic || "/avatar.png"}
            alt={user.name}
            className="size-12 object-cover rounded-full"
          />
          {onlineUsers.includes(user._id) && (
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-blue-100" />
          )}
        </div>
        <div className="hidden lg:block text-left min-w-0">
          <div className="font-medium truncate text-blue-900">{user.fullName}</div>
          <div className="text-sm text-blue-600">
            {onlineUsers.includes(user._id) ? "Online" : "Offline"}
          </div>
        </div>
      </button>
    ))}

    {filteredUsers.length === 0 && (
      <div className="text-center text-blue-500 py-4">No online users</div>
    )}
  </div>
</aside>

  );
};
export default Sidebar;
