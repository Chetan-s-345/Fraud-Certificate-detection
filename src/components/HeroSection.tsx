import { Shield, Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToUpload = () => {
    const element = document.getElementById("upload");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float delay-300" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Security</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-sora font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-fade-in-up delay-100">
            <span className="text-foreground">Detect Certificate</span>
            <br />
            <span className="gradient-text glow-text">Fraud Instantly</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Upload any certificate and let our advanced AI instantly verify its authenticity. 
            Protect yourself from fraudulent documents with one-second validation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
            <Button
              variant="hero"
              size="xl"
              onClick={scrollToUpload}
              className="group"
            >
              <Shield className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Upload Certificate
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            >
              See How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up delay-400">
            <div className="text-center">
              <div className="font-sora font-bold text-3xl md:text-4xl gradient-text mb-1">99.7%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="font-sora font-bold text-3xl md:text-4xl gradient-text mb-1">&lt;1s</div>
              <div className="text-sm text-muted-foreground">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="font-sora font-bold text-3xl md:text-4xl gradient-text mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Scans Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
