import profile1 from '../assets/static_files/profile/profile_1.jpg';
import profile12 from '../assets/static_files/profile/profile_12.jpg';
import profile4 from '../assets/static_files/profile/profile_4.jpg';
import profile5 from '../assets/static_files/profile/profile_5.jpg';

import certAndi from '../assets/static_files/certificate/Andiansyah_f89b46168abd4f09bd641b0e11a59141.png';
import certJokowi from '../assets/static_files/certificate/Jokowi_4022eaa24efb42f79b1237f8bdb239e9.png';

import docBasket from '../assets/static_files/documentations/basket1.jpg';
import docPramuka from '../assets/static_files/documentations/pramuka1.jpg';

import bannerBasket from '../assets/static_files/banner/extracurricular_basket.jpg';
import bannerPramuka from '../assets/static_files/banner/extracurricular_pramuka.jpg';

const mockData = {
    profile: {
        id: 1,
        name: "Andiansyah",
        email: "andi@demo.com",
        profileUrl: profile1,
        activityStats: {
            totalPoints: 1250,
            totalAttendances: 24,
            joinedExtracurriculars: 2,
            totalReports: 12
        },
        extracurriculars: [
            { id: 1, name: "Basket", totalPoints: 750, status: "Aktif", imageUrl: bannerBasket },
            { id: 2, name: "Pramuka", totalPoints: 500, status: "Aktif", imageUrl: bannerPramuka }
        ],
        pointDetails: [
            { id: 1, title: "Hadir pada kegiatan ekskul", points: 50, createdAt: new Date().toISOString(), extracurricular: { name: "Basket" } },
            { id: 2, title: "Mengupload dokumentasi kegiatan", points: 100, createdAt: new Date(Date.now() - 86400000).toISOString(), extracurricular: { name: "Basket" } }
        ]
    },
    extracurriculars: [
        {
            id: 1,
            name: "Basket",
            description: "Ekskul basket melatih ketangkasan, kerjasama tim, dan sportifitas dalam permainan bola basket.",
            imageUrl: bannerBasket,
            isMember: true,
            pembina: { name: "Bpk. Bambang Sutrisno", profile: profile12 },
            members: [
                { id: 1, name: "Andiansyah", profile: profile1, totalPoints: 750 },
                { id: 4, name: "Budi", profile: profile4, totalPoints: 450 }
            ]
        },
        {
            id: 2,
            name: "Pramuka",
            description: "Gerakan Pramuka Indonesia melatih kedisiplinan, kemandirian, dan cinta alam.",
            imageUrl: bannerPramuka,
            isMember: true,
            pembina: { name: "Ibu Siti Fatimah", profile: profile5 },
            members: [
                { id: 1, name: "Andiansyah", profile: profile1, totalPoints: 500 },
                { id: 5, name: "Caca", profile: profile5, totalPoints: 300 }
            ]
        },
        {
            id: 3,
            name: "Futsal",
            description: "Permainan bola sepak di dalam ruangan yang melatih kecepatan dan kerjasama.",
            imageUrl: bannerBasket, // Reusing basket for demo
            isMember: false,
            pembina: { name: "Bpk. Ahmad", profile: profile12 },
            members: []
        }
    ],
    schedules: [
        {
            id: 1,
            title: "Latihan Rutin Basket",
            scheduleDate: new Date().toISOString(), // Today
            location: "Lapangan Basket Sekolah",
            description: "Latihan teknik dasar shooting dan lay-up.",
            extracurricular: {
                id: 1,
                name: "Basket",
                imageUrl: bannerBasket,
                pembina: { name: "Bpk. Bambang Sutrisno", profileUrl: profile12 }
            },
            isAbsent: false,
            isReported: false,
            reports: [],
            documentations: [
                { id: 1, documentationTitle: "Latihan Layup", fileUrl: docBasket, uploadedBy: { name: "Andiansyah", profile: profile1 } }
            ]
        },
        {
            id: 2,
            title: "Pertemuan Mingguan Pramuka",
            scheduleDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            location: "Aula Sekolah",
            description: "Pembahasan materi sandi dan tali temali.",
            extracurricular: {
                id: 2,
                name: "Pramuka",
                imageUrl: bannerPramuka,
                pembina: { name: "Ibu Siti Fatimah", profileUrl: profile5 }
            },
            isAbsent: false,
            isReported: false,
            reports: [],
            documentations: [
                { id: 2, documentationTitle: "Belajar Sandi Morse", fileUrl: docPramuka, uploadedBy: { name: "Admin", profile: profile5 } }
            ]
        }
    ],
    certificates: [
        {
            id: 1,
            certificateName: "Sertifikat Partisipasi Basket",
            certificateUrl: certAndi,
            extracurricularName: "Basket",
            issuedAt: new Date(Date.now() - 604800000).toISOString(),
            userName: "Andiansyah"
        },
        {
            id: 2,
            certificateName: "Sertifikat Anggota Terbaik",
            certificateUrl: certJokowi,
            extracurricularName: "Pramuka",
            issuedAt: new Date(Date.now() - 1209600000).toISOString(),
            userName: "Andiansyah"
        }
    ]
};

export default mockData;
