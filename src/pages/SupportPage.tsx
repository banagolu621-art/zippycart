import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, HelpCircle, ChevronRight, MessageSquare, PhoneCall,
  AlertCircle, RefreshCw, Clock, PackageX
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const issueCategories = [
    { title: 'Order Issue', icon: AlertCircle, color: 'bg-red-50 text-red-600 border-red-200' },
    { title: 'Payment Issue', icon: RefreshCw, color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { title: 'Missing Product', icon: PackageX, color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { title: 'Wrong Product', icon: HelpCircle, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { title: 'Late Delivery', icon: Clock, color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { title: 'Refund Status', icon: RefreshCw, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
  ];

  const faqs = [
    {
      q: 'How fast is ZippyCart delivery in Kota?',
      a: 'We partner directly with neighbourhood stores in Kota (Talwandi, Dadabari, Vigyan Nagar, Gumanpura) to deliver your groceries in 15 to 25 minutes.'
    },
    {
      q: 'What is the minimum order for free delivery?',
      a: 'Free delivery is unlocked automatically on all orders above ₹250. For smaller orders, a nominal delivery fee of ₹15 applies.'
    },
    {
      q: 'What if a product in my order is damaged or expired?',
      a: 'We offer a 100% no-questions-asked refund or instant replacement within 30 minutes of delivery. Select "Missing or Damaged Product" above.'
    },
    {
      q: 'Can I cancel my order after placing it?',
      a: 'You can cancel your order free of charge until the store starts packing it (usually within 2 minutes of placing the order).'
    }
  ];

  const handleIssueClick = (title: string) => {
    showToast(`Support agent connecting for: ${title}...`, 'info');
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-emerald-900 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/profile')} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-extrabold text-white flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-300" />
            <span>Help & Support</span>
          </h1>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-emerald-950 text-white p-5 text-center border-b border-emerald-800">
        <h2 className="text-base font-black">How can we help you today?</h2>
        <p className="text-xs text-emerald-200 mt-1">24x7 Hyperlocal Support in Kota</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Issue Categories Grid */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
            Select Your Query Type
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {issueCategories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.title}
                  onClick={() => handleIssueClick(cat.title)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all hover:scale-[1.02] shadow-2xs ${cat.color}`}
                >
                  <Icon className="w-5 h-5 mb-2" />
                  <span className="text-xs font-extrabold text-slate-900">{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
            Frequently Asked Questions
          </h3>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="p-3.5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs text-slate-900 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-90 text-emerald-700' : ''}`} />
                  </button>

                  {isOpen && (
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 animate-fade-in">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Support Options */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Still need assistance?
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Starting live chat with Kota support...', 'success')}
              className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Live Chat</span>
            </button>

            <button
              onClick={() => showToast('Dialling Kota Helpline: +91 744 2400500...', 'info')}
              className="py-2.5 px-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
