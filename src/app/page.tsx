import Header from "./components/Header";
import QuickAccess from "./components/QuickAccess";
import UserRegistration from "./components/UserRegistration";
import AIFeatures from "./components/AIFeatures";
import TechnologyStack from "./components/TechnologyStack";
import Features from "./components/Features";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Header />
        <QuickAccess />
        <UserRegistration />
        <AIFeatures />
        <TechnologyStack />
        <Features />
        <Contact />
      </div>
    </div>
  );
}
