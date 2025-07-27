import { useEffect, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function FAQSection() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [section, setSection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFAQs() {
      setLoading(true);
      try {
        const db = getFirestore();
        const docRef = doc(db, "homepage", "faq");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFaqs(docSnap.data().faqs || []);
          setSection(docSnap.data());
        }
      } catch (e) {
        setError("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    }
    fetchFAQs();
  }, []);

  if (loading) return <div className="py-8 text-center text-gray-400">Loading FAQs...</div>;
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>;
  if (!faqs.length) return <div className="py-8 text-center text-gray-400">No FAQs found.</div>;

  return (
    <section className="max-w-3xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-2 text-center">{section?.title || "Frequently Asked Questions"}</h2>
      {section?.subtitle && <p className="text-lg text-gray-600 mb-6 text-center">{section.subtitle}</p>}
      <Accordion type="multiple">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.id || i} value={faq.id || String(i)}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
} 