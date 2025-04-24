import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Is this tool safe to use with my Facebook account?",
    answer: "Yes, this tool is completely safe. We don't store your credentials or personal data. All operations are performed securely through Facebook's official API, and your information is processed locally on your device."
  },
  {
    question: "How does the Profile Picture Guard work?",
    answer: "The Profile Picture Guard activates Facebook's built-in protection feature that prevents others from downloading, sharing, or taking screenshots of your profile picture. It also adds a blue shield icon to your profile picture to indicate it's protected."
  },
  {
    question: "What are tokens and why do I need them?",
    answer: "Access tokens are secure credentials that allow our tool to make API requests to Facebook on your behalf. They're required to activate the Profile Guard feature programmatically without requiring you to navigate through Facebook's settings manually."
  },
  {
    question: "Can I disable the Profile Guard later?",
    answer: "Yes, you can disable the Profile Guard at any time through your Facebook settings. Go to your profile picture, click on the options menu, and select 'Turn off Profile Picture Guard' from the dropdown menu."
  },
  {
    question: "Does this tool work on mobile devices?",
    answer: "Yes, our tool is fully responsive and works on all devices including smartphones and tablets. You can activate the Profile Guard from any device with a web browser and internet connection."
  }
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div key={index} className="bg-dark-800/60 backdrop-blur-md rounded-xl border border-primary/30 overflow-hidden">
          <button 
            className="flex justify-between items-center w-full p-5 text-left" 
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="font-semibold">{item.question}</h3>
            <div className="text-primary text-xl transition-transform">
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </div>
          </button>
          
          <div className={`px-5 pb-5 ${openIndex === index ? 'block' : 'hidden'}`}>
            <p className="text-gray-400 text-sm">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
