import { 
  Fingerprint, 
  Stamp, 
  FileSearch, 
  LayoutGrid, 
  Zap, 
  Lock 
} from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Template Matching",
    description: "Compares against thousands of known certificate templates to detect inconsistencies.",
  },
  {
    icon: Stamp,
    title: "Seal & Signature Verification",
    description: "Analyzes seals, stamps, and signatures for authenticity markers and irregularities.",
  },
  {
    icon: FileSearch,
    title: "OCR Text Extraction",
    description: "Extracts and validates all text content, checking for font mismatches and alterations.",
  },
  {
    icon: LayoutGrid,
    title: "Layout Analysis",
    description: "Detects tampering by analyzing document layout, margins, and structural integrity.",
  },
  {
    icon: Zap,
    title: "One-Second Validation",
    description: "Get instant results with our optimized AI pipeline, processing in under a second.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your documents are analyzed in real-time and never stored on our servers.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            Powerful Technology
          </span>
          <h2 className="font-sora font-bold text-3xl md:text-5xl mb-4">
            Advanced <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our multi-layered AI approach ensures comprehensive certificate analysis.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card-hover p-6 rounded-2xl group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sora font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
