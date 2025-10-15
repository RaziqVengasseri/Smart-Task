import {
    User, Mail, Home,
    ListChecks,
    CheckCircle2, Lock, Home as HomeIcon, Zap,
    ArrowDownNarrowWide, ArrowUpNarrowWide, Trophy,
    Edit3,
    Trash,
    MoreHorizontal,
    Clock,
    Calendar,
} from "lucide-react"

// BACKEND TEST 
// DUMMY DATA
const BACKEND_DUMMY = [
    {
        title: "Buy groceries",
        description: "Milk, bread, eggs, and spinach",
        priority: "Low",
        dueDate: "2025-05-02T18:00:00.000Z",
        completed: "No"
    },
    {
        "title": "Book dentist appointment",
        "description": "Routine check-up and cleaning",
        "priority": "Medium",
        "dueDate": "2025-05-10T10:00:00.000Z",
        "completed": true
    },
    {
        "title": "Book dentist appointment",
        "description": "Routine check-up and cleaning",
        "priority": "Medium",
        "dueDate": "2025-05-10T10:00:00.000Z",
        "completed": true
    },
    {
        "title": "Pay utility bills",
        "description": "Electricity and water bills for April",
        "priority": "High",
        "dueDate": "2025-04-28T12:00:00.000Z",
        "completed": "Yes"
    }
];

// FRONTEND DUMMY DATA

// assets/formConstants.js
export const baseControlClasses =
    "w-full px-4 py-2.5 border border-pink-900/20 bg-slate-900/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm text-white placeholder-gray-400 shadow-lg backdrop-blur-sm";

export const priorityStyles = {
    Low: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    Medium: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    High: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

// data/defaultTask.js
export const DEFAULT_TASK = {
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    completed: "No",
    id: null,
};

// LOGIN CSS
export const INPUTWRAPPER =
    "flex items-center border border-pink-500/30 bg-slate-900/50 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500 transition-all duration-300 backdrop-blur-md"
export const BUTTON_CLASSES =
    "w-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white text-sm font-bold py-2.5 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"

// PROFILE CSS
export const INPUT_WRAPPER =
    "flex items-center border border-pink-500/30 bg-slate-900/50 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500 transition-all duration-300 backdrop-blur-md"
export const FULL_BUTTON =
    "w-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white py-2.5 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 font-bold"
export const SECTION_WRAPPER = "bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-500/20 p-6"
export const BACK_BUTTON =
    "flex items-center text-gray-400 hover:text-pink-400 mb-8 transition-colors duration-300 font-medium"
export const DANGER_BTN =
    "w-full text-rose-400 border-2 border-rose-500/30 bg-slate-900/40 py-2.5 rounded-xl hover:bg-rose-500/10 hover:border-rose-500/50 transition-all duration-300 font-bold"

export const personalFields = [
    { name: "name", type: "text", placeholder: "Full Name", icon: User },
    { name: "email", type: "email", placeholder: "Email", icon: Mail },
]

export const securityFields = [
    { name: "current", placeholder: "Current Password" },
    { name: "new", placeholder: "New Password" },
    { name: "confirm", placeholder: "Confirm Password" },
];

// SIDEBAR 
export const menuItems = [
    { text: "Dashboard", path: "/", icon: <Home className="w-5 h-5" /> },
    { text: "Pending Tasks", path: "/pending", icon: <ListChecks className="w-5 h-5" /> },
    { text: "Completed Tasks", path: "/complete", icon: <CheckCircle2 className="w-5 h-5" /> },
]

export const SIDEBAR_CLASSES = {
    desktop: "hidden md:flex flex-col fixed h-full w-20 lg:w-64 bg-slate-950/95 backdrop-blur-xl border-r border-pink-500/20 shadow-2xl shadow-pink-500/10 z-20 transition-all duration-300",
    mobileButton: "absolute md:hidden top-25 left-5 z-50 bg-gradient-to-br from-pink-600 to-rose-600 text-white p-2 rounded-2xl shadow-2xl shadow-pink-500/50 hover:scale-110 transition-all duration-300",
    mobileDrawerBackdrop: "fixed inset-0 bg-slate-950/80 backdrop-blur-md",
    mobileDrawer: "absolute top-0 left-0 w-64 h-full bg-slate-950/95 backdrop-blur-xl border-r border-pink-500/20 shadow-2xl shadow-pink-500/20 z-50 p-4 flex flex-col space-y-6",
}

export const LINK_CLASSES = {
    base: "group flex items-center px-4 py-3 rounded-2xl transition-all duration-300",
    active: "bg-gradient-to-r from-pink-600/30 to-rose-600/30 border-l-4 border-pink-500 text-pink-300 font-bold shadow-lg shadow-pink-500/20",
    inactive: "hover:bg-pink-500/10 text-gray-400 hover:text-pink-300",
    icon: "transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-pink-500",
    text: "text-sm font-medium ml-2",
}

export const PRODUCTIVITY_CARD = {
    container: "bg-slate-900/60 backdrop-blur-md rounded-2xl p-3 border border-pink-500/20 shadow-xl",
    header: "flex items-center justify-between mb-2",
    label: "text-xs font-bold text-pink-400",
    badge: "text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full font-bold border border-pink-500/30",
    barBg: "w-full h-2 bg-slate-800 rounded-full overflow-hidden",
    barFg: "h-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 animate-pulse shadow-lg shadow-pink-500/50",
}

export const TIP_CARD = {
    container: "bg-gradient-to-br from-slate-900/80 to-pink-900/30 backdrop-blur-md rounded-2xl p-4 border border-pink-500/30 shadow-2xl shadow-pink-500/20",
    iconWrapper: "p-2 bg-pink-500/20 rounded-xl backdrop-blur-sm",
    title: "text-sm font-bold text-white",
    text: "text-xs text-gray-400 mt-1",
}

// SIGNUP 
export const FIELDS = [
    { name: "name", type: "text", placeholder: "Full Name", icon: User },
    { name: "email", type: "email", placeholder: "Email", icon: Mail },
    { name: "password", type: "password", placeholder: "Password", icon: Lock },
]

export const Inputwrapper =
    "flex items-center border border-pink-500/30 bg-slate-900/50 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500 transition-all duration-300 backdrop-blur-md"
export const BUTTONCLASSES =
    "w-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white text-sm font-bold py-2.5 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
export const MESSAGE_SUCCESS = "bg-emerald-500/10 text-emerald-300 p-3 rounded-xl text-sm mb-4 border border-emerald-500/30 shadow-lg backdrop-blur-sm"
export const MESSAGE_ERROR = "bg-rose-500/10 text-rose-300 p-3 rounded-xl text-sm mb-4 border border-rose-500/30 shadow-lg backdrop-blur-sm"

// TASK ITEM
export const getPriorityColor = (priority) => {
    const colors = {
        low: "border-emerald-500 bg-emerald-500/10 text-emerald-300",
        medium: "border-pink-500 bg-pink-500/10 text-pink-300",
        high: "border-rose-500 bg-rose-500/10 text-rose-300",
    }
    return colors[priority?.toLowerCase()] || "border-gray-500 bg-gray-500/10 text-gray-400"
}

export const getPriorityBadgeColor = (priority) => {
    const colors = {
        low: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        medium: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
        high: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    }
    return colors[priority?.toLowerCase()] || "bg-gray-500/20 text-gray-400 border border-gray-500/30"
}

// DASHBOARD
// UI Constants
export const WRAPPER = "p-4 md:p-6 min-h-screen overflow-hidden bg-transparent"
export const HEADER = "flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3"
export const ADD_BUTTON =
    "flex items-center gap-2 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/60 hover:scale-[1.02] transition-all duration-300 w-full md:w-auto justify-center text-sm md:text-base font-bold"
export const STATS_GRID = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6"
export const STAT_CARD =
    "p-3 md:p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl shadow-2xl border border-pink-500/20 hover:shadow-pink-500/20 hover:scale-105 transition-all duration-300 min-w-0"
export const ICON_WRAPPER = "p-1.5 md:p-2 rounded-xl backdrop-blur-sm"
export const VALUE_CLASS = "text-lg md:text-2xl font-bold truncate text-white"
export const LABEL_CLASS = "text-xs text-gray-400 truncate font-medium"

// Stats definitions
export const STATS = [
    { key: "total", label: "Total Tasks", icon: HomeIcon, iconColor: "bg-pink-500/20 text-pink-400 border border-pink-500/30", valueKey: "total", gradient: true },
    { key: "lowPriority", label: "Low Priority", icon: Zap, iconColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30", borderColor: "border-emerald-500/30", valueKey: "lowPriority", textColor: "text-emerald-300" },
    { key: "mediumPriority", label: "Medium Priority", icon: Zap, iconColor: "bg-pink-500/20 text-pink-400 border border-pink-500/30", borderColor: "border-pink-500/30", valueKey: "mediumPriority", textColor: "text-pink-300" },
    { key: "highPriority", label: "High Priority", icon: Zap, iconColor: "bg-rose-500/20 text-rose-400 border border-rose-500/30", borderColor: "border-rose-500/30", valueKey: "highPriority", textColor: "text-rose-300" },
]

// Filter options
export const FILTER_OPTIONS = ["all", "today", "week", "high", "medium", "low"]
export const FILTER_LABELS = {
    all: "All Tasks",
    today: "Today's Tasks",
    week: "This Week",
    high: "High Priority",
    medium: "Medium Priority",
    low: "Low Priority",
}

// Empty state
export const EMPTY_STATE = {
    wrapper: "p-6 bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-500/20 text-center",
    iconWrapper: "w-16 h-16 bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm",
    btn: "px-4 py-2 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300",
}

// Filter UI Constants
export const FILTER_WRAPPER = "flex items-center justify-between bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-pink-500/20"
export const SELECT_CLASSES = "px-3 py-2 border border-pink-500/30 bg-slate-900/50 text-white rounded-xl focus:ring-2 focus:ring-pink-500 md:hidden text-sm backdrop-blur-sm"
export const TABS_WRAPPER = "hidden md:flex space-x-1 bg-slate-800/50 p-1 rounded-xl backdrop-blur-sm"
export const TAB_BASE = "px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
export const TAB_ACTIVE = "bg-gradient-to-r from-pink-600/30 to-rose-600/30 text-pink-300 shadow-lg border border-pink-500/30"
export const TAB_INACTIVE = "text-gray-400 hover:bg-pink-500/10 hover:text-pink-300"


// COMPLETE TASK
export const SORT_OPTIONS = [
    { id: "newest", label: "Newest", icon: <ArrowDownNarrowWide className="w-3 h-3" /> },
    { id: "oldest", label: "Oldest", icon: <ArrowUpNarrowWide className="w-3 h-3" /> },
    { id: "priority", label: "Priority", icon: <Trophy className="w-3 h-3" /> },
]

// CSS class groups
export const CT_CLASSES = {
    page: "p-4 md:p-6 min-h-screen overflow-hidden bg-transparent",
    header: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-3 md:gap-4",
    titleWrapper: "flex-1 min-w-0",
    title: "text-xl md:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2 truncate",
    subtitle: "text-xs md:text-sm text-gray-400 mt-1 ml-7 md:ml-8 font-medium",
    sortContainer: "w-full md:w-auto mt-2 md:mt-0",
    sortBox: "flex items-center justify-between bg-slate-900/60 backdrop-blur-xl p-2 md:p-3 rounded-2xl shadow-2xl border border-pink-500/20 w-full md:w-auto",
    filterLabel: "flex items-center gap-2 text-pink-300 font-bold",
    select: "px-2 py-1 md:px-3 md:py-2 border border-pink-500/30 bg-slate-900/50 text-white rounded-xl focus:ring-2 focus:ring-pink-500 md:hidden text-xs md:text-sm backdrop-blur-sm",
    btnGroup: "hidden md:flex space-x-1 bg-slate-800/50 p-1 rounded-xl ml-2 md:ml-3 backdrop-blur-sm",
    btnBase: "px-2 py-1 md:px-3 md:py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1",
    btnActive: "bg-gradient-to-r from-pink-600/30 to-rose-600/30 text-pink-300 shadow-lg border border-pink-500/30",
    btnInactive: "text-gray-400 hover:text-pink-300 hover:bg-pink-500/10",
    list: "space-y-3 md:space-y-4",
    emptyState: "p-4 md:p-8 bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-500/20 text-center",
    emptyIconWrapper: "w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 backdrop-blur-sm",
    emptyTitle: "text-base md:text-lg font-bold text-white mb-2",
    emptyText: "text-xs md:text-sm text-gray-400",
}

// constants/cssClasses.js
export const layoutClasses = {
    container: "p-6 min-h-screen overflow-hidden bg-transparent",
    headerWrapper: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4",
    sortBox: "flex items-center justify-between bg-slate-900/60 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-pink-500/20 w-full md:w-auto",
    select: "px-3 py-2 border border-pink-500/30 bg-slate-900/50 text-white rounded-xl focus:ring-2 focus:ring-pink-500 md:hidden text-sm backdrop-blur-sm",
    tabWrapper: "hidden md:flex space-x-1 bg-slate-800/50 p-1 rounded-xl ml-3 backdrop-blur-sm",
    tabButton: (active) =>
        `px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${active
            ? "bg-gradient-to-r from-pink-600/30 to-rose-600/30 text-pink-300 shadow-lg border border-pink-500/30"
            : "text-gray-400 hover:text-pink-300 hover:bg-pink-500/10"
        }`,
    addBox: "hidden md:block p-5 border-2 border-dashed border-pink-500/30 rounded-2xl hover:border-pink-500/50 hover:bg-pink-500/5 transition-all cursor-pointer mb-6 bg-slate-900/40 backdrop-blur-sm group",
    emptyState: "p-8 bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-500/20 text-center",
    emptyIconBg: "w-16 h-16 bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm",
    emptyBtn: "px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30",
};


// TASK ITEM

// Menu options for task actions
export const MENU_OPTIONS = [
    { action: "edit", label: "Edit Task", icon: <Edit3 size={14} className="text-pink-400" /> },
    { action: "delete", label: "Delete Task", icon: <Trash size={14} className="text-rose-400" /> },
]

// CSS class groups for TaskItem
export const TI_CLASSES = {
    wrapper: "group p-4 sm:p-5 rounded-2xl shadow-2xl bg-slate-900/60 backdrop-blur-xl border-l-4 hover:shadow-pink-500/20 hover:scale-[1.01] transition-all duration-300 border border-pink-500/20",
    leftContainer: "flex items-start gap-2 sm:gap-3 flex-1 min-w-0",
    completeBtn: "mt-0.5 sm:mt-1 p-1 sm:p-1.5 rounded-full hover:bg-pink-500/20 transition-all duration-300",
    checkboxIconBase: "w-4 h-4 sm:w-5 sm:h-5",
    titleBase: "text-base sm:text-lg font-bold truncate text-white",
    priorityBadge: "text-xs px-2 py-0.5 rounded-full shrink-0 font-bold backdrop-blur-sm",
    description: "text-sm text-gray-400 mt-1 truncate",
    subtasksContainer: "mt-3 sm:mt-4 space-y-2 sm:space-y-3 bg-slate-800/50 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-pink-500/20",
    progressBarBg: "h-1.5 bg-slate-800 rounded-full overflow-hidden",
    progressBarFg: "h-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 transition-all duration-300 shadow-lg shadow-pink-500/50",
    rightContainer: "flex flex-col items-end gap-2 sm:gap-3",
    menuButton: "p-1 sm:p-1.5 hover:bg-pink-500/20 rounded-xl text-gray-400 hover:text-pink-300 transition-all duration-300",
    menuDropdown: "absolute right-0 mt-1 w-40 sm:w-48 bg-slate-900/95 backdrop-blur-xl border border-pink-500/30 rounded-2xl shadow-2xl shadow-pink-500/20 z-10 overflow-hidden animate-fadeIn",
    dateRow: "flex items-center gap-1.5 text-xs font-bold whitespace-nowrap text-pink-300",
    createdRow: "flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap",
}