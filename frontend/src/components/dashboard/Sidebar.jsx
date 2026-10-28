import { LayoutDashboard, ArrowLeftRight, Tags, ChartNoAxesCombined, Settings, Wallet, UserRound, LogOut, Icon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import useAuthStore from "../../lib/store/authStore";
import { Button } from "../ui/button";


const Sidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { user, clearAuth } = useAuthStore();


    const menuItems = [
        { title: "Dashboard", icon: LayoutDashboard, path: '/dashboard' },
        { title: "Transactions", icon: ArrowLeftRight, path: '/transactions' },
        { title: "Categories", icon: Tags, path: '/categories' }
    ];

    return (
        <aside className="flex min-h-screen w-64 flex-col bg-slate-900 px-5 py-7 text-white">

            <div className="mb-10 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500 p-2">
                    <Wallet size={24} />
                </div>

                <div>
                    <h1 className="text-xl font-bold">Finance Track</h1>
                    <p className="text-xs text-slate-400">Finance Dashboard</p>
                </div>
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Main Menu
            </p>

            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.title}
                            type="button"
                            onClick={()=> navigate(item.path)}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${ location.pathname === item.path
                                    ? "bg-emerald-500 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <Icon size={20} />
                            <span className="text-sm font-medium">{item.title}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-slate-600 pt-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700">
                        <UserRound size={20} />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                            {user?.name || "User"}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                            {user?.email || "No email"}
                        </p>
                    </div>
                
                </div>

                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-slate-300 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                    onClick={() => {
                        clearAuth();
                        navigate("/login", { replace: true });
                    }}>

                    <LogOut size={18} />
                    <span>Logout</span>
                    
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
