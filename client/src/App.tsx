/** Public routing map. */
import { lazy, Suspense } from "react";
import { AnalyticsBridge } from "@/components/AnalyticsBridge";
import { MarketingConfig } from "@/components/MarketingConfig";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const ForBrokers = lazy(() => import("@/pages/ForBrokers"));
const ApprovalMethod = lazy(() => import("@/pages/ApprovalMethod"));
const Team = lazy(() => import("@/pages/Team"));
const Founder = lazy(() => import("@/pages/Founder"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const Learning = lazy(() => import("@/pages/Learning"));
const ArticlePage = lazy(() => import("@/pages/ArticlePage"));
const TopicHubPage = lazy(() => import("@/pages/TopicHubPage"));
const Locations = lazy(() => import("@/pages/Locations"));
const LocationPage = lazy(() => import("@/pages/LocationPage"));
const SolutionPage = lazy(() => import("@/pages/SolutionPage"));
const LoanTypes = lazy(() => import("@/pages/LoanTypes"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PlanYourMove = lazy(() => import("@/pages/ConversionPages").then((module) => ({ default: module.PlanYourMove })));
const BookCall = lazy(() => import("@/pages/ConversionPages").then((module) => ({ default: module.BookCall })));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const Calculators = lazy(() => import("@/pages/UtilityPages").then((module) => ({ default: module.Calculators })));
const InfoPage = lazy(() => import("@/pages/UtilityPages").then((module) => ({ default: module.InfoPage })));
const AdminOverview = lazy(() => import("@/pages/admin/AdminOverview"));
const AdminContent = lazy(() => import("@/pages/admin/AdminContent"));
const AdminBrokers = lazy(() => import("@/pages/admin/AdminBrokers"));
const AdminReviews = lazy(() => import("@/pages/admin/AdminReviews"));
const AdminAwards = lazy(() => import("@/pages/admin/AdminAwards"));
const AdminBlocks = lazy(() => import("@/pages/admin/AdminBlocks"));
const AdminMedia = lazy(() => import("@/pages/admin/AdminMedia"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const AdminExport = lazy(() => import("@/pages/admin/AdminExport"));
const ImportantInformation = () => <InfoPage page="important-information" />;
const Privacy = () => <InfoPage page="privacy" />;
const CreditGuide = () => <InfoPage page="credit-guide" />;
const Accessibility = () => <InfoPage page="accessibility" />;

function RouteLoading(){return <div aria-live="polite" className="grid min-h-[100svh] place-items-center bg-white px-6 text-[#16203A]" role="status"><div className="text-center"><img alt="Next Move Loans" className="mx-auto h-auto w-[210px]" src="/brand/next-move-loans.svg"/><div aria-hidden="true" className="mx-auto mt-5 h-0.5 w-24 overflow-hidden bg-[#16203A]/12"><span className="block h-full w-1/2 animate-pulse bg-[#EC7354]"/></div></div></div>}
function Router(){return <Suspense fallback={<RouteLoading/>}><Switch>
<Route path="/admin/content" component={AdminContent}/><Route path="/admin/brokers" component={AdminBrokers}/><Route path="/admin/reviews" component={AdminReviews}/><Route path="/admin/awards" component={AdminAwards}/><Route path="/admin/blocks" component={AdminBlocks}/><Route path="/admin/media" component={AdminMedia}/><Route path="/admin/settings" component={AdminSettings}/><Route path="/admin/leads" component={AdminLeads}/><Route path="/admin/export" component={AdminExport}/><Route path="/admin" component={AdminOverview}/>
<Route path="/" component={Home}/><Route path="/game-plan" component={ApprovalMethod}/><Route path="/approval-method" component={ApprovalMethod}/><Route path="/about" component={About}/><Route path="/for-brokers" component={ForBrokers}/><Route path="/reviews" component={Home}/><Route path="/team/martin-reidy" component={Founder}/><Route path="/team" component={Team}/><Route path="/contact-us" component={ContactUs}/><Route path="/contact" component={ContactUs}/><Route path="/plan-your-next-move" component={PlanYourMove}/><Route path="/book-a-call" component={BookCall}/><Route path="/solutions/:slug" component={SolutionPage}/><Route path="/loan-types" component={LoanTypes}/><Route path="/finance/:category" component={CategoryPage}/><Route path="/services/:slug" component={ServicePage}/><Route path="/learn" component={Learning}/><Route path="/learn/topics/:slug" component={TopicHubPage}/><Route path="/learn/:slug" component={ArticlePage}/><Route path="/locations" component={Locations}/><Route path="/locations/:slug" component={LocationPage}/><Route path="/calculators" component={Calculators}/><Route path="/important-information" component={ImportantInformation}/><Route path="/privacy" component={Privacy}/><Route path="/credit-guide" component={CreditGuide}/><Route path="/accessibility" component={Accessibility}/><Route path="/404" component={NotFound}/><Route component={NotFound}/>
</Switch></Suspense>}
function App(){return <ErrorBoundary><AnalyticsBridge/><MarketingConfig/><Router/></ErrorBoundary>}
export default App;
