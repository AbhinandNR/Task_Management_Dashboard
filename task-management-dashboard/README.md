# Task Management Dashboard

A modern, responsive task management application built with Next.js, TypeScript, and Tailwind CSS. This frontend-only application provides full CRUD functionality for task management with mock authentication and localStorage persistence.

## 🚀 Features

### Authentication (Mock)
- Simple login page with email and password fields
- Mock authentication with localStorage session management
- Protected dashboard routes with automatic redirect to login

### Task Management
- **Full CRUD Operations**: Create, Read, Update, and Delete tasks
- **Task Properties**: Title, Description, Status, Due Date
- **Status Management**: Todo, In Progress, Completed with visual indicators
- **Responsive Design**: Card view on mobile, Table view on desktop

### Advanced Features
- **Search**: Case-insensitive title search
- **Filtering**: Filter by task status (All, Todo, In Progress, Completed)
- **Sorting**: Sort by due date or title (ascending/descending)
- **Empty States**: User-friendly messages when no tasks are available
- **Data Persistence**: All data stored in localStorage

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode, no `any`)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage
- **Build Tool**: Vite (via Next.js)

## 📁 Project Structure

```
task-management-dashboard/
├── src/
│   ├── app/
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthGuard.tsx     # Route protection
│   │   ├── task/
│   │   │   ├── TaskCard.tsx      # Mobile task display
│   │   │   ├── TaskTable.tsx     # Desktop task display
│   │   │   ├── TaskFormModal.tsx # Create/Edit modal
│   │   │   └── TaskFilters.tsx   # Search/Filter/Sort controls
│   │   └── ui/                   # shadcn/ui components
│   ├── lib/
│   │   ├── types.ts              # TypeScript type definitions
│   │   ├── storage.ts            # localStorage utilities
│   │   ├── taskUtils.ts          # Task filtering/sorting logic
│   │   └── utils.ts              # General utilities
│   └── globals.css               # Global styles
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Usage Guide

### 1. Login
- Navigate to `/login`
- Enter any email and password (no validation required)
- You'll be redirected to the dashboard

### 2. Managing Tasks

#### Create a Task
1. Click the "Add Task" button on the dashboard
2. Fill in the form:
   - **Title**: Task name (required)
   - **Description**: Task details (required)
   - **Status**: Initial status (Todo, In Progress, Completed)
   - **Due Date**: Task deadline (required)
3. Click "Create Task"

#### Edit a Task
1. Click the edit icon (pencil) on any task
2. Modify the fields in the modal
3. Click "Update Task"

#### Delete a Task
- Click the trash icon on any task
- Task is immediately deleted (no confirmation dialog)

#### Change Task Status
- Use the status dropdown in the task row/card
- Changes are saved automatically

### 3. Filtering and Searching

#### Search
- Use the search bar to find tasks by title
- Search is case-insensitive and works in real-time

#### Filter by Status
- Select from the status dropdown:
  - All Status
  - Todo
  - In Progress
  - Completed

#### Sort Tasks
- Choose sorting options:
  - Due Date (Earliest/Latest)
  - Title (A-Z/Z-A)

## 🎨 Design Decisions

### Component Architecture
- **Modular Design**: Each feature is a separate, reusable component
- **Props-Driven**: Components accept props for maximum reusability
- **Type Safety**: Strict TypeScript with proper type definitions

### Responsive Design
- **Mobile-First**: Cards for mobile devices
- **Desktop-Optimized**: Tables for larger screens
- **Tailwind CSS**: Utility-first styling for consistency

### State Management
- **LocalStorage**: Persistent data storage without backend
- **React Hooks**: Modern state management patterns
- **Sync Strategy**: Real-time sync between components and storage

### UI/UX Choices
- **shadcn/ui**: Modern, accessible component library
- **Empty States**: Helpful messages for better user experience
- **Visual Feedback**: Loading states and status indicators
- **Consistent Spacing**: Uniform layout throughout the app

## 🔧 Development Notes

### Key Files
- `src/lib/types.ts`: All TypeScript type definitions
- `src/lib/storage.ts`: localStorage abstraction layer
- `src/lib/taskUtils.ts`: Business logic for filtering/sorting
- `src/components/auth/AuthGuard.tsx`: Route protection logic

### No External State Libraries
The application uses only React's built-in state management:
- `useState` for component state
- `useEffect` for side effects
- Custom localStorage utilities for persistence

### TypeScript Configuration
- Strict mode enabled
- No `any` types used
- Proper interface definitions for all data structures

## 📱 Screenshots

*(Add screenshots here when documenting the application)*

### Login Page
- Clean, centered login form
- Email and password fields
- Responsive design

### Dashboard (Desktop)
- Table view with all task information
- Inline status editing
- Action buttons for edit/delete

### Dashboard (Mobile)
- Card-based layout
- Touch-friendly interface
- Optimized for small screens

### Task Modal
- Form validation
- Create/Edit modes
- Clean modal design

## 🚀 Future Enhancements

### Potential Features
- Dark mode toggle
- Task categories/tags
- Bulk operations (select multiple tasks)
- Task priorities
- File attachments
- Task comments/notes
- Export tasks (CSV/JSON)
- Keyboard shortcuts
- Drag and drop reordering

### Technical Improvements
- Unit tests with Jest/React Testing Library
- E2E tests with Playwright
- PWA capabilities
- Offline support
- Data validation with Zod
- Error boundaries
- Performance optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives

---

Built with ❤️ using modern web technologies
