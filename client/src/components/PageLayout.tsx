
import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/95 to-muted/30">
      <Navbar />
      <main className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        {children}
      </main>
      <footer className="border-t py-6 mt-auto">
        <div className="container max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            TaskMaster © {new Date().getFullYear()}
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
