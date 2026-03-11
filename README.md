# 🚀 Ritik Gusain - Portfolio (Gear 5 Mode)

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Gear%205%20Mode-00d9ff?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.163.0-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Personal Portfolio Website featuring 3D animations, interactive UI, and real-time visitor tracking**

[🌐 Live Demo](https://portfolio-ritik-gusain.vercel.app) • [📧 Contact Me](mailto:newmining2121@gmail.com) • [💼 LinkedIn](https://www.linkedin.com/in/ritik-gusain-7640a9334/)


</div>

---

## ✨ Features

- 🎨 **3D Interactive Hero Section** - Three.js powered floating particles and animations
- 🌊 **Smooth Animations** - Framer Motion for fluid page transitions
- 💎 **Glassmorphism Design** - Modern UI with glass effects and gradients
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🎯 **Project Showcase** - 3D project cards with hover effects
- 📊 **Visitor Analytics** - Real-time tracking with Supabase
- 📬 **Contact Form** - EmailJS integration for direct messaging
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎭 **Gear 5 Theme** - Inspired by One Piece with heartbeat effects

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.2** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11.18** - Animation library

### 3D Graphics
- **Three.js 0.163** - 3D graphics library
- **@react-three/fiber 8.18** - React renderer for Three.js
- **@react-three/drei 9.122** - Useful helpers for react-three-fiber

### Backend & Services
- **Supabase** - Database and visitor tracking
- **EmailJS** - Contact form email service

### UI Components
- **Lucide React** - Icon library
- **React Icons** - Additional icons
- **GSAP 3.12** - Advanced animations

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ritik-gusain/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

---

## 📦 Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

---

## 🌐 Deployment

This project is configured for easy deployment on **Vercel**.

### Deploy with Vercel

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ritik-gusain/portfolio)

---

## 📂 Project Structure

```
ritik-portfolio/
├── public/
│   ├── gear5-bg.jpg          # Background image
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── About.jsx         # About section
│   │   ├── Contact.jsx       # Contact form
│   │   ├── Experience.jsx    # Experience timeline
│   │   ├── Footer.jsx        # Footer component
│   │   ├── Gear5Particles.jsx # 3D particle effects
│   │   ├── HeartbeatEffect.jsx # Gear 5 heartbeat animation
│   │   ├── Hero3D.jsx        # 3D hero section
│   │   ├── Navigation.jsx    # Navigation bar
│   │   ├── ProjectCard3D.jsx # 3D project cards
│   │   ├── Projects.jsx      # Projects showcase
│   │   ├── ScrollProgress.jsx # Scroll indicator
│   │   ├── Skills.jsx        # Skills section
│   │   └── VisitorTracker.jsx # Analytics tracker
│   ├── hooks/
│   │   ├── useMousePosition.js
│   │   ├── useScrollDepth.js
│   │   ├── useSupabase.js
│   │   └── useVisitorTracking.js
│   ├── lib/
│   │   └── supabase.js       # Supabase client
│   ├── styles/
│   │   └── globals.css       # Global styles
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css
├── .env                      # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json               # Vercel configuration
└── vite.config.js            # Vite configuration
```

---

## 🎨 Key Components

### Hero3D
Interactive 3D hero section with:
- Floating energy particles
- Heartbeat drum effect
- Lightning bolts animation
- Mouse-responsive movements

### ProjectCard3D
3D project cards featuring:
- Tilt effect on hover
- Glassmorphism design
- Status badges
- Live demo and GitHub links

### VisitorTracker
Real-time analytics tracking:
- Visitor count
- Geographic location
- Device information
- Session duration

---

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` with:
- Custom colors (cyan, pink gradients)
- Custom animations
- Extended utilities

### Vite
Optimized build configuration in `vite.config.js`:
- React plugin
- Custom port (3000)
- Fast refresh enabled

---

## 📊 Features Breakdown

| Feature | Technology | Description |
|---------|-----------|-------------|
| 3D Graphics | Three.js + R3F | Interactive 3D elements and animations |
| Animations | Framer Motion | Smooth page transitions and effects |
| Styling | Tailwind CSS | Utility-first responsive design |
| Database | Supabase | Visitor tracking and analytics |
| Email | EmailJS | Contact form functionality |
| Hosting | Vercel | Fast, global CDN deployment |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 About Me

**Ritik Gusain** - Blockchain Developer & AI Engineer

- 🎓 Final-year BCA student at IITM Janakpuri (CGPA: 8.49/10)
- 🔐 Cyfrin Updraft certified in Smart Contract Security
- 🤖 Generative AI Mastermind program graduate
- 💼 100+ P2P escrow transactions facilitated
- 🧩 323 LeetCode problems solved (39 Hard)

### Connect with me:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ritik-gusain)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-00d9ff?style=for-the-badge&logo=google-chrome&logoColor=white)](https://portfolio-ritik-gusain.vercel.app)

---

## 🙏 Acknowledgments

- Inspired by One Piece's Gear 5 transformation
- Three.js community for amazing 3D examples
- Framer Motion for smooth animations
- Vercel for seamless deployment

---

<div align="center">

**⭐ Star this repo if you like it! ⭐**

Made with ❤️ by [Ritik Gusain](https://github.com/Ritik-gusain)

</div>
