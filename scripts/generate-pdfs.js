const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogs = [
  'australia-blog',
  'uk-blog', 
  'canada-blog',
  'usa-blog',
  'germany-blog',
  'china-blog',
  'new-zealand-blog',
  'portugal-blog',
  'spain-blog',
  'france-blog',
  'malta-blog'
];

async function generatePDF(blogSlug) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Read markdown content
  const markdownPath = path.join(__dirname, '../src/app/blog', `${blogSlug}.md`);
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');
  const { content, data } = matter(markdownContent);
  
  // Convert markdown to HTML (simple conversion for now)
  const htmlContent = content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^\n/g, '<p>')
    .replace(/\n$/g, '</p>');
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${data.title || blogSlug}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #1e40af; font-size: 28px; margin-bottom: 20px; }
        h2 { color: #1e40af; font-size: 24px; margin-top: 30px; margin-bottom: 15px; }
        h3 { color: #1e40af; font-size: 20px; margin-top: 25px; margin-bottom: 10px; }
        p { margin-bottom: 15px; }
        strong { font-weight: bold; }
        em { font-style: italic; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #1e40af; padding-bottom: 20px; }
        .footer { text-align: center; margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; font-size: 12px; color: #666; }
        .contact { background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Alpine Education & Visa Services</h1>
        <p>${data.title || blogSlug.replace(/-/g, ' ')}</p>
        <p><em>Published: ${data.published || 'January 2025'}</em></p>
      </div>
      
      <div class="content">
        ${htmlContent}
      </div>
      
      <div class="contact">
        <h3>Contact Alpine Education</h3>
        <p><strong>Phone:</strong> +977 01 5919774</p>
        <p><strong>WhatsApp:</strong> +977 9851044444</p>
        <p><strong>Email:</strong> info@alpineeducation.com.np</p>
        <p><strong>Address:</strong> Kathmandu, Nepal</p>
      </div>
      
      <div class="footer">
        <p>© 2025 Alpine Education & Visa Services. All rights reserved.</p>
        <p>For more information, visit our website or contact our expert counselors.</p>
      </div>
    </body>
    </html>
  `;
  
  await page.setContent(html);
  
  // Ensure PDF directory exists
  const pdfDir = path.join(__dirname, '../public/blog-pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  
  const pdfPath = path.join(pdfDir, `${blogSlug}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    printBackground: true
  });
  
  await browser.close();
  console.log(`Generated PDF for ${blogSlug}: ${pdfPath}`);
}

async function generateAllPDFs() {
  console.log('Starting PDF generation for all country blogs...');
  
  for (const blog of blogs) {
    try {
      await generatePDF(blog);
    } catch (error) {
      console.error(`Error generating PDF for ${blog}:`, error);
    }
  }
  
  console.log('PDF generation completed!');
}

generateAllPDFs().catch(console.error); 