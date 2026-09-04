import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const MonthlyReportSchema = z.object({
  reportNumber: z.string().optional(),
  chapterId: z.string().min(1, 'Chapter is required'),
  month: z.string().min(1, 'Month is required'),
  year: z.number().int().min(2020).max(2030),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  eventSummary: z.string().min(20, 'Please provide an event summary of at least 20 characters'),
  attendanceCount: z.number().int().min(0, 'Attendance count cannot be negative'),
  targetAchievements: z.string().min(10, 'Please detail key achievements'),
  speakerDetails: z.string().optional(),
  feedbackRating: z.number().min(1).max(5).default(4.8),
  complianceScore: z.number().min(0).max(100).default(95),
  financialBudget: z.number().min(0).default(0),
  financialSpent: z.number().min(0).default(0),
  financialNotes: z.string().optional(),
  mediaDriveLinks: z.string().url('Must be a valid URL (e.g. Google Drive / Dropbox)').or(z.literal('')).optional(),
  status: z.enum(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'REVISION_REQUESTED', 'APPROVED']).default('SUBMITTED'),
});

export const EventRegistrationSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  universityName: z.string().min(2, 'University name is required'),
  department: z.string().optional(),
});

export const ContactFormSchema = z.object({
  fullName: z.string().min(3, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  departmentRouting: z.enum(['PR', 'MARKETING', 'HR', 'CHAPTERS', 'GENERAL']).default('GENERAL'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(15, 'Message must be at least 15 characters'),
});

export const MentorshipInquirySchema = z.object({
  alumniId: z.string().min(1, 'Alumni selection is required'),
  studentName: z.string().min(3, 'Name is required'),
  studentEmail: z.string().email('Valid email is required'),
  chapterOrUni: z.string().min(2, 'University or Chapter is required'),
  careerGoal: z.string().min(10, 'Please describe your career goal or question'),
});
