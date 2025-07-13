const fs = require('fs');
const path = require('path');

const blogs = [
  { slug: 'australia-blog', name: 'Australia', flag: '🇦🇺' },
  { slug: 'uk-blog', name: 'United Kingdom', flag: '🇬🇧' },
  { slug: 'canada-blog', name: 'Canada', flag: '🇨🇦' },
  { slug: 'usa-blog', name: 'United States', flag: '🇺🇸' },
  { slug: 'germany-blog', name: 'Germany', flag: '🇩🇪' },
  { slug: 'china-blog', name: 'China', flag: '🇨🇳' },
  { slug: 'new-zealand-blog', name: 'New Zealand', flag: '🇳🇿' },
  { slug: 'portugal-blog', name: 'Portugal', flag: '🇵🇹' },
  { slug: 'spain-blog', name: 'Spain', flag: '🇪🇸' },
  { slug: 'france-blog', name: 'France', flag: '🇫🇷' },
  { slug: 'malta-blog', name: 'Malta', flag: '🇲🇹' }
];

function createSocialMediaVisual(blog) {
  // Ensure social media directory exists
  const socialDir = path.join(__dirname, '../public/social-media');
  if (!fs.existsSync(socialDir)) {
    fs.mkdirSync(socialDir, { recursive: true });
  }
  
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${blog.name} Study Abroad Guide</title>
  <style>
    body { 
      margin: 0; 
      padding: 0; 
      font-family: 'Arial', sans-serif; 
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
      width: 1200px;
      height: 630px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      max-width: 1000px;
      margin: 20px;
    }
    .flag {
      font-size: 80px;
      margin-bottom: 20px;
    }
    .title {
      font-size: 48px;
      font-weight: bold;
      color: #1e40af;
      margin-bottom: 20px;
      line-height: 1.2;
    }
    .subtitle {
      font-size: 24px;
      color: #374151;
      margin-bottom: 30px;
    }
    .features {
      display: flex;
      justify-content: space-around;
      margin: 30px 0;
      flex-wrap: wrap;
    }
    .feature {
      background: #f3f4f6;
      padding: 15px 20px;
      border-radius: 10px;
      margin: 5px;
      font-size: 16px;
      color: #374151;
    }
    .logo {
      font-size: 20px;
      color: #1e40af;
      font-weight: bold;
      margin-top: 30px;
    }
    .cta {
      background: #1e40af;
      color: white;
      padding: 15px 30px;
      border-radius: 25px;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      margin-top: 20px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="flag">${blog.flag}</div>
    <h1 class="title">Study in ${blog.name}</h1>
    <p class="subtitle">Complete Guide for Nepali Students</p>
    
    <div class="features">
      <div class="feature">🏫 Top Universities</div>
      <div class="feature">💰 Scholarships</div>
      <div class="feature">📋 Visa Guide</div>
      <div class="feature">💼 Work Rights</div>
      <div class="feature">🏠 Cost of Living</div>
      <div class="feature">🎯 PR Pathways</div>
    </div>
    
    <div class="logo">Alpine Education & Visa Services</div>
    <div class="cta">Read Complete Guide</div>
  </div>
</body>
</html>
  `;
  
  const htmlPath = path.join(socialDir, `${blog.slug}-social.html`);
  fs.writeFileSync(htmlPath, htmlContent);
  
  console.log(`Created social media visual for ${blog.name}: ${htmlPath}`);
}

function createAllSocialMediaVisuals() {
  console.log('Creating social media visuals for all country blogs...');
  
  for (const blog of blogs) {
    try {
      createSocialMediaVisual(blog);
    } catch (error) {
      console.error(`Error creating visual for ${blog.name}:`, error);
    }
  }
  
  console.log('Social media visuals created successfully!');
  console.log('Note: These are HTML files that can be converted to images using browser screenshot or online tools.');
}

createAllSocialMediaVisuals(); 