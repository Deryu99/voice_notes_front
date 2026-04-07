import SidebarLogo from "../sidebar/SidebarLogo.tsx";
import SidebarNav from "../sidebar/SidebarNav.tsx";
import SidebarFooter from "../sidebar/SidebarFooter.tsx";
import type {User} from "../../types/user.ts";

interface SidebarProps {
    user: User,
    onNotesImported?: () => Promise<void> | void,
}
export default function Sidebar({user, onNotesImported}: SidebarProps) {
    return (
        <>
            <aside className="sidebar">
                <SidebarLogo />
                <SidebarNav onNotesImported={onNotesImported} />
                <SidebarFooter user={user} />

            </aside>
        </>
    )
}