export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  url: string;
  color: string;
  icon: string;
}

export const products: Product[] = [
  { id: 'intakeai', name: 'IntakeAI', tagline: 'Client intake forms made effortless', description: 'AI-powered client intake questionnaire generator', category: 'Freelancer Workflow', url: 'https://intakeai-seven.vercel.app', color: '#6366f1', icon: '📋' },
  { id: 'leadqualifierai', name: 'LeadQualifierAI', tagline: 'Turn leads into qualified prospects', description: 'AI-powered lead qualification and scoring', category: 'Freelancer Workflow', url: 'https://leadqualifierai.vercel.app', color: '#8b5cf6', icon: '🎯' },
  { id: 'proposalai', name: 'ProposalAI', tagline: 'Win more deals with AI proposals', description: 'Generate compelling business proposals in seconds', category: 'Freelancer Workflow', url: 'https://proposalai-eta.vercel.app', color: '#ec4899', icon: '📄' },
  { id: 'proposalwriterai', name: 'ProposalWriterAI', tagline: 'Professional proposals, zero effort', description: 'AI-powered proposal writing for consultants', category: 'Freelancer Workflow', url: 'https://proposalwriterai.vercel.app', color: '#f43f5e', icon: '✍️' },
  { id: 'contractlens', name: 'ContractLens', tagline: 'Understand any contract in seconds', description: 'AI-powered contract analysis with Stripe billing', category: 'Freelancer Workflow', url: 'https://contractlens-steel.vercel.app', color: '#3b82f6', icon: '🔍' },
  { id: 'projecttrackerai', name: 'ProjectTrackerAI', tagline: 'Track projects like a pro', description: 'AI-powered project tracking and management', category: 'Freelancer Workflow', url: 'https://projecttrackerai.vercel.app', color: '#14b8a6', icon: '📊' },
  { id: 'invoiceai', name: 'InvoiceAI', tagline: 'Create invoices that get paid faster', description: 'AI-powered invoice generator for freelancers', category: 'Freelancer Workflow', url: 'https://invoiceai-ruddy.vercel.app', color: '#f97316', icon: '💰' },
  { id: 'clientportalai', name: 'ClientPortalAI', tagline: 'Give clients their own dashboard', description: 'White-label client portal generator', category: 'Freelancer Workflow', url: 'https://clientportalai.vercel.app', color: '#06b6d4', icon: '🗂️' },
  { id: 'followupai', name: 'FollowUpAI', tagline: 'Never miss a follow-up again', description: 'AI-powered follow-up sequence generator', category: 'Freelancer Workflow', url: 'https://followupai-sigma.vercel.app', color: '#a855f7', icon: '📧' },
  { id: 'crmliteai', name: 'CRMliteAI', tagline: 'Simple CRM without the complexity', description: 'AI-powered lightweight CRM for freelancers', category: 'Freelancer Workflow', url: 'https://crmliteai.vercel.app', color: '#84cc16', icon: '🔗' },
  { id: 'reportai', name: 'ReportAI', tagline: 'Generate client reports instantly', description: 'AI-powered report generation for agencies', category: 'Freelancer Workflow', url: 'https://reportai-psi.vercel.app', color: '#10b981', icon: '📈' },
  { id: 'jobai', name: 'JobAI', tagline: 'Job descriptions that attract top talent', description: 'AI-powered job description generator', category: 'Standalone Tools', url: 'https://jobai-chi.vercel.app', color: '#0ea5e9', icon: '💼' },
  { id: 'leadai', name: 'LeadAI', tagline: 'Find and qualify leads automatically', description: 'AI-powered lead generation and research', category: 'Standalone Tools', url: 'https://leadai-new.vercel.app', color: '#8b5cf6', icon: '🎣' },
  { id: 'listingai', name: 'ListingAI', tagline: 'Real estate listings that sell', description: 'AI-powered real estate listing generator', category: 'Standalone Tools', url: 'https://listingai-ten.vercel.app', color: '#22c55e', icon: '🏠' },
  { id: 'aireceptionist', name: 'AI Receptionist', tagline: 'Your 24/7 virtual phone receptionist', description: 'AI-powered phone receptionist with TTS', category: 'Standalone Tools', url: 'https://aireceptionist-chi.vercel.app', color: '#f59e0b', icon: '📞' },
  { id: 'reviewai', name: 'ReviewAI', tagline: 'Monitor and analyze reviews', description: 'AI-powered review monitoring and analysis', category: 'Standalone Tools', url: 'https://reviewai.vercel.app', color: '#ef4444', icon: '⭐' },
  { id: 'portfolioai', name: 'PortfolioAI', tagline: 'Stunning portfolios in seconds', description: 'AI-powered portfolio website generator', category: 'Standalone Tools', url: 'https://portfolioai-one.vercel.app', color: '#6366f1', icon: '🖼️' },
  { id: 'timetrackerai', name: 'TimeTrackerAI', tagline: 'Track time without the hassle', description: 'AI-powered time tracking for professionals', category: 'Standalone Tools', url: 'https://timetrackerai.vercel.app', color: '#14b8a6', icon: '⏱️' },
  { id: 'knowledgebaseai', name: 'KnowledgeBaseAI', tagline: 'Build a knowledge base instantly', description: 'AI-powered knowledge base generator', category: 'Standalone Tools', url: 'https://knowledgebaseai.vercel.app', color: '#a855f7', icon: '🧠' },
  { id: 'supportdeskai', name: 'SupportDeskAI', tagline: 'Customer support made simple', description: 'AI-powered support ticket management', category: 'Standalone Tools', url: 'https://supportdeskai-three.vercel.app', color: '#3b82f6', icon: '🎧' },
  { id: 'screenshotai', name: 'ScreenshotAI', tagline: 'Beautiful screenshots for your products', description: 'AI-powered screenshot generator with frames', category: 'Standalone Tools', url: 'https://screenshotai-pied.vercel.app', color: '#f97316', icon: '📸' },
  { id: 'landingpageai', name: 'LandingPageAI', tagline: 'Landing pages that convert', description: 'AI-powered landing page generator', category: 'Standalone Tools', url: 'https://landingpageai-topaz.vercel.app', color: '#ec4899', icon: '🚀' },
  { id: 'qrcodeai', name: 'QRCodeAI', tagline: 'Beautiful QR codes that work', description: 'AI-powered QR code generator with analytics', category: 'Standalone Tools', url: 'https://qrcodeai-six.vercel.app', color: '#1e40af', icon: '▦' },
  { id: 'mediakitai', name: 'MediaKitAI', tagline: 'Professional media kits in seconds', description: 'AI-powered media kit generator', category: 'Standalone Tools', url: 'https://mediakitai.vercel.app', color: '#db2777', icon: '🎨' },
  { id: 'adcopyai', name: 'AdCopyAI', tagline: 'High-converting ad copy in seconds', description: 'AI-powered Google & Facebook ad generator', category: 'Content & Copy', url: 'https://adcopyai-lac.vercel.app', color: '#e11d48', icon: '📢' },
  { id: 'admissionai', name: 'AdmissionAI', tagline: 'College essays that get you in', description: 'AI-powered college admission essay writer', category: 'Content & Copy', url: 'https://admissionai-swart.vercel.app', color: '#7c3aed', icon: '🎓' },
  { id: 'beautyai', name: 'BeautyAI', tagline: 'Salon marketing that works', description: 'AI-powered beauty service description generator', category: 'Content & Copy', url: 'https://beautyai-nine.vercel.app', color: '#db2777', icon: '💅' },
  { id: 'coverletterai', name: 'CoverLetterAI', tagline: 'Cover letters that get callbacks', description: 'AI-powered cover letter generator', category: 'Content & Copy', url: 'https://coverletterai.vercel.app', color: '#f43f5e', icon: '✉️' },
  { id: 'emailai', name: 'EmailAI', tagline: 'Cold emails that actually convert', description: 'AI-powered cold email sequence generator', category: 'Content & Copy', url: 'https://emailai.vercel.app', color: '#3b82f6', icon: '📬' },
  { id: 'courseai', name: 'CourseAI', tagline: 'Online course descriptions that sell', description: 'AI-powered course description generator', category: 'Content & Copy', url: 'https://courseai-ten.vercel.app', color: '#8b5cf6', icon: '📚' },
  { id: 'menuai', name: 'MenuAI', tagline: 'Restaurant menus that impress', description: 'AI-powered restaurant menu generator', category: 'Content & Copy', url: 'https://menuai-peach.vercel.app', color: '#f97316', icon: '🍽️' },
  { id: 'rentalai', name: 'RentalAI', tagline: 'Rental listings that fill fast', description: 'AI-powered rental listing generator', category: 'Content & Copy', url: 'https://rentalai-tau.vercel.app', color: '#14b8a6', icon: '🏘️' },
  { id: 'reviewresponseai', name: 'ReviewResponseAI', tagline: 'Respond to reviews professionally', description: 'AI-powered review response generator', category: 'Content & Copy', url: 'https://reviewresponseai.vercel.app', color: '#eab308', icon: '💬' },
  { id: 'serviceai', name: 'ServiceAI', tagline: 'Home service descriptions that convert', description: 'AI-powered home service description generator', category: 'Content & Copy', url: 'https://serviceai-nine.vercel.app', color: '#22c55e', icon: '🔧' },
  { id: 'thankyouai', name: 'ThankYouAI', tagline: 'Heartfelt thank you notes instantly', description: 'AI-powered thank you letter generator', category: 'Content & Copy', url: 'https://thankyouai.vercel.app', color: '#f472b6', icon: '💌' },
  { id: 'petai', name: 'PetAI', tagline: 'Pet adoption profiles that find homes', description: 'AI-powered pet adoption profile generator', category: 'Content & Copy', url: 'https://petai-two.vercel.app', color: '#fb923c', icon: '🐾' },
  { id: 'competitorai', name: 'CompetitorAI', tagline: 'Know your competition inside out', description: 'AI-powered competitor analysis generator', category: 'Content & Copy', url: 'https://competitorai.vercel.app', color: '#a3e635', icon: '🔬' },
];

export const categories = [...new Set(products.map(p => p.category))];
