const fs = require('fs');
const path = require('path');

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

function createPlaceholderPDF(blogSlug) {
  // Ensure PDF directory exists
  const pdfDir = path.join(__dirname, '../public/blog-pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  
  // Create a simple HTML file that can be converted to PDF later
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${blogSlug.replace(/-/g, ' ').toUpperCase()}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    h1 { color: #1e40af; font-size: 28px; margin-bottom: 20px; text-align: center; }
    .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #1e40af; padding-bottom: 20px; }
    .content { margin: 20px 0; }
    .contact { background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .footer { text-align: center; margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Alpine Education & Visa Services</h1>
    <h2>${blogSlug.replace(/-/g, ' ').toUpperCase()} - Study Abroad Guide</h2>
    <p><em>Published: January 2025</em></p>
  </div>
  
  <div class="content">
    <h3>Complete Guide Available Online</h3>
    <p>This is a placeholder for the full PDF guide. The complete guide with detailed information about:</p>
    <ul>
      <li>Top universities and programs</li>
      <li>Scholarship opportunities</li>
      <li>Visa requirements and process</li>
      <li>Cost of living and tuition</li>
      <li>Work opportunities and PR pathways</li>
      <li>Student testimonials and success stories</li>
    </ul>
    <p>Please visit our website to read the complete guide or contact us for personalized counseling.</p>
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
  
  const htmlPath = path.join(pdfDir, `${blogSlug}.html`);
  fs.writeFileSync(htmlPath, htmlContent);
  
  console.log(`Created placeholder HTML for ${blogSlug}: ${htmlPath}`);
}

function createAllPlaceholders() {
  console.log('Creating placeholder files for all country blogs...');
  
  for (const blog of blogs) {
    try {
      createPlaceholderPDF(blog);
    } catch (error) {
      console.error(`Error creating placeholder for ${blog}:`, error);
    }
  }
  
  console.log('Placeholder files created successfully!');
  console.log('Note: These are HTML files that can be converted to PDF using browser print function or online tools.');
}

createAllPlaceholders(); 