# Contributing to AI SaaS Platform

Thank you for your interest in contributing to the AI SaaS Platform! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

### Suggesting Features

1. Check if the feature has already been requested
2. Create a new issue using the feature request template
3. Clearly describe the feature and its benefits
4. Consider implementation complexity and project scope

### Contributing Code

#### Prerequisites

- Node.js 18+
- Git
- Familiarity with Next.js, TypeScript, and React

#### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   \`\`\`bash
   git clone https://github.com/rambodalemi/Ai
   cd ai-saas-platform
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Set up environment variables (see SETUP.md)
5. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

#### Making Changes

1. Create a new branch:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`
2. Make your changes
3. Follow coding standards:
   - Use TypeScript
   - Follow existing code style
   - Add comments for complex logic
   - Write meaningful commit messages
4. Test your changes:
   \`\`\`bash
   npm run lint
   npm run type-check
   \`\`\`
5. Commit your changes:
   \`\`\`bash
   git commit -m "feat: add new feature description"
   \`\`\`

#### Commit Message Format

Use conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

#### Pull Request Process

1. Push your branch to your fork:
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`
2. Create a Pull Request from your fork to the main repository
3. Fill out the PR template completely
4. Ensure all checks pass
5. Wait for review and address feedback

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Use meaningful variable and function names
- Add JSDoc comment
