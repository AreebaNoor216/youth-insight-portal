'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { LoginSchema, MonthlyReportSchema, EventRegistrationSchema, ContactFormSchema } from '@/lib/validators';
import { setSessionCookie, clearSessionCookie } from '@/lib/auth';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const validated = LoginSchema.safeParse({ email, password });
  if (!validated.success) {
    return { error: validated.error.errors[0]?.message || 'Invalid form input' };
  }

  // Find user in DB
  const user = await prisma.user.findUnique({
    where: { email: validated.data.email },
    include: { chapter: true }
  });

  if (!user || user.passwordHash !== validated.data.password) {
    return { error: 'Invalid email or password. Please check your credentials.' };
  }

  // Set session cookie
  setSessionCookie({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    chapterId: user.chapterId,
    chapterSlug: user.chapter?.slug,
    chapterName: user.chapter?.name,
  });

  const redirectUrl = user.role === 'SUPER_ADMIN' || user.role === 'CENTRAL_CABINET'
    ? '/admin'
    : '/portal/dashboard';

  return { success: true, redirectUrl };
}

export async function logoutAction() {
  clearSessionCookie();
  return { success: true };
}

export async function submitMonthlyReportAction(data: any) {
  try {
    const validated = MonthlyReportSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const val = validated.data;
    const reportNumber = val.reportNumber || `REP-${Date.now().toString().slice(-6)}`;

    // Create report
    const report = await prisma.monthlyReport.create({
      data: {
        reportNumber,
        chapterId: val.chapterId,
        month: val.month,
        year: Number(val.year),
        title: val.title,
        eventSummary: val.eventSummary,
        attendanceCount: Number(val.attendanceCount),
        targetAchievements: val.targetAchievements,
        speakerDetails: val.speakerDetails || '',
        feedbackRating: Number(val.feedbackRating) || 4.8,
        complianceScore: Number(val.complianceScore) || 95,
        financialBudget: Number(val.financialBudget) || 0,
        financialSpent: Number(val.financialSpent) || 0,
        financialNotes: val.financialNotes || '',
        mediaDriveLinks: val.mediaDriveLinks || '',
        status: val.status || 'SUBMITTED',
        submittedByEmail: 'president@haripur.youthinsight.pk',
        submittedAt: new Date()
      }
    });

    // Update chapter streak & stats
    await prisma.chapter.update({
      where: { id: val.chapterId },
      data: {
        eventsCount: { increment: 1 },
        streakMonths: { increment: 1 },
        complianceScore: Math.min(100, (Number(val.complianceScore) || 95))
      }
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userEmail: 'president@haripur.youthinsight.pk',
        action: 'SUBMIT_MONTHLY_REPORT',
        entity: 'MonthlyReport',
        entityId: report.id,
        details: `Submitted report ${report.reportNumber} for ${val.month} ${val.year}`
      }
    });

    revalidatePath('/portal/dashboard');
    revalidatePath('/portal/reports');
    revalidatePath('/admin/reports');

    return { success: true, reportId: report.id, reportNumber: report.reportNumber };
  } catch (err: any) {
    console.error('Error submitting report:', err);
    return { success: false, error: err.message || 'Failed to submit report' };
  }
}

export async function updateReportStatusAction(reportId: string, status: string, adminFeedback: string) {
  try {
    const updated = await prisma.monthlyReport.update({
      where: { id: reportId },
      data: {
        status,
        adminFeedback,
        reviewedAt: new Date()
      }
    });

    await prisma.auditLog.create({
      data: {
        userEmail: 'admin@youthinsight.pk',
        action: `REPORT_${status}`,
        entity: 'MonthlyReport',
        entityId: reportId,
        details: `Status set to ${status}. Feedback: ${adminFeedback}`
      }
    });

    revalidatePath('/admin/reports');
    revalidatePath('/portal/reports');
    revalidatePath('/portal/dashboard');

    return { success: true, report: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function registerForEventAction(data: any) {
  try {
    const validated = EventRegistrationSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const val = validated.data;
    const qrTicketCode = `YI-TKT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: val.eventId,
        fullName: val.fullName,
        email: val.email,
        phone: val.phone,
        universityName: val.universityName,
        department: val.department || '',
        qrTicketCode,
        status: 'CONFIRMED'
      }
    });

    revalidatePath(`/events`);
    return { success: true, ticketCode: qrTicketCode, registrationId: registration.id };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to complete registration' };
  }
}

export async function submitContactAction(data: any) {
  try {
    const validated = ContactFormSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    await prisma.contactSubmission.create({
      data: validated.data
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to submit form' };
  }
}
