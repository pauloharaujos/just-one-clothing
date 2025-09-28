import { signOut } from "@/auth";

export default function Sidebar() {
  return (
    <aside className="w-full max-w-xs mt-8">
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <nav>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="/customer/account" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-semibold cursor-pointer transition-colors">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#6366F1" strokeWidth="2" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.015-8 4.5V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-2.485-3.582-4.5-8-4.5Z"/></svg>
                My Account
              </a>
            </li>
            <li>
              <a href="/customer/orders" className="flex items-center gap-2 px-4 py-2 rounded-lg text-indigo-700 bg-indigo-50 font-semibold cursor-pointer transition-colors hover:bg-indigo-100">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#6366F1" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18"/></svg>
                My Orders
              </a>
            </li>
          </ul>
        </nav>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors mt-4"
          >
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
