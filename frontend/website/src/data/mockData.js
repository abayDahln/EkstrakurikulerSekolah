import p1 from '../assets/static_files/profile/profile_1.jpg';
import p12 from '../assets/static_files/profile/profile_12.jpg';
import p4 from '../assets/static_files/profile/profile_4.jpg';
import p5 from '../assets/static_files/profile/profile_5.jpg';

import cA from '../assets/static_files/certificate/Andiansyah_f89b46168abd4f09bd641b0e11a59141.png';
import cJ from '../assets/static_files/certificate/Jokowi_4022eaa24efb42f79b1237f8bdb239e9.png';

import b1 from '../assets/static_files/documentations/basket1.jpg';
import pr1 from '../assets/static_files/documentations/pramuka1.jpg';

import bb from '../assets/static_files/banner/extracurricular_basket.jpg';
import bp from '../assets/static_files/banner/extracurricular_pramuka.jpg';

const fixPath = (path) => (path.startsWith("/") ? path.substring(1) : path);

const profile1 = fixPath(p1);
const profile12 = fixPath(p12);
const profile4 = fixPath(p4);
const profile5 = fixPath(p5);

const certAndiansyah = fixPath(cA);
const certJokowi = fixPath(cJ);

const basket1 = fixPath(b1);
const pramuka1 = fixPath(pr1);

const bannerBasket = fixPath(bb);
const bannerPramuka = fixPath(bp);

const mockData = {
    auth: {
        login: {
            status: 200,
            message: "Login successful",
            data: {
                token: "demo-token",
                expiredAt: new Date(Date.now() + 86400000).toISOString()
            }
        }
    },
    pembina: {
        profile: {
            status: 200,
            data: {
                id: "pembina-1",
                name: "Budi Santoso",
                email: "budi.santoso@sekolah.demo",
                profileUrl: profile1,
                role: "pembina",
                createdAt: "2024-01-01T00:00:00Z",
                activityStats: {
                    totalManagedExtracurriculars: 2,
                    totalSchedulesCreated: 12,
                    totalStudents: 45,
                    upcomingSchedules: 3
                },
                managedExtracurriculars: [
                    {
                        id: "ekskul-1",
                        name: "Basket",
                        description: "Ekstrakurikuler olahraga bola basket untuk mengembangkan bakat dan kerjasama tim.",
                        imageUrl: bannerBasket,
                        totalMembers: 25,
                        totalSchedules: 6
                    },
                    {
                        id: "ekskul-2",
                        name: "Pramuka",
                        description: "Gerakan kepanduan untuk membentuk karakter mandiri, disiplin, dan cinta alam.",
                        imageUrl: bannerPramuka,
                        totalMembers: 20,
                        totalSchedules: 6
                    }
                ]
            }
        },
        dashboard: {
            status: 200,
            data: {
                totalEkskul: 2,
                totalMember: 45,
                totalJadwal: 12,
                ekskulList: [
                    { name: "Basket", totalMember: 25 },
                    { name: "Pramuka", totalMember: 20 }
                ]
            }
        },
        members: {
            status: 200,
            data: [
                {
                    id: "member-1",
                    name: "Andiansyah",
                    email: "andi@student.demo",
                    profileUrl: profile4,
                    joinDate: "2024-01-15T00:00:00Z",
                    totalPoints: 150,
                    extracurricular: { name: "Basket" }
                },
                {
                    id: "member-2",
                    name: "Jokowi",
                    email: "jokowi@student.demo",
                    profileUrl: profile5,
                    joinDate: "2024-02-01T00:00:00Z",
                    totalPoints: 120,
                    extracurricular: { name: "Pramuka" }
                },
                {
                    id: "member-3",
                    name: "Siti Aminah",
                    email: "siti@student.demo",
                    profileUrl: profile12,
                    joinDate: "2024-03-10T00:00:00Z",
                    totalPoints: 95,
                    extracurricular: { name: "Basket" }
                }
            ]
        },
        schedule: {
            status: 200,
            data: [
                {
                    id: "sched-1",
                    title: "Latihan Rutin Basket",
                    scheduleDate: new Date().toISOString(),
                    location: "Lapangan Basket",
                    extracurricular: {
                        name: "Basket",
                        imageUrl: bannerBasket
                    }
                },
                {
                    id: "sched-2",
                    title: "Rapat Mingguan Pramuka",
                    scheduleDate: new Date(Date.now() + 86400000).toISOString(),
                    location: "Aula Sekolah",
                    extracurricular: {
                        name: "Pramuka",
                        imageUrl: bannerPramuka
                    }
                }
            ]
        },
        certificates: {
            status: 200,
            data: [
                {
                    id: "cert-1",
                    certificateName: "Juara 1 Lomba Basket Internal",
                    certificateUrl: certAndiansyah,
                    issuedAt: "2024-05-20T00:00:00Z",
                    member: { name: "Andiansyah", profileUrl: profile4 }
                },
                {
                    id: "cert-2",
                    certificateName: "Penghargaan Siswa Teladan Pramuka",
                    certificateUrl: certJokowi,
                    issuedAt: "2024-06-15T00:00:00Z",
                    member: { name: "Jokowi", profileUrl: profile5 }
                }
            ]
        }
    },
    students: {
        "member-1": {
            status: 200,
            data: {
                id: "member-1",
                name: "Andiansyah",
                email: "andi@student.demo",
                profileUrl: profile4,
                role: "siswa",
                createdAt: "2024-01-15T00:00:00Z",
                activityStats: {
                    joinedExtracurriculars: 1,
                    totalPoints: 150,
                    totalAttendances: 10,
                    totalReports: 2
                },
                extracurriculars: [
                    {
                        id: "ekskul-1",
                        name: "Basket",
                        description: "Ekstrakurikuler olahraga bola basket.",
                        imageUrl: bannerBasket,
                        totalPoints: 150,
                        status: "active",
                        joinDate: "2024-01-15T00:00:00Z",
                        pembina: { name: "Budi Santoso" }
                    }
                ],
                certificates: [
                    {
                        id: "cert-1",
                        certificateName: "Juara 1 Lomba Basket Internal",
                        certificateUrl: certAndiansyah,
                        issuedAt: "2024-05-20T00:00:00Z",
                        extracurricular: { name: "Basket" }
                    }
                ]
            }
        },
        "member-2": {
            status: 200,
            data: {
                id: "member-2",
                name: "Jokowi",
                email: "jokowi@student.demo",
                profileUrl: profile5,
                role: "siswa",
                createdAt: "2024-02-01T00:00:00Z",
                activityStats: {
                    joinedExtracurriculars: 1,
                    totalPoints: 120,
                    totalAttendances: 8,
                    totalReports: 1
                },
                extracurriculars: [
                    {
                        id: "ekskul-2",
                        name: "Pramuka",
                        description: "Gerakan kepanduan.",
                        imageUrl: bannerPramuka,
                        totalPoints: 120,
                        status: "active",
                        joinDate: "2024-02-01T00:00:00Z",
                        pembina: { name: "Budi Santoso" }
                    }
                ],
                certificates: [
                    {
                        id: "cert-2",
                        certificateName: "Penghargaan Siswa Teladan Pramuka",
                        certificateUrl: certJokowi,
                        issuedAt: "2024-06-15T00:00:00Z",
                        extracurricular: { name: "Pramuka" }
                    }
                ]
            }
        }
    },
    extracurriculars: {
        all: {
            status: 200,
            data: [
                {
                    id: "ekskul-1",
                    name: "Basket",
                    description: "Ekstrakurikuler olahraga bola basket untuk mengembangkan bakat dan kerjasama tim.",
                    imageUrl: bannerBasket,
                    pembina: { name: "Budi Santoso", profile: profile1 }
                },
                {
                    id: "ekskul-2",
                    name: "Pramuka",
                    description: "Gerakan kepanduan untuk membentuk karakter mandiri, disiplin, dan cinta alam.",
                    imageUrl: bannerPramuka,
                    pembina: { name: "Budi Santoso", profile: profile1 }
                }
            ]
        },
        "ekskul-1": {
            status: 200,
            data: {
                id: "ekskul-1",
                name: "Basket",
                description: "Ekstrakurikuler olahraga bola basket untuk mengembangkan bakat dan kerjasama tim.",
                imageUrl: bannerBasket,
                pembina: { id: "pembina-1", name: "Budi Santoso", profile: profile1 },
                members: [
                    { id: "member-1", name: "Andiansyah", profile: profile4, totalPoints: 150, joinDate: "2024-01-15T00:00:00Z" },
                    { id: "member-3", name: "Siti Aminah", profile: profile12, totalPoints: 95, joinDate: "2024-03-10T00:00:00Z" }
                ]
            }
        },
        "ekskul-2": {
            status: 200,
            data: {
                id: "ekskul-2",
                name: "Pramuka",
                description: "Gerakan kepanduan untuk membentuk karakter mandiri, disiplin, dan cinta alam.",
                imageUrl: bannerPramuka,
                pembina: { id: "pembina-1", name: "Budi Santoso", profile: profile1 },
                members: [
                    { id: "member-2", name: "Jokowi", profile: profile5, totalPoints: 120, joinDate: "2024-02-01T00:00:00Z" }
                ]
            }
        }
    },
    scheduleDetails: {
        "sched-1": {
            status: 200,
            data: {
                schedule: {
                    id: "sched-1",
                    title: "Latihan Rutin Basket",
                    description: "Latihan rutin untuk mempersiapkan turnamen antar sekolah.",
                    scheduleDate: new Date().toISOString(),
                    location: "Lapangan Basket",
                    extracurricular: { name: "Basket", imageUrl: bannerBasket }
                },
                attendanceData: [
                    { memberId: "member-1", name: "Andiansyah", profileUrl: profile4, isPresent: true, status: "Hadir", attendanceTime: new Date().toISOString() },
                    { memberId: "member-3", name: "Siti Aminah", profileUrl: profile12, isPresent: false, status: "Alpha" }
                ],
                attendanceSummary: { present: 1, sick: 0, alpha: 1 },
                documentatioData: [
                    { id: "doc-1", documentationTitle: "Pemanasan", fileUrl: basket1, submittedAt: new Date().toISOString() }
                ]
            }
        },
        "sched-2": {
            status: 200,
            data: {
                schedule: {
                    id: "sched-2",
                    title: "Rapat Mingguan Pramuka",
                    description: "Membahas program kerja bulanan.",
                    scheduleDate: new Date(Date.now() + 86400000).toISOString(),
                    location: "Aula Sekolah",
                    extracurricular: { name: "Pramuka", imageUrl: bannerPramuka }
                },
                attendanceData: [
                    { memberId: "member-2", name: "Jokowi", profileUrl: profile5, isPresent: false, status: "Alpha" }
                ],
                attendanceSummary: { present: 0, sick: 0, alpha: 1 },
                documentatioData: [
                    { id: "doc-2", documentationTitle: "Persiapan", fileUrl: pramuka1, submittedAt: new Date().toISOString() }
                ]
            }
        }
    }
};

export default mockData;
