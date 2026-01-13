# Aman Singh - Personal Portfolio

A modern, animated personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features an AI-powered chatbot that answers questions about my career.

## Live Site

Deployed on Vercel (link to be updated after deployment)

## Features

- **Interactive Avatar** - SVG avatar with mouse-tracking eyes, natural eyebrow movement, and fun expressions
- **AI Chatbot** - Ask questions about my career, powered by Claude API with thinking cloud animation
- **Smooth Animations** - Page transitions and scroll-triggered animations using Framer Motion
- **Responsive Design** - Mobile-first design that works across all devices
- **Glassmorphism UI** - Modern glass-effect components with subtle shadows
- **SEO Optimized** - Full meta tags, Open Graph, and Twitter cards

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Claude API (Anthropic)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key (for chatbot)

### Installation

```bash
# Clone the repository
git clone https://github.com/simanam/aman-singh.git

# Navigate to the project
cd aman-singh

# Install dependencies
npm install

# Copy environment file and add your API key
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Create production build
npm run build

# Start production server
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # AI chatbot API endpoint
│   ├── globals.css           # Global styles and Tailwind config
│   ├── layout.tsx            # Root layout with SEO metadata
│   └── page.tsx              # Main page component
├── components/
│   ├── InteractiveAvatar.tsx # Animated SVG avatar with thinking cloud
│   ├── ChatBot.tsx           # AI chatbot UI component
│   ├── Navigation.tsx        # Responsive navbar
│   ├── Hero.tsx              # Hero section
│   ├── About.tsx             # About & timeline
│   ├── Expertise.tsx         # Skills & expertise
│   ├── Projects.tsx          # Project showcase
│   ├── Contact.tsx           # Contact section
│   └── Footer.tsx            # Footer
public/
├── favicon.svg               # Site favicon
├── og-image.png              # Open Graph image
├── background.svg            # Background pattern
└── Aman_Singh_Resume.docx    # Downloadable resume
```

## Deployment to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the project
3. Add environment variable:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key
4. Deploy!

## AI Chatbot Features

- **Career-focused responses** - Only answers questions about my professional background
- **Rate limiting** - 10 requests per minute per IP to prevent abuse
- **Message length limit** - 500 character max to prevent prompt injection
- **Guardrails** - Politely declines off-topic questions

## Author

**Aman Singh**
- LinkedIn: [linkedin.com/in/amand-singh](https://www.linkedin.com/in/amand-singh/)
- GitHub: [github.com/simanam](https://github.com/simanam)
- Email: aman@logixtecs.com
