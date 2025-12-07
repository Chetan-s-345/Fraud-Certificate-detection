import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ResultsSection from "@/components/ResultsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import DemoSection from "@/components/DemoSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

interface AnalysisResult {
  isAuthentic: boolean;
  confidence: number;
  issues: string[];
  checks: {
    name: string;
    passed: boolean;
    detail: string;
  }[];
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const simulateAnalysis = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setFileName(file.name);

    // Create preview if image
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate random result (for demo purposes)
    const isAuthentic = Math.random() > 0.4;
    const confidence = isAuthentic 
      ? Math.floor(Math.random() * 15) + 85 
      : Math.floor(Math.random() * 40) + 15;

    const mockResult: AnalysisResult = {
      isAuthentic,
      confidence,
      issues: isAuthentic ? [] : [
        "Digital watermark appears to be artificially added",
        "Font inconsistencies detected in certificate text",
        "Seal resolution suggests possible digital manipulation",
        "Layout margins do not match official template",
      ].slice(0, Math.floor(Math.random() * 3) + 2),
      checks: [
        {
          name: "Template Verification",
          passed: isAuthentic || Math.random() > 0.5,
          detail: isAuthentic ? "Matches known templates" : "Template mismatch detected",
        },
        {
          name: "Seal Authentication",
          passed: isAuthentic || Math.random() > 0.6,
          detail: isAuthentic ? "Official seal verified" : "Seal irregularities found",
        },
        {
          name: "Text Integrity",
          passed: isAuthentic || Math.random() > 0.4,
          detail: isAuthentic ? "Text fonts consistent" : "Font alterations detected",
        },
        {
          name: "Layout Analysis",
          passed: isAuthentic || Math.random() > 0.5,
          detail: isAuthentic ? "Layout structure valid" : "Layout tampering signs",
        },
        {
          name: "Digital Signature",
          passed: isAuthentic,
          detail: isAuthentic ? "Signature verified" : "No valid signature found",
        },
      ],
    };

    setResult(mockResult);
    setIsAnalyzing(false);

    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setFilePreview(null);
    setFileName(null);
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <UploadSection onAnalyze={simulateAnalysis} isAnalyzing={isAnalyzing} />
        {result && (
          <ResultsSection
            result={result}
            filePreview={filePreview}
            fileName={fileName}
            onReset={handleReset}
          />
        )}
        <HowItWorksSection />
        <FeaturesSection />
        <DemoSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
