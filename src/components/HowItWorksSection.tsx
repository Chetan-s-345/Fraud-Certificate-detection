import { Upload, Cpu, ShieldCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Certificate",
    description: "Drag and drop or select any certificate image or PDF. Our system accepts all major formats.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our AI examines templates, seals, signatures, text authenticity, and layout integrity.",
  },
  {
    icon: ShieldCheck,
    title: "Instant Results",
    description: "Get a detailed authenticity report with confidence scores and detected issues in under a second.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-sora font-bold text-3xl md:text-5xl mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to verify any certificate's authenticity using advanced AI technology.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="glass-card-hover p-8 rounded-2xl text-center h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center text-sm font-bold shadow-glow-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative inline-flex mb-6 mt-4">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -inset-2 bg-primary/10 rounded-3xl blur-xl opacity-50" />
                  </div>

                  {/* Content */}
                  <h3 className="font-sora font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4 md:hidden">
                    <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
