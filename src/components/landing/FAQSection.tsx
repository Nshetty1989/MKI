import { Search, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const faqGroups = [
  {
    title: "Getting Started",
    icon: "🚀",
    questions: [
      {
        question: "How do I get started with MyKingdom?",
        answer: "Getting started with MyKingdom is simple! Just register your properties, and our AI will guide you through the setup process. The entire onboarding takes less than 5 minutes."
      },
      {
        question: "What makes MyKingdom different?",
        answer: "MyKingdom combines advanced AI with an approved landlord, predictive maintenance capabilities, and ultra-flexible management options. Our platform offers a unique blend of automation and personalization that sets us apart."
      },
      {
        question: "Can I try MyKingdom before committing?",
        answer: "Yes! We offer a 30-day free trial with full access to all features. No credit card required to start."
      }
    ]
  },
  {
    title: "Features & Support",
    icon: "💡",
    questions: [
      {
        question: "What features are included in the basic plan?",
        answer: "Our basic plan includes property listing management, tenant screening, maintenance tracking, and basic financial reporting."
      },
      {
        question: "How can I contact support?",
        answer: "Our support team is available 24/7 via live chat, email, or phone. Premium users get priority support access."
      }
    ]
  },
  {
    title: "Security & Privacy",
    icon: "🔒",
    questions: [
      {
        question: "How secure is my data?",
        answer: "We use bank-level encryption and follow strict data protection protocols. Your data is stored in secure cloud servers with regular backups."
      },
      {
        question: "Who has access to my property information?",
        answer: "Only you and your authorized team members can access your property information. We never share your data with third parties."
      }
    ]
  },
  {
    title: "Pricing & Billing",
    icon: "💰",
    questions: [
      {
        question: "What are the pricing plans?",
        answer: "We offer flexible pricing plans based on the number of properties you manage. Contact our sales team for a customized quote."
      },
      {
        question: "Is there a contract commitment?",
        answer: "No long-term contracts required. You can upgrade, downgrade, or cancel your subscription at any time."
      }
    ]
  },
  {
    title: "Technical & Integration",
    icon: "⚙️",
    questions: [
      {
        question: "Can I integrate with my existing software?",
        answer: "Yes, MyKingdom offers API integration with popular property management and accounting software."
      },
      {
        question: "What devices can I use MyKingdom on?",
        answer: "MyKingdom works on any device with a web browser. We also have native apps for iOS and Android."
      }
    ]
  }
];

export const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroup, setExpandedGroup] = useState<string | null>("Getting Started");

  const filteredGroups = faqGroups.map(group => ({
    ...group,
    questions: group.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.questions.length > 0);

  return (
    <section className="py-24 bg-gradient-to-b from-[#001B3D] to-[#00264F] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-blue-100/80">
            Everything you need to know about MyKingdom
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300/50" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-blue-900/20 border border-blue-500/20 rounded-lg text-white placeholder:text-blue-300/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        {/* FAQ Groups */}
        <div className="grid gap-4">
          {filteredGroups.map((group) => (
            <div
              key={group.title}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-blue-900/40 backdrop-blur-xl border border-blue-500/20 rounded-lg overflow-hidden">
                {/* Group Header */}
                <button
                  onClick={() => setExpandedGroup(expandedGroup === group.title ? null : group.title)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{group.icon}</span>
                    <span className="text-xl font-semibold text-white">{group.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-300 transition-transform duration-200 ${
                      expandedGroup === group.title ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Questions Accordion */}
                {expandedGroup === group.title && (
                  <div className="px-6 pb-6">
                    <Accordion type="single" collapsible>
                      {group.questions.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className="border-b border-blue-500/20 last:border-0"
                        >
                          <AccordionTrigger className="text-blue-100 hover:text-blue-50 py-4">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-blue-200/80">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Added CTA Button */}
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => window.location.href = '/login'} 
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
            <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};