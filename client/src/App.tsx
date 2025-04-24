import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Pages
import Home from "@/pages/Home";
import Apartments from "@/pages/Apartments";
import About from "@/pages/About";
import Visit from "@/pages/Visit";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/apartments" component={Apartments} />
          <Route path="/about" component={About} />
          <Route path="/visit" component={Visit} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
