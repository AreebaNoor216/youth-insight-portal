import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Youth Insight database seed...');

  // 1. Clean existing records
  await prisma.auditLog.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.publication.deleteMany();
  await prisma.alumniProfile.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.monthlyReport.deleteMany();
  await prisma.cabinetMember.deleteMany();
  await prisma.user.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.university.deleteMany();

  // 2. Create Universities
  const uniHaripur = await prisma.university.create({
    data: {
      name: 'University of Haripur',
      shortName: 'UOH',
      city: 'Haripur',
      province: 'Khyber Pakhtunkhwa',
      country: 'Pakistan',
      logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
      foundedYear: 2012,
      studentCount: 8500,
      website: 'https://uoh.edu.pk'
    }
  });

  const uniNust = await prisma.university.create({
    data: {
      name: 'National University of Sciences and Technology',
      shortName: 'NUST',
      city: 'Islamabad',
      province: 'Islamabad Capital Territory',
      country: 'Pakistan',
      logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
      foundedYear: 1991,
      studentCount: 15000,
      website: 'https://nust.edu.pk'
    }
  });

  const uniLums = await prisma.university.create({
    data: {
      name: 'Lahore University of Management Sciences',
      shortName: 'LUMS',
      city: 'Lahore',
      province: 'Punjab',
      country: 'Pakistan',
      logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=1200&auto=format&fit=crop&q=80',
      foundedYear: 1985,
      studentCount: 5000,
      website: 'https://lums.edu.pk'
    }
  });

  const uniQau = await prisma.university.create({
    data: {
      name: 'Quaid-i-Azam University',
      shortName: 'QAU',
      city: 'Islamabad',
      province: 'Islamabad Capital Territory',
      country: 'Pakistan',
      logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
      foundedYear: 1967,
      studentCount: 13000,
      website: 'https://qau.edu.pk'
    }
  });

  const uniFast = await prisma.university.create({
    data: {
      name: 'FAST National University',
      shortName: 'FAST Peshawar',
      city: 'Peshawar',
      province: 'Khyber Pakhtunkhwa',
      country: 'Pakistan',
      logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
      foundedYear: 2000,
      studentCount: 4000,
      website: 'https://pwr.nu.edu.pk'
    }
  });

  // 3. Create Chapters
  const chapterHaripur = await prisma.chapter.create({
    data: {
      slug: 'haripur',
      name: 'Youth Insight Haripur Chapter',
      universityId: uniHaripur.id,
      status: 'ACTIVE',
      volunteerCount: 68,
      eventsCount: 19,
      impactScore: 95,
      complianceScore: 98,
      streakMonths: 7,
      bio: 'The pioneering Hazara division chapter driving student empowerment, leadership incubation, and intellectual discourse at the University of Haripur.',
      meetingSchedule: 'Every Tuesday & Thursday, 4:00 PM at Student Activity Center',
      location: 'University of Haripur Campus, Haripur, KPK',
      contactEmail: 'haripur@youthinsight.pk',
      coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'
    }
  });

  const chapterNust = await prisma.chapter.create({
    data: {
      slug: 'nust-islamabad',
      name: 'Youth Insight NUST Islamabad Chapter',
      universityId: uniNust.id,
      status: 'ACTIVE',
      volunteerCount: 110,
      eventsCount: 28,
      impactScore: 98,
      complianceScore: 100,
      streakMonths: 12,
      bio: 'Fostering tech-driven youth initiatives, Model UN simulations, and character-building symposia across NUST H-12 campus.',
      meetingSchedule: 'Wednesdays at 5:00 PM, C3A Seminar Hall',
      location: 'NUST H-12 Campus, Islamabad',
      contactEmail: 'nust@youthinsight.pk',
      coverImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80'
    }
  });

  const chapterLums = await prisma.chapter.create({
    data: {
      slug: 'lums-lahore',
      name: 'Youth Insight LUMS Chapter',
      universityId: uniLums.id,
      status: 'ACTIVE',
      volunteerCount: 84,
      eventsCount: 15,
      impactScore: 91,
      complianceScore: 94,
      streakMonths: 5,
      bio: 'Promoting social literature, ethical dialogue, and national student bootcamps at LUMS.',
      meetingSchedule: 'Mondays at 6:00 PM, SDSB Discussion Lounge',
      location: 'DHA Phase 5, Cantt, Lahore',
      contactEmail: 'lums@youthinsight.pk',
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80'
    }
  });

  const chapterFast = await prisma.chapter.create({
    data: {
      slug: 'fast-peshawar',
      name: 'Youth Insight FAST Peshawar Chapter',
      universityId: uniFast.id,
      status: 'ACTIVE',
      volunteerCount: 52,
      eventsCount: 11,
      impactScore: 89,
      complianceScore: 92,
      streakMonths: 4,
      bio: 'Empowering future technologists with strong social responsibility and public speaking excellence.',
      meetingSchedule: 'Thursdays at 3:30 PM, Main Auditorium',
      location: 'Industrial Estate, Hayatabad, Peshawar',
      contactEmail: 'fast-pwr@youthinsight.pk',
      coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80'
    }
  });

  // 4. Create Users (Presidents, Admin, Central)
  const presidentHaripur = await prisma.user.create({
    data: {
      email: 'president@haripur.youthinsight.pk',
      passwordHash: 'SecurePassword123!',
      name: 'Daniyal Khan',
      role: 'CHAPTER_PRESIDENT',
      phone: '+92 312 9876543',
      chapterId: chapterHaripur.id,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    }
  });

  const adminSuper = await prisma.user.create({
    data: {
      email: 'admin@youthinsight.pk',
      passwordHash: 'AdminPass123!',
      name: 'Syed Hamza Ali (Central President)',
      role: 'SUPER_ADMIN',
      phone: '+92 300 1234567',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    }
  });

  const centralLead = await prisma.user.create({
    data: {
      email: 'cabinet@youthinsight.pk',
      passwordHash: 'CabinetPass123!',
      name: 'Amina Rehman (Director Chapter Affairs)',
      role: 'CENTRAL_CABINET',
      phone: '+92 333 5554433',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    }
  });

  // 5. Create Cabinet Members for Haripur Chapter
  await prisma.cabinetMember.createMany({
    data: [
      {
        chapterId: chapterHaripur.id,
        name: 'Daniyal Khan',
        roleTitle: 'Chapter President',
        roleCategory: 'PRESIDENT',
        department: 'Executive Board',
        email: 'president@haripur.youthinsight.pk',
        phone: '+92 312 9876543',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        tenureYear: '2025-2026',
        bio: 'Final year BS Computer Science. Leading strategic growth, society alignments, and campus mentorship initiatives.',
        order: 1
      },
      {
        chapterId: chapterHaripur.id,
        name: 'Ayesha Tariq',
        roleTitle: 'Vice President',
        roleCategory: 'VICE_PRESIDENT',
        department: 'Executive Board',
        email: 'ayesha.t@haripur.youthinsight.pk',
        phone: '+92 313 1122334',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        tenureYear: '2025-2026',
        bio: 'BS Management Sciences. Overseeing inter-departmental operations, workshop designs, and university liaison.',
        order: 2
      },
      {
        chapterId: chapterHaripur.id,
        name: 'Muhammad Usman',
        roleTitle: 'General Secretary',
        roleCategory: 'GENERAL_SECRETARY',
        department: 'Secretariat',
        email: 'usman.m@haripur.youthinsight.pk',
        phone: '+92 314 5566778',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        tenureYear: '2025-2026',
        bio: 'BS English Literature. Managing official correspondence, meeting minutes, monthly reporting, and compliance documentation.',
        order: 3
      },
      {
        chapterId: chapterHaripur.id,
        name: 'Zainab Bibi',
        roleTitle: 'Head of Media & Publications',
        roleCategory: 'DEPARTMENT_LEAD',
        department: 'Media & PR',
        email: 'zainab.media@haripur.youthinsight.pk',
        phone: '+92 315 9988776',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        tenureYear: '2025-2026',
        bio: 'Lead creative designer and editor for chapter magazines, event recaps, and video reels.',
        order: 4
      },
      {
        chapterId: chapterHaripur.id,
        name: 'Hamza Ali',
        roleTitle: 'Head of Outreach & PR',
        roleCategory: 'DEPARTMENT_LEAD',
        department: 'Outreach',
        email: 'hamza.outreach@haripur.youthinsight.pk',
        phone: '+92 316 4433221',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
        tenureYear: '2025-2026',
        bio: 'Directing community partnership programs, school outreach drives, and sponsor onboarding.',
        order: 5
      },
      {
        chapterId: chapterHaripur.id,
        name: 'Bilal Ahmed',
        roleTitle: 'Head of Logistics & Operations',
        roleCategory: 'DEPARTMENT_LEAD',
        department: 'Logistics',
        email: 'bilal.ops@haripur.youthinsight.pk',
        phone: '+92 317 2233445',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
        tenureYear: '2025-2026',
        bio: 'Managing event venues, audio/visual setups, stage coordination, and guest protocol.',
        order: 6
      }
    ]
  });

  // 6. Create Monthly Reports for Haripur Chapter
  await prisma.monthlyReport.create({
    data: {
      reportNumber: 'REP-HAR-2026-08',
      chapterId: chapterHaripur.id,
      month: 'August',
      year: 2026,
      title: 'Hazara Youth Leadership Drive & Character Building Symposium',
      eventSummary: 'Conducted a 2-day interactive workshop on ethical leadership with 250+ university students and local college representatives. Featured 3 guest speakers and keynote address by Dean of Sciences.',
      attendanceCount: 265,
      targetAchievements: 'Achieved 120% of volunteer intake quota; Launched the "Haripur Green Campus" tree plantation initiative; Collected 45 mentorship requests.',
      speakerDetails: '1. Dr. Farooq Khan (Keynote on Moral Reasoning)\n2. Ms. Ayesha Noor (Leadership in Tech)\n3. Prof. Tariq Mansoor (Youth Civic Duty)',
      feedbackRating: 4.9,
      complianceScore: 98,
      financialBudget: 45000,
      financialSpent: 42300,
      financialNotes: 'All venue, sound, and refreshment expenses accounted for. PKR 2,700 surplus carried forward to September budget.',
      mediaDriveLinks: 'https://drive.google.com/drive/folders/youthinsight-haripur-aug-2026',
      status: 'APPROVED',
      adminFeedback: 'Outstanding execution and meticulous financial reconciliation. Recommended as a benchmark model for regional chapters.',
      submittedByEmail: 'president@haripur.youthinsight.pk',
      submittedAt: new Date('2026-08-25T14:30:00Z'),
      reviewedAt: new Date('2026-08-27T09:15:00Z')
    }
  });

  await prisma.monthlyReport.create({
    data: {
      reportNumber: 'REP-HAR-2026-07',
      chapterId: chapterHaripur.id,
      month: 'July',
      year: 2026,
      title: 'Summer Youth Dialogue on Ethics & Digital Literacy',
      eventSummary: 'Focused on digital safety, constructive content creation, and critical thinking in an online world.',
      attendanceCount: 180,
      targetAchievements: 'Trained 180 students; Onboarded 12 new core volunteers; Established collaboration with Department of IT.',
      speakerDetails: 'Engr. Salman Raza (Cyber Ethics Specialist)',
      feedbackRating: 4.7,
      complianceScore: 95,
      financialBudget: 30000,
      financialSpent: 29500,
      financialNotes: 'Audited and cleared by Central Finance.',
      mediaDriveLinks: 'https://drive.google.com/drive/folders/youthinsight-haripur-jul-2026',
      status: 'APPROVED',
      adminFeedback: 'Timely submission and good attendance.',
      submittedByEmail: 'president@haripur.youthinsight.pk',
      submittedAt: new Date('2026-07-28T16:00:00Z'),
      reviewedAt: new Date('2026-07-30T11:00:00Z')
    }
  });

  // 7. Create Events
  const event1 = await prisma.event.create({
    data: {
      slug: 'national-leadership-bootcamp-2026',
      title: 'National Youth Leadership Bootcamp 2026',
      scope: 'NATIONAL',
      category: 'Leadership Bootcamps',
      description: 'A transformative 3-day residential summit gathering 300+ university chapter leaders, policy makers, and industry icons to forge actionable nation-building blueprints.',
      themeStatement: 'Empowered Character, Collective Resilience, Future Vision',
      date: 'September 20-22, 2026',
      time: '09:00 AM - 06:00 PM',
      location: 'Islamabad Convention Center, Islamabad',
      venue: 'Jinnah Auditorium & Hall B',
      coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80',
      speakersJson: JSON.stringify([
        { name: 'Dr. Tariq Rehman', role: 'Distinguished Sociologist & Author', topic: 'The Architecture of Public Ethics' },
        { name: 'Sana Mir', role: 'Former National Captain & Youth Icon', topic: 'Resilience and Team Synergy Under Pressure' },
        { name: 'Dr. Bilal Qureshi', role: 'Tech Entrepreneur & Angel Investor', topic: 'AI & Sustainable Social Enterprise' }
      ]),
      agendaJson: JSON.stringify([
        { time: 'Day 1: 09:00 AM', title: 'Registration & Grand Inauguration' },
        { time: 'Day 1: 02:00 PM', title: 'Keynote & Executive Roundtable' },
        { time: 'Day 2: 10:00 AM', title: 'Chapter Innovation Pitch Competition' },
        { time: 'Day 3: 03:00 PM', title: 'Award Gala & National Cabinet Oath' }
      ]),
      keyTakeaways: 'Executive strategy handbook, 1-on-1 mentor matching, certified leadership credentials, and national networking directory access.',
      status: 'UPCOMING'
    }
  });

  const event2 = await prisma.event.create({
    data: {
      slug: 'soul-talks-haripur',
      title: 'Soul Talks: Building Moral Resilience in Changing Times',
      scope: 'CHAPTER',
      chapterId: chapterHaripur.id,
      category: 'Soul Talks',
      description: 'An intimate, soul-stirring conversation on mental clarity, purpose-driven ambition, and maintaining moral compass amid contemporary challenges.',
      themeStatement: 'Anchoring the Soul in Pursuit of Knowledge',
      date: 'October 10, 2026',
      time: '02:00 PM - 05:30 PM',
      location: 'Main Auditorium, University of Haripur',
      venue: 'Auditorium Hall 1',
      coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80',
      speakersJson: JSON.stringify([
        { name: 'Prof. Zia-ul-Haq', role: 'Philosopher & Character Educator', topic: 'The Journey Inward' },
        { name: 'Dr. Hina Kashif', role: 'Clinical Psychologist', topic: 'Managing Academic Anxiety & Spiritual Grounding' }
      ]),
      agendaJson: JSON.stringify([
        { time: '02:00 PM', title: 'Welcome Address by Chapter President Daniyal Khan' },
        { time: '02:30 PM', title: 'Soul Talks Keynote Session' },
        { time: '04:00 PM', title: 'Open Floor Q&A and Reflective Dialogue' },
        { time: '05:00 PM', title: 'Networking Tea & Book Stall' }
      ]),
      keyTakeaways: 'Reflective self-audit framework, mindfulness strategies, guided reading list, and community support circle.',
      status: 'UPCOMING'
    }
  });

  const event3 = await prisma.event.create({
    data: {
      slug: 'yimun-2026',
      title: 'Youth Insight Model United Nations (YIMUN 2026)',
      scope: 'NATIONAL',
      category: 'Model United Nations',
      description: 'Pakistan’s premier student diplomatic simulation fostering multilateral negotiations, crisis management, and international diplomacy.',
      themeStatement: 'Diplomacy in an Era of Global Polycrisis',
      date: 'November 14-16, 2026',
      time: '09:30 AM - 05:00 PM',
      location: 'NUST H-12 Campus, Islamabad',
      venue: 'NIC Auditorium & Seminar Wings',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
      speakersJson: JSON.stringify([
        { name: 'Ambassador (R) Jalil Abbas Jilani', role: 'Former Foreign Secretary', topic: 'Realpolitik & Multilateral Coalitions' }
      ]),
      agendaJson: JSON.stringify([
        { time: 'Day 1: 09:30 AM', title: 'Opening Plenary & Committee Sessions' },
        { time: 'Day 2: 10:00 AM', title: 'Crisis Simulations & Draft Resolutions' },
        { time: 'Day 3: 02:00 PM', title: 'General Assembly Vote & Best Delegate Awards' }
      ]),
      keyTakeaways: 'Diplomatic draft resolution portfolio, public speaking commendations, and international relations network.',
      status: 'UPCOMING'
    }
  });

  // 8. Create Alumni Profiles
  await prisma.alumniProfile.createMany({
    data: [
      {
        fullName: 'Dr. Sarah Ahmed',
        email: 'sarah.ahmed@alum.youthinsight.pk',
        currentRole: 'Principal Cloud Architect',
        currentCompany: 'Microsoft (EMEA Region)',
        industry: 'Cloud Computing & Enterprise AI',
        graduationYear: 2021,
        universityName: 'NUST Islamabad',
        pastCabinetRoles: 'Central Cabinet Vice President (2020-2021)',
        bio: 'Passionate about mentoring young engineers in distributed systems, leadership ethics, and international graduate scholarships.',
        linkedinUrl: 'https://linkedin.com/in/sarah-ahmed-cloud',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        availableForMentorship: true
      },
      {
        fullName: 'Farhan Qureshi',
        email: 'farhan.q@alum.youthinsight.pk',
        currentRole: 'Senior Policy Specialist',
        currentCompany: 'UNDP Pakistan',
        industry: 'Sustainable Development & Governance',
        graduationYear: 2019,
        universityName: 'University of Haripur',
        pastCabinetRoles: 'Founding President, Haripur Chapter (2018-2019)',
        bio: 'Working on youth climate policy and public sector innovations. Dedicated to guiding students entering public service and development sector.',
        linkedinUrl: 'https://linkedin.com/in/farhan-qureshi-dev',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        availableForMentorship: true
      },
      {
        fullName: 'Zainab Mustafa',
        email: 'zainab.m@alum.youthinsight.pk',
        currentRole: 'Senior Product Manager',
        currentCompany: 'Careem / Uber Group',
        industry: 'FinTech & Product Management',
        graduationYear: 2022,
        universityName: 'LUMS Lahore',
        pastCabinetRoles: 'General Secretary, LUMS Chapter (2021-2022)',
        bio: 'Mentoring on product thinking, breaking into high-growth tech companies, and leading cross-functional teams.',
        linkedinUrl: 'https://linkedin.com/in/zainab-mustafa-pm',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
        availableForMentorship: true
      }
    ]
  });

  // 9. Create Publications & Articles
  await prisma.publication.createMany({
    data: [
      {
        slug: 'foundations-of-ethical-youth-leadership',
        title: 'The Foundations of Ethical Youth Leadership in the 21st Century',
        category: 'Character Building',
        authorName: 'Syed Hamza Ali',
        authorRole: 'Central President, Youth Insight',
        readTime: '6 min read',
        coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
        summary: 'How student leaders can cultivate steadfast character, intellectual humility, and public empathy in high-pressure organizational environments.',
        content: `True leadership is not measured by the applause one receives, but by the integrity maintained when decisions are difficult. In this treatise, we explore three pillars of ethical youth leadership: First, Moral Grounding; Second, Service-First Governance; and Third, Intellectual Discipline.`
      },
      {
        slug: 'social-literature-reviving-intellectual-circles',
        title: 'Reviving Social Literature & Book Circles in Pakistani Universities',
        category: 'Social Literature',
        authorName: 'Muhammad Usman',
        authorRole: 'General Secretary, Haripur Chapter',
        readTime: '5 min read',
        coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
        summary: 'Why structured campus book circles are crucial for counteracting digital distraction and fostering deep civic consciousness.',
        content: `When students read together, they think together. In an age dominated by 15-second soundbites, returning to classic and modern social literature provides university students with the critical lens required to navigate complex societal problems.`
      },
      {
        slug: 'whitepaper-multi-university-chapter-ecosystems',
        title: 'Whitepaper: Scaling Decentralized Youth Movements Across Nationwide Campuses',
        category: 'White Paper',
        authorName: 'Amina Rehman',
        authorRole: 'Director Chapter Affairs',
        readTime: '10 min read',
        coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
        summary: 'A governance and reporting framework for ensuring transparency, KPI adherence, and autonomous impact across 50+ university chapters.',
        content: `Decentralization without accountability leads to drift; centralization without local autonomy leads to apathy. The Youth Insight governance model balances these forces through rigorous monthly reporting, peer review, and digital tracking.`
      }
    ]
  });

  console.log('✅ Seed completed successfully!');
  console.log('Credentials:');
  console.log('  President: president@haripur.youthinsight.pk / SecurePassword123!');
  console.log('  Admin: admin@youthinsight.pk / AdminPass123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
