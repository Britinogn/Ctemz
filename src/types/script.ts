export interface User {
    id:string ;
    name:string;
    email:string;
    password:string;
    profileImage?:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface AuthResponse  {
    token: string;
    user: User;
}

export interface ImageData {
  url: string | null;
  public_id: string | null;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveURL: string;
  imageURL: ImageData[]; // Use the specific type
  category?: string;
  yearBuilt?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
    _id: string;
    title: string;
    description: string;
    url: string;
    platform: string;
    imageURL: {
        url: string;
        public_id: string;
    };
    published: boolean;
    publishedAt: Date;
    createdAt: string;
    updatedAt: string;
}

export interface Contact {
    id: string; 
    _id:string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface GithubStats {
    id:string
    username: string;
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    followers: number;
    following: number;
    languages: string[];
    avatarUrl?: string;
    bio?: string;
    location?: string;
    company?: string;
    blog?: string;
    lastUpdated: Date;
}

export interface DashboardStats {
    totalProjects: number;
    totalBlogs: number;
    totalContacts: number;
    totalSkills: number;
    publishedProjects: number;
    publishedBlogs: number;
    unreadContacts: number;
    github?: GithubStats;
}

export interface DashboardData {
    stats: DashboardStats;
    github: GithubStats| null;
    projects: Project[];
    blogs: Blog[];
    contacts: Contact;
  //skills: Skill[];
}

export interface RecentActivity {
    id: string;
    type: 'project' | 'blog' | 'contact' | 'github';
    createdAt: string;
    title?: string;
    name?: string;
    email?: string;
    message?: string;
}

// Recent activity type (for projects/blogs in lists)
export interface ActivityItem {
    _id: string
    title: string
    description?: string
    createdAt: string
    updatedAt?: string
  // Add fields like category, status if needed from API
}