export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number; // minutes
  category: "images" | "data" | "documents" | "guides";
  coverEmoji: string;
  content: string; // HTML string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "jpg-vs-webp",
    title: "JPG vs WebP in 2025: Which Image Format is Better for Your Website?",
    description: "A complete comparison of JPG and WebP formats — file size, quality, browser support, and when to use each one to boost your PageSpeed score.",
    date: "2025-03-15",
    readTime: 6,
    category: "images",
    coverEmoji: "🖼️",
    content: `
<h2>What is JPG?</h2>
<p>JPG (also written JPEG) has been the dominant image format on the web since the mid-1990s. It uses <strong>lossy compression</strong> — meaning some image data is permanently discarded during encoding — to achieve impressive file size reductions for photographs and complex scenes. A typical photograph saved as a high-quality JPG is 5–10× smaller than an uncompressed BMP or TIFF version.</p>
<p>JPG is universally supported: every browser, operating system, email client, social network, and image editing application reads it without issue. That ubiquity has kept JPG dominant for over 30 years.</p>

<h2>What is WebP?</h2>
<p>WebP was developed by Google and released in 2010. It supports both <strong>lossy</strong> and <strong>lossless</strong> compression, as well as <strong>animation</strong> (like GIF) and <strong>transparency</strong> (like PNG) — all in a single format. Google's own benchmarks show WebP lossy images are 25–34% smaller than comparable JPGs at equivalent visual quality.</p>
<p>Browser support reached critical mass around 2020 when Safari 14 added support. As of 2025, WebP is supported by <strong>97%+ of global browsers</strong>, making it safe to use in production.</p>

<h2>File Size Comparison</h2>
<p>Here is a typical real-world comparison for a 2000×1500 photograph:</p>
<ul>
  <li><strong>JPG (quality 85):</strong> ~320 KB</li>
  <li><strong>WebP (quality 80):</strong> ~210 KB — 34% smaller</li>
  <li><strong>PNG (lossless):</strong> ~2.1 MB — 6.5× larger than JPG</li>
</ul>
<p>For a website with 20 product images, switching from JPG to WebP can save <strong>2–3 MB per page load</strong> — a dramatic improvement for mobile users and Core Web Vitals scores.</p>

<h2>Quality Differences</h2>
<p>At equivalent compression levels, WebP generally produces <strong>fewer compression artifacts</strong> than JPG — particularly the "blocky" look around sharp edges and text. This is because WebP uses a more modern prediction model (based on VP8 video codec) while JPG uses DCT-based compression from 1992.</p>
<p>For most photographic content, the quality difference is imperceptible to human eyes when comparing well-tuned JPG and WebP at equivalent file sizes. For images with sharp edges (screenshots, infographics), WebP has a clear advantage.</p>

<h2>When to Use JPG</h2>
<ul>
  <li>When sharing images via email, Slack, or messaging apps (widest compatibility)</li>
  <li>When uploading to platforms that don't accept WebP (some older CMSs)</li>
  <li>When working with photography clients who expect standard formats</li>
  <li>When using software that doesn't support WebP export</li>
</ul>

<h2>When to Use WebP</h2>
<ul>
  <li>For all images served on your website or web app</li>
  <li>When optimizing for Google PageSpeed or Core Web Vitals</li>
  <li>When you need both transparency AND smaller file size (replaces PNG)</li>
  <li>When serving images to modern mobile apps</li>
</ul>

<h2>The Verdict</h2>
<p><strong>Use WebP for everything on the web.</strong> The 25–34% file size savings directly improve page load times, reduce bandwidth costs, and boost SEO rankings. Convert your existing JPG library to WebP using our free <a href="/convert-jpg-to-webp">JPG to WebP Converter</a> — it runs entirely in your browser with no upload required.</p>
<p>Keep JPG for offline sharing and compatibility with older systems. When in doubt, convert: our tool lets you compare file sizes after conversion so you can see the savings firsthand.</p>
    `,
  },
  {
    slug: "png-vs-jpg",
    title: "PNG vs JPG: When to Use Each Format (Complete 2025 Guide)",
    description: "Should you save your image as PNG or JPG? This guide covers transparency, file size, quality, and the exact use cases for each format.",
    date: "2025-03-10",
    readTime: 5,
    category: "images",
    coverEmoji: "📸",
    content: `
<h2>The Core Difference: Lossless vs Lossy</h2>
<p>The fundamental difference between PNG and JPG comes down to compression strategy:</p>
<ul>
  <li><strong>PNG uses lossless compression.</strong> Every pixel is preserved exactly. No data is discarded. The file can be opened, saved, and re-opened thousands of times without any quality degradation.</li>
  <li><strong>JPG uses lossy compression.</strong> Some image data is permanently removed to achieve smaller file sizes. Each time you save a JPG, quality degrades slightly — though at high quality settings (85+), this is barely perceptible.</li>
</ul>

<h2>Transparency: PNG Wins</h2>
<p>PNG supports an <strong>alpha channel</strong> — a fourth channel alongside Red, Green, and Blue that controls per-pixel transparency. This makes PNG the only choice when you need:</p>
<ul>
  <li>Logos on colored or patterned backgrounds</li>
  <li>Icons with transparent corners</li>
  <li>Watermarks overlaid on photos</li>
  <li>UI elements that need to blend into different backgrounds</li>
</ul>
<p>JPG does not support transparency. Transparent areas in a JPG are filled with white (or another background color) during encoding.</p>

<h2>File Size: JPG Wins for Photos</h2>
<p>For photographic content with millions of colors, JPG is dramatically smaller:</p>
<ul>
  <li>A 3000×2000 photograph: <strong>JPG ~800 KB</strong> vs <strong>PNG ~8 MB</strong></li>
  <li>A simple logo on white: <strong>PNG ~12 KB</strong> vs <strong>JPG ~35 KB</strong></li>
</ul>
<p>PNG's lossless compression works very well on simple graphics with large areas of flat color (logos, diagrams, screenshots). It works poorly on photographs with complex color gradients — the files become enormous.</p>

<h2>Image Quality at Equal File Size</h2>
<p>For photographs, <strong>JPG at quality 85–90 is visually indistinguishable from PNG</strong> at roughly one-tenth the file size. For graphics with crisp edges, text, or flat colors, PNG preserves these features perfectly while JPG introduces visible "blocking" artifacts around edges.</p>

<h2>Quick Decision Guide</h2>
<table>
  <thead><tr><th>Use Case</th><th>Best Format</th></tr></thead>
  <tbody>
    <tr><td>Photographs, product shots</td><td>JPG (or WebP)</td></tr>
    <tr><td>Logo, icon, illustration</td><td>PNG (or SVG)</td></tr>
    <tr><td>Screenshot with text</td><td>PNG</td></tr>
    <tr><td>Web images (any)</td><td>WebP (best of both)</td></tr>
    <tr><td>Print-ready artwork</td><td>PNG or TIFF</td></tr>
    <tr><td>Email attachments</td><td>JPG</td></tr>
  </tbody>
</table>

<h2>Convert Between Formats — Free</h2>
<p>Need to switch formats? Use our free converters that run entirely in your browser:</p>
<ul>
  <li><a href="/convert-png-to-jpg">PNG to JPG Converter</a> — reduce file size for photos</li>
  <li><a href="/convert-jpg-to-png">JPG to PNG Converter</a> — add transparency support</li>
  <li><a href="/convert-png-to-webp">PNG to WebP</a> — modern format with transparency and smaller size</li>
</ul>
    `,
  },
  {
    slug: "reduce-image-file-size",
    title: "How to Reduce Image File Size Without Losing Quality (5 Free Methods)",
    description: "Huge images slow down your website and cost you Google rankings. Here are 5 proven ways to reduce image file size for free — no software needed.",
    date: "2025-03-05",
    readTime: 7,
    category: "images",
    coverEmoji: "⚡",
    content: `
<h2>Why Image File Size Matters</h2>
<p>Images typically account for <strong>50–80% of a webpage's total weight</strong>. A single unoptimized product photo can be larger than all your JavaScript and CSS combined. Large images cause:</p>
<ul>
  <li>Slow page load times (Google's Core Web Vitals penalty)</li>
  <li>Higher bounce rates — users leave before the page loads</li>
  <li>Increased server bandwidth costs</li>
  <li>Poor mobile experience on slow connections</li>
</ul>
<p>Google's PageSpeed Insights tool specifically flags "Serve images in next-gen formats" and "Properly size images" as opportunities. Fixing these can improve your score by 20–40 points.</p>

<h2>Method 1: Convert JPG/PNG to WebP</h2>
<p>The single highest-impact change you can make. WebP produces images <strong>25–34% smaller than JPG</strong> at equivalent quality — with no perceptible visual difference.</p>
<p><strong>How to do it free:</strong> Use our <a href="/convert-jpg-to-webp">JPG to WebP Converter</a> or <a href="/convert-png-to-webp">PNG to WebP Converter</a>. Upload your image, download the WebP — done. No software, no account.</p>

<h2>Method 2: Choose the Right Format</h2>
<p>Using the wrong format adds unnecessary bytes:</p>
<ul>
  <li><strong>Photographs → JPG or WebP</strong> (not PNG — PNG is 5–10× larger for photos)</li>
  <li><strong>Logos and icons → SVG or PNG</strong> (not JPG — JPG adds artifacts on sharp edges)</li>
  <li><strong>Everything web → WebP</strong> (supported by 97%+ of browsers in 2025)</li>
</ul>

<h2>Method 3: Reduce Image Dimensions</h2>
<p>A 4000px wide image displayed in a 800px column still loads all 4000 pixels — then scales down in the browser. That's wasted bandwidth.</p>
<p><strong>Rule of thumb:</strong> Export images at 2× the display size (for retina screens). A 400px display slot needs a 800px image — not 4000px.</p>
<p>File size scales roughly with the square of dimensions: halving width and height reduces file size by ~75%.</p>

<h2>Method 4: Reduce JPG Quality (80 is Enough)</h2>
<p>Most image editors default to JPG quality 95–100. In practice, <strong>quality 75–85 is visually identical for web use</strong> while being 40–60% smaller.</p>
<ul>
  <li>Quality 100: ~1.2 MB (original quality, unnecessary for web)</li>
  <li>Quality 85: ~380 KB (virtually identical to human eye)</li>
  <li>Quality 75: ~250 KB (slight softening, often acceptable)</li>
</ul>

<h2>Method 5: Remove Metadata (EXIF)</h2>
<p>Photos taken with a smartphone or camera embed metadata in the file: GPS location, camera model, date, thumbnail, color profiles, and more. This EXIF data can add <strong>50–200 KB</strong> to every image — with zero visual benefit for web use.</p>
<p>Most image converters strip metadata during conversion. Our converters do this automatically, giving you clean, lean files ready for the web.</p>

<h2>Expected Results</h2>
<p>Applying all five methods to a typical 3 MB product photo can bring it down to <strong>120–200 KB</strong> — a 93% reduction — while remaining visually perfect on any screen. For a page with 10 product images, that means going from 30 MB to under 2 MB, dramatically improving load times and SEO.</p>
    `,
  },
  {
    slug: "csv-to-json-guide",
    title: "CSV to JSON: The Complete Developer Guide (2025)",
    description: "Everything you need to know about converting CSV files to JSON — structure, data types, nested objects, arrays, and free tools to do it instantly.",
    date: "2025-02-28",
    readTime: 6,
    category: "data",
    coverEmoji: "📊",
    content: `
<h2>Why Convert CSV to JSON?</h2>
<p>CSV (Comma-Separated Values) is the universal language of spreadsheets and data exports. JSON (JavaScript Object Notation) is the universal language of APIs and web applications. Converting between them is one of the most common tasks in data engineering, web development, and analytics.</p>
<p>You need CSV-to-JSON conversion when:</p>
<ul>
  <li>Importing spreadsheet data into a web app or REST API</li>
  <li>Feeding data into a MongoDB, Firebase, or other document database</li>
  <li>Transforming a data export for use in a JavaScript/Node.js application</li>
  <li>Sharing structured data between systems with different format expectations</li>
</ul>

<h2>How CSV Maps to JSON</h2>
<p>A CSV file has a simple structure: the first row defines column headers, each subsequent row is a data record. JSON represents this as an <strong>array of objects</strong>, where each object's keys are the column headers.</p>
<p><strong>CSV input:</strong></p>
<pre><code>name,age,city
Alice,30,Paris
Bob,25,London
</code></pre>
<p><strong>JSON output:</strong></p>
<pre><code>[
  { "name": "Alice", "age": "30", "city": "Paris" },
  { "name": "Bob",   "age": "25", "city": "London" }
]
</code></pre>

<h2>Data Type Handling</h2>
<p>One important nuance: CSV has no concept of data types. Every value is a string. The JSON output of a naive converter will have <code>"age": "30"</code> (a string) rather than <code>"age": 30</code> (a number). Depending on your use case:</p>
<ul>
  <li><strong>For REST APIs:</strong> type coercion matters — you'll want numbers as numbers. Post-process with a script or use a converter with type inference.</li>
  <li><strong>For display / reporting:</strong> string values are usually fine.</li>
  <li><strong>For databases:</strong> most will coerce types on insert based on the schema.</li>
</ul>

<h2>Handling Special Characters</h2>
<p>Proper CSV parsers handle quoted fields (values containing commas) and escaped quotes:</p>
<pre><code>"name","bio"
"Alice","Developer, speaker, and author"
"Bob","He said ""hello world"""
</code></pre>
<p>The commas inside quotes should not be treated as delimiters. Our <a href="/convert-csv-to-json">CSV to JSON Converter</a> handles this correctly.</p>

<h2>Convert CSV to JSON Free — No Upload</h2>
<p>Our <a href="/convert-csv-to-json">free CSV to JSON converter</a> runs entirely in your browser:</p>
<ol>
  <li>Upload your CSV file (or drag and drop)</li>
  <li>The converter reads the header row and maps each subsequent row to a JSON object</li>
  <li>Download the resulting JSON file instantly</li>
</ol>
<p>Your data never leaves your device — ideal for sensitive business data, customer records, or confidential exports.</p>

<h2>The Reverse: JSON to CSV</h2>
<p>Need to go the other way? Our <a href="/convert-json-to-csv">JSON to CSV Converter</a> flattens JSON arrays into spreadsheet-ready CSV format. Nested objects are serialized as JSON strings within cells.</p>
    `,
  },
  {
    slug: "what-is-webp",
    title: "What is WebP? The Modern Image Format Explained (2025)",
    description: "WebP is Google's image format that's smaller than JPG and PNG combined. Learn how it works, why you should use it, and how to convert your images free.",
    date: "2025-02-20",
    readTime: 5,
    category: "images",
    coverEmoji: "🌐",
    content: `
<h2>WebP in a Nutshell</h2>
<p>WebP is an image format developed by Google, first released in 2010 and now supported by <strong>97%+ of browsers worldwide</strong>. It is designed to replace both JPG (for photographs) and PNG (for graphics with transparency) with a single, more efficient format.</p>
<p>The headline benefit: <strong>WebP images are 25–34% smaller than equivalent JPG files</strong> and up to 70% smaller than PNG files — at the same visual quality. For a website serving thousands of images, this translates into significant bandwidth savings, faster page loads, and better SEO.</p>

<h2>How WebP Works</h2>
<p>WebP lossy compression is based on the <strong>VP8 video codec</strong>, the same technology used in WebM video. VP8 uses a predictive coding model that analyzes neighboring blocks of pixels to predict future values — a fundamentally more efficient approach than JPG's 30-year-old DCT algorithm.</p>
<p>WebP lossless compression uses a completely different algorithm specifically designed for graphics, achieving better compression than PNG's DEFLATE algorithm on most content.</p>

<h2>WebP Feature Comparison</h2>
<table>
  <thead><tr><th>Feature</th><th>WebP</th><th>JPG</th><th>PNG</th></tr></thead>
  <tbody>
    <tr><td>Lossy compression</td><td>✅</td><td>✅</td><td>❌</td></tr>
    <tr><td>Lossless compression</td><td>✅</td><td>❌</td><td>✅</td></tr>
    <tr><td>Transparency (alpha)</td><td>✅</td><td>❌</td><td>✅</td></tr>
    <tr><td>Animation</td><td>✅</td><td>❌</td><td>❌ (APNG limited)</td></tr>
    <tr><td>File size vs JPG</td><td>25–34% smaller</td><td>baseline</td><td>5–10× larger</td></tr>
    <tr><td>Browser support (2025)</td><td>97%+</td><td>100%</td><td>100%</td></tr>
  </tbody>
</table>

<h2>Should You Use WebP in 2025?</h2>
<p><strong>Yes, for all web images.</strong> With 97%+ browser support, the case for avoiding WebP has essentially disappeared. The remaining 3% of browsers not supporting WebP are primarily very old mobile browsers or niche environments where image format support is rarely an issue.</p>
<p>Major platforms — Google, Facebook, YouTube, Shopify, and most CDNs — automatically convert and serve WebP to supported browsers.</p>

<h2>Converting to WebP — Free</h2>
<p>You can convert your existing image library to WebP using our free browser-based tools:</p>
<ul>
  <li><a href="/convert-jpg-to-webp">JPG to WebP Converter</a> — most common conversion</li>
  <li><a href="/convert-png-to-webp">PNG to WebP Converter</a> — with transparency support</li>
  <li><a href="/convert-webp-to-jpg">WebP to JPG Converter</a> — when you need JPG compatibility</li>
  <li><a href="/convert-webp-to-png">WebP to PNG Converter</a> — lossless back-conversion</li>
</ul>
<p>All conversions happen entirely in your browser — no upload, no account, no cost.</p>
    `,
  },
  {
    slug: "markdown-to-html-guide",
    title: "Markdown to HTML: Why Convert and How to Do It Free",
    description: "Markdown is great for writing, but HTML is required for the web. Learn when to convert, what the output looks like, and how to do it instantly for free.",
    date: "2025-02-15",
    readTime: 5,
    category: "documents",
    coverEmoji: "📝",
    content: `
<h2>What is Markdown?</h2>
<p>Markdown is a lightweight markup language created by John Gruber in 2004. It lets you write formatted text using plain-text syntax that is both human-readable in its raw form and easily convertible to HTML. It's the format of choice for:</p>
<ul>
  <li>GitHub README files and documentation</li>
  <li>Static site generators (Hugo, Jekyll, Gatsby)</li>
  <li>Note-taking apps (Obsidian, Notion, Bear)</li>
  <li>Technical writing and developer blogs</li>
  <li>Stack Overflow answers and chat platforms (Slack, Discord)</li>
</ul>

<h2>Markdown Syntax at a Glance</h2>
<pre><code># Heading 1
## Heading 2

**Bold text** and *italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://example.com)
![Image alt](image.jpg)

\`inline code\`

\`\`\`javascript
// Code block
const x = 42;
\`\`\`

> Blockquote text
</code></pre>

<h2>Why Convert Markdown to HTML?</h2>
<p>Markdown is a writing format, not a display format. Web browsers render HTML — not Markdown. You need to convert Markdown to HTML when:</p>
<ul>
  <li><strong>Publishing on a website</strong> without a CMS that handles conversion automatically</li>
  <li><strong>Sending HTML emails</strong> — email clients render HTML, not Markdown</li>
  <li><strong>Embedding content</strong> in an app that expects HTML input</li>
  <li><strong>Sharing a document</strong> with non-technical readers who need a formatted, browser-viewable file</li>
  <li><strong>Legacy systems</strong> that accept HTML but not Markdown</li>
</ul>

<h2>What the HTML Output Looks Like</h2>
<p>Our <a href="/convert-markdown-to-html">Markdown to HTML converter</a> produces a complete, self-contained HTML file with:</p>
<ul>
  <li>A clean <code>&lt;!DOCTYPE html&gt;</code> document structure</li>
  <li>Embedded CSS styling (readable typography, code highlighting, blockquotes)</li>
  <li>Proper semantic HTML tags: <code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;code&gt;</code>, <code>&lt;pre&gt;</code>, <code>&lt;blockquote&gt;</code>, <code>&lt;table&gt;</code></li>
  <li>Responsive layout with a comfortable reading width</li>
</ul>
<p>You can open the output directly in any browser or paste the body content into your CMS, email tool, or web application.</p>

<h2>Convert Markdown to HTML — Free</h2>
<p>Use our <a href="/convert-markdown-to-html">free Markdown to HTML converter</a>:</p>
<ol>
  <li>Upload your <code>.md</code> file</li>
  <li>The converter processes it in your browser using the <strong>marked</strong> library</li>
  <li>Download a complete, styled HTML file instantly</li>
</ol>
<p>No upload, no account, no cost. Your content never leaves your device.</p>
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_CATEGORIES = {
  images:    { label: "Images",    emoji: "🖼️", color: "#6c63ff" },
  data:      { label: "Data",      emoji: "📊", color: "#10b981" },
  documents: { label: "Documents", emoji: "📄", color: "#ec4899" },
  guides:    { label: "Guides",    emoji: "📚", color: "#f59e0b" },
};
