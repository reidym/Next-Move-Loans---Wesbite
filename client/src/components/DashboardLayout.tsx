import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { startLogin } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import { assets } from "@/lib/siteData";
import {
  Award,
  Blocks,
  Download,
  ExternalLink,
  FileText,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  PanelLeft,
  Settings,
  Users,
} from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: FileText, label: "Content", path: "/admin/content" },
  { icon: Users, label: "Brokers", path: "/admin/brokers" },
  { icon: MessageSquareQuote, label: "Reviews", path: "/admin/reviews" },
  { icon: Award, label: "Awards", path: "/admin/awards" },
  { icon: Blocks, label: "Reusable blocks", path: "/admin/blocks" },
  { icon: Image, label: "Media", path: "/admin/media" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
  { icon: Inbox, label: "Leads", path: "/admin/leads" },
  { icon: Download, label: "Export", path: "/admin/export" },
];

const SIDEBAR_WIDTH_KEY = "next-move-cms-sidebar-width";
const DEFAULT_WIDTH = 272;
const MIN_WIDTH = 224;
const MAX_WIDTH = 380;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? Number.parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();

  useEffect(() => {
    const previousTitle = document.title;
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]') ?? document.head.appendChild(document.createElement("meta"));
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]') ?? document.head.appendChild(document.createElement("meta"));
    const previousRobots = robots.getAttribute("content");
    const previousDescription = description.getAttribute("content");
    robots.setAttribute("name", "robots"); robots.setAttribute("content", "noindex, nofollow");
    description.setAttribute("name", "description"); description.setAttribute("content", "Secure Next Move Loans content-management area for approved administrators.");
    document.title = "Next Move CMS | Secure Admin";
    return () => {
      document.title = previousTitle;
      if (previousRobots) robots.setAttribute("content", previousRobots); else robots.remove();
      if (previousDescription) description.setAttribute("content", previousDescription); else description.remove();
    };
  }, []);

  useEffect(() => localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidth)), [sidebarWidth]);

  if (loading) return <DashboardLayoutSkeleton />;
  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#F7F5F1] p-6 text-[#16203A]">
        <div className="w-full max-w-md border-t-4 border-[#EC7354] bg-white p-8 shadow-xl">
          <img alt="Next Move Loans" className="h-auto w-48" src={assets.logo} />
          <h1 className="mt-8 text-3xl font-extrabold tracking-[-0.04em]">Sign in to the CMS.</h1>
          <p className="mt-3 leading-7 text-[#4C5566]">Only approved Next Move Loans administrators can manage website content, proof, settings and leads.</p>
          <Button className="mt-7 w-full bg-[#16203A] text-white hover:bg-[#263453]" onClick={() => startLogin()} size="lg">Sign in securely</Button>
          <Link className="mt-5 inline-flex text-sm font-bold underline decoration-[#EC7354] underline-offset-4" href="/">Return to the website</Link>
        </div>
      </div>
    );
  }
  if (user.role !== "admin") {
    return (
      <div className="grid min-h-screen place-items-center bg-[#F7F5F1] p-6 text-[#16203A]">
        <div className="w-full max-w-lg border-t-4 border-[#EC7354] bg-white p-8 shadow-xl"><p className="text-xs font-black uppercase tracking-[0.16em] text-[#9A6F00]">Access restricted</p><h1 className="mt-4 text-4xl font-extrabold tracking-[-0.05em]">Administrator permission is required.</h1><p className="mt-4 leading-7 text-[#4C5566]">You are signed in, but this account is not permitted to change the public website.</p><Link className="mt-7 inline-flex font-bold underline decoration-[#EC7354] underline-offset-4" href="/">Return to the website</Link></div>
      </div>
    );
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}>
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}

function DashboardLayoutContent({ children, setSidebarWidth }: { children: React.ReactNode; setSidebarWidth: (width: number) => void }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeMenuItem = menuItems.find(item => item.path === "/admin" ? location === "/admin" : location.startsWith(item.path));
  const isMobile = useIsMobile();

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (!isResizing || isCollapsed) return;
      const left = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const width = event.clientX - left;
      if (width >= MIN_WIDTH && width <= MAX_WIDTH) setSidebarWidth(width);
    };
    const stop = () => setIsResizing(false);
    if (isResizing) {
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", stop);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isCollapsed, isResizing, setSidebarWidth]);

  return (
    <div className="admin-shell contents">
      <div className="relative" ref={sidebarRef}>
        <Sidebar className="border-r border-[#16203A]/10" collapsible="icon" disableTransition={isResizing}>
          <SidebarHeader className="min-h-20 justify-center border-b border-[#16203A]/10">
            <div className="flex w-full items-center gap-3 px-2">
              <button aria-label="Toggle navigation" className="grid size-9 shrink-0 place-items-center border border-[#16203A]/12 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EC7354]" onClick={toggleSidebar}><PanelLeft className="size-4" /></button>
              {!isCollapsed ? <div className="min-w-0"><img alt="Next Move Loans" className="h-auto w-32" src={assets.logo} /><p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#9A6F00]">Secure CMS</p></div> : null}
            </div>
          </SidebarHeader>
          <SidebarContent className="gap-0 py-3">
            <SidebarMenu className="px-2">
              {menuItems.map(item => {
                const active = item.path === "/admin" ? location === "/admin" : location.startsWith(item.path);
                return <SidebarMenuItem key={item.path}><SidebarMenuButton className="h-10 font-semibold" isActive={active} onClick={() => setLocation(item.path)} tooltip={item.label}><item.icon className={active ? "text-[#EC7354]" : ""} /><span>{item.label}</span></SidebarMenuButton></SidebarMenuItem>;
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-[#16203A]/10 p-3">
            {!isCollapsed ? <Link className="mb-3 flex items-center gap-2 px-2 text-xs font-bold text-[#4C5566] hover:text-[#EC7354]" href="/"><ExternalLink className="size-3.5" /> View public website</Link> : null}
            <DropdownMenu>
              <DropdownMenuTrigger asChild><button className="flex w-full items-center gap-3 px-1 py-1 text-left hover:bg-[#EFEAE2]"><Avatar className="size-9 shrink-0 border"><AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "A"}</AvatarFallback></Avatar>{!isCollapsed ? <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{user?.name || "Administrator"}</p><p className="mt-1 truncate text-xs text-muted-foreground">{user?.email || "Admin account"}</p></div> : null}</button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48"><DropdownMenuItem className="cursor-pointer text-destructive" onClick={logout}><LogOut className="mr-2 size-4" /> Sign out</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        {!isCollapsed ? <button aria-label="Resize sidebar" className="absolute right-0 top-0 z-50 h-full w-1 cursor-col-resize hover:bg-[#EC7354]/30" onMouseDown={() => setIsResizing(true)} /> : null}
      </div>
      <SidebarInset className="bg-[#F7F5F1]">
        {isMobile ? <div className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-white/95 px-3 backdrop-blur"><SidebarTrigger className="size-9" /><span className="font-bold">{activeMenuItem?.label ?? "Next Move CMS"}</span></div> : null}
        <main className="min-h-screen p-4 md:p-7">{children}</main>
      </SidebarInset>
    </div>
  );
}
