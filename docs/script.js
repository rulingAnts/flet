// script.js - loads README and LICENSE dynamically and renders a friendly site
// Assumptions: repo owner and name known; fallback paths for local preview.

const REPO = { owner: 'rulingAnts', name: 'flet', defaultBranch: 'main' };
const RAW_BASE = `https://raw.githubusercontent.com/${REPO.owner}/${REPO.name}/${REPO.defaultBranch}`;

const els = {
  title: document.getElementById('project-title'),
  tagline: document.getElementById('project-tagline'),
  toolsGrid: document.getElementById('tools-grid'),
  toolsLoading: document.getElementById('tools-loading'),
  featuresGrid: document.getElementById('features-grid'),
  featuresLoading: document.getElementById('features-loading'),
  licenseSummary: document.getElementById('license-summary'),
  licenseFull: document.getElementById('license-full'),
  toggleReadme: document.getElementById('toggle-readme'),
  fullReadme: document.getElementById('full-readme'),
  year: document.getElementById('year'),
  downloadBtn: document.getElementById('download-btn'),
};

els.year.textContent = new Date().getFullYear();
els.downloadBtn.href = `https://github.com/${REPO.owner}/${REPO.name}/releases/latest`;

// Helper: try multiple URLs until one succeeds
async function fetchFirst(urls) {
  for (const url of urls) {
    try {
      const res = await fetch(url, { mode: 'cors' });
      if (res.ok) return await res.text();
    } catch (_) { /* ignore and try next */ }
  }
  throw new Error('All fetch attempts failed for ' + urls.join(', '));
}

function stripMarkdownLinks(text) {
  // Convert [label](url) -> label
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}

function firstNonEmpty(lines) {
  return lines.find((l) => l.trim().length > 0) || '';
}

function extractTitleAndTagline(md) {
  const lines = md.split(/\r?\n/);
  // Title: first level-1 heading, or repo name fallback
  let title = lines.find((l) => /^#\s+/.test(l));
  title = title ? title.replace(/^#\s+/, '').trim() : 'Flet';

  // Tagline: first meaningful non-heading line after title or the first paragraph
  let taglineIdx = lines.findIndex((l) => /^#\s+/.test(l));
  let after = lines.slice(Math.max(taglineIdx + 1, 0));
  after = after.filter((l) => !/^\s*#/.test(l)); // skip other headings
  const firstPara = [];
  for (const l of after) {
    if (l.trim() === '') {
      if (firstPara.length > 0) break; // paragraph ended
      continue;
    }
    firstPara.push(l);
  }
  let tagline = stripMarkdownLinks(firstPara.join(' ').trim());
  // Avoid overly technical taglines
  if (!tagline || tagline.length < 12) {
    tagline = 'A simple, friendly tool designed to help you get things done.';
  }
  return { title, tagline };
}

function extractFeatures(md) {
  // Heuristics: find section titled Features / Key Features / Highlights
  const sectionTitles = ['features', 'key features', 'highlights', 'what you can do', 'benefits'];
  const lines = md.split(/\r?\n/);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s{0,3}#{2,6}\s+(.+)/i); // H2..H6
    if (m) {
      const title = m[1].toLowerCase().trim();
      if (sectionTitles.some((needle) => title.includes(needle))) {
        start = i; break;
      }
    }
  }
  if (start === -1) return [];
  // Collect bullet list items until next heading
  const items = [];
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s{0,3}#{1,6}\s+/.test(l)) break; // next section
    const li = l.match(/^\s*[-*+]\s+(.+)/);
    if (li) items.push(stripMarkdownLinks(li[1]).trim());
  }
  // Fallback: if empty, try to parse a paragraph into sentences
  if (items.length === 0) {
    const para = [];
    for (let i = start + 1; i < lines.length; i++) {
      const l = lines[i];
      if (/^\s{0,3}#{1,6}\s+/.test(l)) break;
      if (l.trim() === '' && para.length > 0) break;
      para.push(l);
    }
    const text = stripMarkdownLinks(para.join(' '));
    const sentences = text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
    return sentences.slice(0, 6);
  }
  return items.slice(0, 8);
}

function summarizeLicense(md) {
  // Extract the first heading or first line; otherwise detect common licenses
  const firstLine = firstNonEmpty(md.split(/\r?\n/));
  const guess = firstLine.replace(/^#\s+/, '').trim();
  if (/mit/i.test(md)) return 'MIT License – free to use, copy, modify, and distribute with proper attribution.';
  if (/apache\s*2/i.test(md)) return 'Apache 2.0 – permissive license with explicit patent rights.';
  if (/gpl/i.test(md)) return 'GPL – strong copyleft license ensuring derivative works remain open.';
  if (/bsd/i.test(md)) return 'BSD – permissive, minimal restrictions on use and distribution.';
  if (/mozilla public license|mpl/i.test(md)) return 'MPL – file-level copyleft with flexibility for larger projects.';
  return guess || 'Open-source license – see full text below for details.';
}

function card(title, text) {
  const el = document.createElement('div');
  el.className = 'feature-card';
  el.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
  return el;
}

function toolCard(tool) {
  const el = document.createElement('div');
  el.className = 'tool-card';
  const safeName = DOMPurify ? DOMPurify.sanitize(tool.name) : tool.name;
  const safeDesc = DOMPurify ? DOMPurify.sanitize(tool.description) : tool.description;
  el.innerHTML = `
    <span class="badge">Tool</span>
    <h3>${safeName}</h3>
    <p>${safeDesc}</p>
    <a class="primary-link" href="${tool.url}" target="_blank" rel="noopener">Open</a>
  `;
  return el;
}

function extractTools(md) {
  // Find the 'Ready Tools' section and parse its markdown table
  const lines = md.split(/\r?\n/);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s{0,3}##\s+.*ready tools/i.test(lines[i])) { start = i; break; }
  }
  if (start === -1) return [];
  // Advance to first table header row (line with |)
  let i = start + 1;
  while (i < lines.length && !/\|/.test(lines[i])) i++;
  if (i >= lines.length) return [];
  // Skip header and separator lines
  const rows = [];
  i += 2;
  for (; i < lines.length; i++) {
    const l = lines[i];
    if (!/\|/.test(l)) break; // table ended
    // split by | and trim; remove leading/trailing |
    const parts = l.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((s) => s.trim());
    if (parts.length < 3) continue;
    const toolNameCell = parts[0];
    const descCell = parts[2];
    // Extract link from toolNameCell
    let name = toolNameCell, url = '';
    const m = toolNameCell.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (m) { name = m[1]; url = m[2]; }
    if (!url) {
      // Fallback to repo column as link
      const repoCell = parts[1];
      const m2 = repoCell.match(/`([^`]+)`/);
      if (m2) url = `https://github.com/${m2[1]}`;
    }
    rows.push({ name, url, description: descCell.replace(/\*\*|`/g, '') });
  }
  return rows;
}

async function load() {
  const readmeUrls = [
    '../README.md', // local preview if docs/ not root
    './README.md',  // if someone copies README into docs/
    `${RAW_BASE}/README.md`,
  ];
  const licenseUrls = [
    '../LICENSE.md',
    './LICENSE.md',
    `${RAW_BASE}/LICENSE.md`,
  ];

  let mdReadme = '', mdLicense = '';
  try { mdReadme = await fetchFirst(readmeUrls); } catch (e) { console.warn('README fetch failed', e); }
  try { mdLicense = await fetchFirst(licenseUrls); } catch (e) { console.warn('LICENSE fetch failed', e); }

  // Title & tagline
  try {
    const { title, tagline } = extractTitleAndTagline(mdReadme || '# Flet\n\nA simple, friendly tool.');
    els.title.textContent = title;
    els.tagline.textContent = tagline;
    document.title = `${title} – Simple, Friendly App Tool`;
  } catch (e) {
    console.error('Title/tagline extraction failed', e);
  }

  // Features
  try {
    const features = extractFeatures(mdReadme);
    els.featuresGrid.innerHTML = '';
    const defaults = [
      'Fast to get started – no complex setup needed.',
      'Clear, friendly interface designed for everyone.',
      'Works on your computer with minimal fuss.',
      'Open-source and free to use.',
    ];
    const list = features.length ? features : defaults;
    list.forEach((f, idx) => {
      const title = ['Easy to Start', 'Friendly UI', 'Reliable', 'Open & Free', 'Powerful', 'Flexible', 'Private by Design', 'Works Offline'][idx % 8];
      els.featuresGrid.appendChild(card(title, f));
    });
  } catch (e) {
    console.error('Features extraction failed', e);
    els.featuresGrid.innerHTML = '';
  } finally {
    els.featuresLoading?.remove();
  }

  // Tools list
  try {
    const tools = extractTools(mdReadme);
    if (tools.length) {
      els.toolsGrid.innerHTML = '';
      tools.forEach((t) => els.toolsGrid.appendChild(toolCard(t)));
    } else {
      // Hide section if none found
      const section = document.getElementById('available-tools');
      section?.setAttribute('hidden', '');
    }
  } catch (e) {
    console.error('Tool parsing failed', e);
  } finally {
    els.toolsLoading?.remove();
  }

  // License
  try {
    const summary = summarizeLicense(mdLicense || '');
    els.licenseSummary.textContent = summary;
    els.licenseFull.textContent = mdLicense || 'License text unavailable.';
  } catch (e) {
    console.error('License handling failed', e);
    els.licenseSummary.textContent = 'License information unavailable.';
  }

  // Full README (sanitized)
  try {
    if (window.marked && window.DOMPurify && mdReadme) {
      const html = DOMPurify.sanitize(marked.parse(mdReadme));
      els.fullReadme.innerHTML = html;
    } else if (mdReadme) {
      els.fullReadme.textContent = mdReadme;
    } else {
      els.fullReadme.innerHTML = '<p>No additional details available.</p>';
    }
  } catch (e) {
    console.error('README render failed', e);
    els.fullReadme.textContent = mdReadme || '';
  }

  // Toggle readme
  els.toggleReadme.addEventListener('click', () => {
    const expanded = els.toggleReadme.getAttribute('aria-expanded') === 'true';
    els.toggleReadme.setAttribute('aria-expanded', String(!expanded));
    els.toggleReadme.textContent = expanded ? 'Show Full Details' : 'Hide Full Details';
    if (expanded) {
      els.fullReadme.setAttribute('hidden', '');
    } else {
      els.fullReadme.removeAttribute('hidden');
      // Jump a bit down to reveal content on small screens
      els.fullReadme.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

load().catch((e) => console.error(e));
