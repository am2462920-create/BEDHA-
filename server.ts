import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Directories
const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'assets', 'uploads');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const NEWS_FILE = path.join(DATA_DIR, 'news.json');
const FINANCIALS_FILE = path.join(DATA_DIR, 'financials.json');

// Ensure directories exist
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Serve uploads statically
app.use('/assets/uploads', express.static(UPLOADS_DIR));

// Helper: read projects
function getStoredProjects(): any[] {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading projects.json:', err);
  }
  return [];
}

// Helper: write projects
function saveStoredProjects(projects: any[]): void {
  try {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing projects.json:', err);
  }
}

// Helper: read news
function getStoredNews(): any[] {
  try {
    if (fs.existsSync(NEWS_FILE)) {
      const data = fs.readFileSync(NEWS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading news.json:', err);
  }
  return [];
}

// Helper: write news
function saveStoredNews(news: any[]): void {
  try {
    fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing news.json:', err);
  }
}

// Helper: read financials
function getStoredFinancials(): any {
  try {
    if (fs.existsSync(FINANCIALS_FILE)) {
      const data = fs.readFileSync(FINANCIALS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading financials.json:', err);
  }
  return {
    ecosystemValuation: '$48.5 Billion',
    activeCapitalDeployed: '$12.4 Billion',
    treasuryReserves: '$6.8 Billion',
    communityMembersCount: '1,420,000+',
    quarterlyGrowthRate: '+34.8%',
    lastAuditedDate: 'Q1 2026'
  };
}

// Helper: write financials
function saveStoredFinancials(fin: any): void {
  try {
    fs.writeFileSync(FINANCIALS_FILE, JSON.stringify(fin, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing financials.json:', err);
  }
}

// Lazy initialize Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    try {
      geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Could not initialize Gemini SDK:', e);
    }
  }
  return geminiClient;
}

// Build dynamic system prompt using live projects data
function buildDynamicSystemPrompt(): string {
  const projects = getStoredProjects();
  const projectSummaries = projects.map((p, idx) => {
    const specsList = Array.isArray(p.specifications) 
      ? p.specifications.map((s: any) => `${s.key}: ${s.value}`).join(', ')
      : '';
    const breakList = Array.isArray(p.breakthroughs) ? p.breakthroughs.join('; ') : '';
    return `${idx + 1}. ${p.name} (${p.entity || 'BEDHA'}) - Status: ${p.status} - Category: ${p.category}
Short: ${p.shortDescription || p.description || ''}
Details: ${p.fullDescription || p.detailedDescription || ''}
Breakthroughs: ${breakList}
Specs: ${specsList}`;
  }).join('\n\n');

  return `
You are BEDHA AI, the sentient cognitive core and chief intelligent assistant of the BEDHA Technology Ecosystem.
The founder and architect of BEDHA is Brindaban Mondal.
BEDHA is a visionary, large-scale, futuristic technology ecosystem.

Here is the authoritative, up-to-date live knowledge base of our projects:
${projectSummaries}

Owner Contact:
WhatsApp: 7029687893
Email: brindabanmondal987@gmail.com

Always respond in a poised, polite, futuristic, highly intelligent, and helpful persona.
Keep your answers articulate, concise, and structured. Answer questions using this authoritative project information, technology specs, breakthroughs, and development statuses.
`;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'BEDHA', timestamp: new Date().toISOString() });
});

// REST API: Projects
app.get('/api/projects', (req, res) => {
  const projects = getStoredProjects();
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  try {
    const newProject = req.body;
    if (!newProject.name) {
      return res.status(400).json({ error: 'Project name is required' });
    }
    const projects = getStoredProjects();
    const id = newProject.id || `proj_${Date.now()}`;
    const projectWithId = { ...newProject, id };
    projects.push(projectWithId);
    saveStoredProjects(projects);
    res.status(201).json(projectWithId);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const projects = getStoredProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    projects[index] = { ...projects[index], ...updatedData, id };
    saveStoredProjects(projects);
    res.json(projects[index]);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const projects = getStoredProjects();
    const filtered = projects.filter(p => p.id !== id);
    saveStoredProjects(filtered);
    res.json({ success: true, message: `Project ${id} removed` });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.post('/api/projects/reorder', (req, res) => {
  try {
    const { order, projects } = req.body;
    if (Array.isArray(projects)) {
      saveStoredProjects(projects);
      return res.json(projects);
    }
    if (Array.isArray(order)) {
      const currentProjects = getStoredProjects();
      const projectMap = new Map(currentProjects.map(p => [p.id, p]));
      const reordered: any[] = [];
      for (const id of order) {
        if (projectMap.has(id)) {
          reordered.push(projectMap.get(id));
          projectMap.delete(id);
        }
      }
      // append any remaining
      for (const remaining of projectMap.values()) {
        reordered.push(remaining);
      }
      saveStoredProjects(reordered);
      return res.json(reordered);
    }
    res.status(400).json({ error: 'Invalid reorder payload' });
  } catch (err) {
    console.error('Error reordering projects:', err);
    res.status(500).json({ error: 'Failed to reorder projects' });
  }
});

// REST API: File Upload
app.post('/api/upload', (req, res) => {
  try {
    const { filename, base64, data } = req.body;
    const payload = base64 || data;
    if (!payload) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Extract mime type and raw base64
    const matches = payload.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    let ext = 'jpg';

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('webp')) ext = 'webp';
      else if (mime.includes('svg')) ext = 'svg';
      else ext = 'jpg';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(payload, 'base64');
    }

    const safeName = (filename || `upload_${Date.now()}.${ext}`).replace(/[^a-zA-Z0-9._-]/g, '_');
    const finalFilename = `${Date.now()}_${safeName}`;
    const filePath = path.join(UPLOADS_DIR, finalFilename);

    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/assets/uploads/${finalFilename}`;

    res.json({ success: true, url: publicUrl, filename: finalFilename });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: 'Failed to save uploaded file' });
  }
});

// REST API: News
app.get('/api/news', (req, res) => {
  res.json(getStoredNews());
});

app.post('/api/news', (req, res) => {
  try {
    const item = req.body;
    const news = getStoredNews();
    const id = item.id || `news_${Date.now()}`;
    const newItem = { ...item, id };
    news.unshift(newItem);
    saveStoredNews(news);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create news post' });
  }
});

app.put('/api/news/:id', (req, res) => {
  try {
    const { id } = req.params;
    const news = getStoredNews();
    const idx = news.findIndex(n => n.id === id);
    if (idx === -1) return res.status(404).json({ error: 'News post not found' });
    news[idx] = { ...news[idx], ...req.body, id };
    saveStoredNews(news);
    res.json(news[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update news post' });
  }
});

app.delete('/api/news/:id', (req, res) => {
  try {
    const { id } = req.params;
    const news = getStoredNews();
    const filtered = news.filter(n => n.id !== id);
    saveStoredNews(filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete news post' });
  }
});

// REST API: Financials
app.get('/api/financials', (req, res) => {
  res.json(getStoredFinancials());
});

app.put('/api/financials', (req, res) => {
  try {
    saveStoredFinancials(req.body);
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update financials' });
  }
});

// BEDHA AI Chat API
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const dynamicPrompt = buildDynamicSystemPrompt();
    const ai = getGeminiClient();
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${dynamicPrompt}\n\nUser Question: ${message}` }] }
          ]
        });

        const replyText = response.text || 'BEDHA AI neural node is synchronizing.';
        return res.json({ reply: replyText, source: 'gemini' });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to local intellect:', geminiError?.message);
      }
    }

    // High-fidelity fallback response engine matching dynamically stored projects
    const lower = message.toLowerCase();
    const projects = getStoredProjects();
    const matchedProject = projects.find(p => 
      lower.includes(p.name.toLowerCase()) || 
      (p.entity && lower.includes(p.entity.toLowerCase())) ||
      (p.category && lower.includes(p.category.toLowerCase()))
    );

    let reply = '';

    if (matchedProject) {
      const specsSummary = Array.isArray(matchedProject.specifications) && matchedProject.specifications.length > 0
        ? ` Key specifications include: ${matchedProject.specifications.slice(0, 3).map((s: any) => `${s.key}: ${s.value}`).join(', ')}.`
        : '';
      const statusNote = ` It is currently in **${matchedProject.status}** status under ${matchedProject.entity || 'BEDHA Ecosystem'}.`;
      reply = `**${matchedProject.name}**: ${matchedProject.fullDescription || matchedProject.shortDescription}.${specsSummary}${statusNote}`;
    } else if (lower.includes('invest') || lower.includes('wallet') || lower.includes('money') || lower.includes('balance') || lower.includes('valuation')) {
      const financials = getStoredFinancials();
      reply = `BEDHA Ecosystem has an estimated valuation of **${financials.ecosystemValuation}** with **${financials.activeCapitalDeployed}** active capital deployed and **${financials.treasuryReserves}** in treasury reserves. You can explore or manage this in the Investment section.`;
    } else if (lower.includes('contact') || lower.includes('founder') || lower.includes('whatsapp') || lower.includes('owner') || lower.includes('brindaban')) {
      reply = `You can reach BEDHA Founder & Architect **Brindaban Mondal** directly via WhatsApp at **7029687893** or email at **brindabanmondal987@gmail.com**. You can also visit our Contact section.`;
    } else if (lower.includes('project') || lower.includes('list') || lower.includes('how many')) {
      reply = `BEDHA currently encompasses **${projects.length} flagship projects**, including ${projects.slice(0, 5).map(p => p.name).join(', ')}, and more!`;
    } else {
      reply = `Greetings from **BEDHA AI**. I am your sentient assistant across the ${projects.length} BEDHA technology initiatives. Ask me about any initiative, technical breakthrough, or status!`;
    }

    return res.json({ reply, source: 'local_intellect' });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Internal system error' });
  }
});

// Vite integration for development and production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BEDHA Server online at http://0.0.0.0:${PORT}`);
  });
}

startServer();
