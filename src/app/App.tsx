import type {ReactNode} from 'react';
import {Badge,ButtonLink,Card,Eyebrow,MotionToggle,Navbar,Section,ThemeProvider} from '../design-system';
import './portfolio.css';

type Project={
  number:string;
  category:string;
  title:string;
  description:string;
  tags:string[];
  tone:'azure'|'teal'|'violet';
  href:string;
  image?:string;
  imageAlt?:string;
  preview?:ReactNode;
  extraLink?:{href:string;label:string};
};

function BrowserFrame({address,children}:{address:string;children:ReactNode}){
  return <div className="mini-browser" aria-hidden="true"><div className="mini-browser-bar"><i/><i/><i/><span>{address}</span></div><div className="mini-browser-body">{children}</div></div>;
}

function ScreenplayPreview(){
  return <BrowserFrame address="scenecraft.local / generate"><div className="mini-top"><strong>SCENE<span>CRAFT</span></strong><small>Library　 Docs　 Profile</small></div><div className="mini-columns"><div className="mini-form"><small>CREATE A SCENE</small><b>Choose a genre</b><div className="mini-pills"><em>Drama</em><em>Horror</em><em>Sci-Fi</em><em>Comedy</em></div><small>SCENE PROMPT</small><div className="mini-input">A tense opening in a remote station…</div><strong className="mini-button">Generate scene ↗</strong></div><div className="mini-output"><small>GENERATED SCENE · SCI-FI</small>{Array.from({length:7},(_,i)=><span className={i%3===2?'short':''} key={i}/>)}</div></div></BrowserFrame>;
}

function VisionPreview(){
  return <BrowserFrame address="visionlab.local / inference"><div className="mini-top"><strong>VISION<span>LAB</span></strong><small>Detection　 Evaluation</small></div><div className="mini-columns vision-columns"><div className="scan-image"><span className="detection-box"/><b>POLYP · 0.94</b></div><div className="vision-meta"><small>PREDICTION</small><strong>Polyp</strong><span>Confidence　0.94</span><small>MODEL</small><strong>Faster R-CNN</strong><span>ResNet-50 + FPN</span></div></div></BrowserFrame>;
}

function ChatPreview(){
  return <BrowserFrame address="openchat.local / conversation"><div className="mini-top"><strong>open<span>chat</span></strong><small>History　 New chat</small></div><div className="mini-columns chat-columns"><aside><small>+ New chat</small><div>Ideas for a weekend trip</div><div>Explain neural networks</div></aside><div className="mini-chat"><strong>How can I help?</strong><p className="question">Explain RAG in simple terms.</p><p>RAG gives a language model useful information before it answers…</p><div className="mini-input">Message your assistant…</div></div></div></BrowserFrame>;
}

const projects:Project[]=[
  {number:'01',category:'Generative AI · Fine-tuning',title:'Genre-conditioned screenplay generation',description:'Fine-tuned four genre-specific LoRA adapters for Llama 3.2 and built a FastAPI demo for screenplay scenes. The project reports 27–43% lower perplexity than the base model across genres.',tags:['QLoRA','Unsloth','Transformers','FastAPI'],tone:'violet',href:'https://github.com/SatyaMoulika/genre-screenplay-lora',extraLink:{href:'https://huggingface.co/SatyaMoulika',label:'Models & datasets ↗'},preview:<ScreenplayPreview/>},
  {number:'02',category:'LLM applications · RAG',title:'Enterprise knowledge assistant',description:'A workspace-scoped assistant for text and PDF documents. It retrieves relevant passages and returns answers with source excerpts using a local inference stack.',tags:['Python','FastAPI','PostgreSQL','Ollama'],tone:'teal',href:'https://github.com/SatyaMoulika/Enterprise-RAG-System',image:'/portfolio/enterprise-knowledge-assistant.svg',imageAlt:'Enterprise knowledge assistant home page with document workspace and question input'},
  {number:'03',category:'Computer vision · Detection',title:'Endoscopic polyp detection',description:'Implemented a Faster R-CNN pipeline with a ResNet-50 + FPN backbone, fine-tuned on Kvasir-SEG images, with annotation conversion, training, and inference workflow.',tags:['PyTorch','torchvision','Faster R-CNN','Object detection'],tone:'azure',href:'https://github.com/SatyaMoulika/polyp-detection-faster-rcnn',preview:<VisionPreview/>},
  {number:'04',category:'AI workflows · Full stack',title:'AgentFlow workflow editor',description:'A visual workflow builder for authoring, validating, running, and inspecting AI workflows, backed by persisted execution history and background processing.',tags:['React','TypeScript','FastAPI','PostgreSQL'],tone:'violet',href:'https://github.com/SatyaMoulika/agentflow',image:'/portfolio/agentflow-home.svg',imageAlt:'AgentFlow home page showing workflow studio, navigation, and recent executions'},
  {number:'05',category:'LLM applications · Chat',title:'OpenAI conversational assistant',description:'A lightweight chat application built with LangChain, OpenAI, and Streamlit, with conversation history and environment-based API key configuration.',tags:['Python','LangChain','OpenAI','Streamlit'],tone:'azure',href:'https://github.com/SatyaMoulika/OpenAI-Chatbot',preview:<ChatPreview/>},
];

function ProjectCard({project}:{project:Project}){
  return <Card className="portfolio-project group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5">
    <div className={`portfolio-project-art tone-${project.tone}`} role={project.image?'img':'presentation'} aria-label={project.image?project.imageAlt:undefined}>
      {project.image?<img src={project.image} alt={project.imageAlt}/>:project.preview}
    </div>
    <div className="p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><Eyebrow>{project.category}</Eyebrow><span className="text-[10px] text-muted">{project.number}</span></div><h3 className="my-3 text-lg font-bold leading-snug tracking-tight">{project.title}</h3><p className="min-h-12 text-xs leading-relaxed text-muted">{project.description}</p><div className="my-4 flex flex-wrap gap-2">{project.tags.map(tag=><Badge key={tag} tone={project.tone}>{tag}</Badge>)}</div><div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-azure"><a href={project.href} target="_blank" rel="noreferrer" className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure hover:underline">Project ↗</a>{project.extraLink&&<a href={project.extraLink.href} target="_blank" rel="noreferrer" className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure hover:underline">{project.extraLink.label}</a>}</div></div>
  </Card>;
}

function ResumeItem({title,organization,meta}:{title:string;organization:string;meta:string}){
  return <div className="resume-item"><h4>{title}</h4><p className="resume-organization">{organization}</p><p className="resume-meta">{meta}</p></div>;
}

export function App(){
  return <ThemeProvider className="min-h-screen bg-[#F4F8FC] p-3 sm:p-6">
    <a href="#main" className="sr-only focus:not-sr-only focus:block focus:p-3">Skip to content</a>
    <div className="mx-auto max-w-7xl">
      <main id="main" className="overflow-hidden rounded-2xl border border-line bg-canvas shadow-sm">
        <div id="top"/>
        <Navbar brand={<>Satya Moulika Pulla<span className="text-azure"> ✧</span></>} items={[{label:'Work',href:'#work'},{label:'About',href:'#about'},{label:'Resume',href:'#resume'}]} actions={<MotionToggle/>}/>
        <section className="portfolio-hero grid items-center gap-8 border-t border-line px-6 py-10 sm:px-10 md:grid-cols-[1.08fr_.92fr] md:gap-12 md:px-14 md:py-14">
          <div><Eyebrow>AI Engineer · LLMs · Applied ML</Eyebrow><h1 className="my-5 text-5xl font-extrabold leading-[1.04] tracking-[-.06em] sm:text-6xl">Turning ideas<br/>into <span className="font-editorial font-medium italic text-azure">useful AI.</span></h1><p className="max-w-lg text-sm leading-7 text-muted">I build AI applications, retrieval systems, and model workflows that connect research ideas to practical experiences.</p><div className="mt-6 flex flex-wrap gap-3"><ButtonLink href="#work">Explore my work ↗</ButtonLink><ButtonLink variant="secondary" href="#resume">Experience & education</ButtonLink></div><div className="mt-6 flex flex-wrap gap-2"><Badge>LLM applications</Badge><Badge tone="teal">Applied ML</Badge><Badge tone="violet">AI workflows</Badge></div></div>
          <div className="hero-avatar"><img src="/portfolio/avatar.svg" alt="Stylized professional avatar illustration for Satya Moulika Pulla"/></div>
        </section>

        <Section id="work" eyebrow="01 / Selected work" title={<>Ideas into <span className="font-editorial font-medium italic text-azure">working systems.</span>}>
          <p className="mb-6 max-w-2xl text-xs leading-relaxed text-muted">A selection across LLM applications, fine-tuning, document retrieval, computer vision, and agent workflows.</p><div className="grid gap-5 md:grid-cols-2">{projects.map(project=><ProjectCard key={project.number} project={project}/>)}</div>
        </Section>

        <Section id="about" eyebrow="02 / About" title={<>Curiosity at the core. <span className="font-editorial font-medium italic text-azure">People in the picture.</span>}>
          <div className="grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-start"><Card className="p-5"><Eyebrow>How I approach AI</Eyebrow><p className="mt-3 text-sm font-bold leading-6">From a promising demo to a dependable workflow.</p><p className="mt-2 text-xs leading-6 text-muted">I care about making systems understandable, useful, and grounded in the data they rely on.</p></Card><div><p className="max-w-2xl text-sm leading-7 text-muted">My work spans experimentation and product engineering: adapting language models, building document-grounded assistants, and shaping the interfaces people use to work with AI.</p><p className="mt-3 max-w-2xl text-sm leading-7 text-muted">I’m continuing to grow as an AI engineer through hands-on projects, careful evaluation, and collaboration.</p></div></div>
        </Section>

        <Section id="resume" eyebrow="03 / Experience & education" title={<>A path shaped by <span className="font-editorial font-medium italic text-azure">building and learning.</span>}>
          <div className="resume-grid"><Card className="p-5 sm:p-6"><p className="resume-section-label">Experience</p><ResumeItem title="AI Engineer" organization="Quantum AI Global" meta="Hyderabad, Telangana, India · Dates to confirm"/><p className="resume-section-label mt-7">Leadership & volunteering</p><ResumeItem title="Student Secretary" organization="National Service Scheme" meta="Mar 2024 – Mar 2025"/><ResumeItem title="Student Volunteer" organization="National Service Scheme" meta="Nov 2022 – Mar 2024"/></Card><Card className="p-5 sm:p-6"><p className="resume-section-label">Education</p><ResumeItem title="Bachelor of Technology" organization="Gayatri Vidya Parishad College of Engineering (Autonomous)" meta="2021 – 2025 · 9.43 / 10"/><div className="mt-6 rounded-lg bg-soft p-4"><p className="text-xs font-bold">Resume PDF</p><p className="mt-1 text-xs leading-5 text-muted">Add a downloadable resume when the latest file is available.</p></div></Card></div>
        </Section>

        <section id="contact" className="portfolio-contact border-t border-line bg-soft/70 px-6 py-10 sm:px-10 md:flex md:items-center md:justify-between md:gap-8 md:px-14"><div><Eyebrow>04 / Get in touch</Eyebrow><h2 className="mt-3 text-3xl font-bold tracking-tight">Have a thoughtful challenge<br/>in mind? <span className="font-editorial font-medium italic text-azure">Let’s talk.</span></h2></div><ButtonLink className="mt-5 md:mt-0" href="https://www.linkedin.com/in/satya-moulika-pulla/" target="_blank" rel="noreferrer">Connect on LinkedIn ↗</ButtonLink></section>
      </main>
      <footer className="flex flex-wrap justify-between gap-3 px-2 py-6 text-[11px] text-muted"><span>© 2026 Satya Moulika Pulla · Porcelain & Azure</span><div className="flex flex-wrap gap-4"><a className="hover:text-azure" href="https://github.com/SatyaMoulika" target="_blank" rel="noreferrer">GitHub ↗</a><a className="hover:text-azure" href="https://huggingface.co/SatyaMoulika" target="_blank" rel="noreferrer">Hugging Face ↗</a><a className="hover:text-azure" href="https://www.linkedin.com/in/satya-moulika-pulla/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></footer>
    </div>
  </ThemeProvider>;
}
