import type {User} from "../../types/user.ts";

interface SidebarFooterProps {
    user?: User;
}

export default function SidebarFooter({user}: SidebarFooterProps) {
    const getInitials = (email: string) => email ? email.slice(0, 2).toUpperCase() : 'ME';
    return (
        <>
            <div className="sidebar__footer">
                <div className="sidebar__avatar-row">
                    <div className="sidebar__avatar">
                        {user && getInitials(user.email)}
                    </div>
                    <div className="sidebar__avatar-info">
                        <div className="sidebar__avatar-name">
                            {user && user.email || 'myemail@gmail.com'}
                        </div>
                        <div className="sidebar__avatar-role">Free plan</div>
                    </div>
                </div>
            </div>
        </>
    )
}