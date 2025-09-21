# FTP Seer Client 🔍

A modern, responsive web interface for exploring FTP directories. Built with **Astro** and **Tailwind CSS**.

> This is a modern reimagining of the original [SvelteJS version](https://github.com/m3yevn/ftp-seer-client)

## ✨ Features

- **🚀 Blazing Fast** - Built with Astro for lightning-fast performance
- **📱 Mobile First** - Fully responsive design that works on all devices
- **🎨 Modern UI** - Beautiful interface with Tailwind CSS and glassmorphism effects
- **🔍 Directory Browser** - Explore FTP directories with an intuitive file manager
- **📄 File Viewer** - View file contents directly in the browser
- **🔗 API Integration** - Seamlessly integrates with the [FTP Seer API](https://ftp-seer-api.vercel.app/)

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Visit `http://localhost:4321` for the landing page
   - Visit `http://localhost:4321/demo` for the interactive FTP explorer

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
  pages/
    index.astro    # Landing page with features and info
    demo.astro     # Interactive FTP directory explorer
public/
  favicon.svg      # Custom favicon
```

## 🔧 Tech Stack

- **[Astro](https://astro.build/)** - Modern static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[FTP Seer API](https://ftp-seer-api.vercel.app/)** - Backend API for FTP operations

## 🌐 API Integration

This client integrates with the FTP Seer API to provide:

- **Directory Listing** - Browse FTP directories
- **File Viewing** - Read file contents
- **Multiple Server Support** - DriveHQ, Rebex Test, and custom servers

### API Endpoints Used:
- `GET /api/directory` - List directory contents
- `GET /api/file` - Get file content

## 🎯 Demo

Try the interactive demo at `/demo` to explore FTP directories:

1. **Select a server** - Choose from DriveHQ, Rebex Test, or enter custom details
2. **Browse directories** - Navigate through folders and files
3. **View files** - Click on files to view their contents
4. **Navigate** - Use breadcrumbs and back button for easy navigation

## 📱 Mobile Responsive

The application is fully responsive and optimized for:
- 📱 Mobile phones
- 📟 Tablets  
- 💻 Desktop computers
- 🖥️ Large screens

## 🔗 Links

- **Original SvelteJS Version**: [m3yevn/ftp-seer-client](https://github.com/m3yevn/ftp-seer-client)
- **FTP Seer API**: [ftp-seer-api.vercel.app](https://ftp-seer-api.vercel.app/)
- **Author**: [m3yevn](https://github.com/m3yevn)

## 📄 License

MIT License - feel free to use this project for your own needs!
