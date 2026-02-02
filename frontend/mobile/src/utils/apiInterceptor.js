import mockData from './mockData';
import config from '../config/config';

const originalFetch = window.fetch;

window.fetch = async (resource, options) => {
    const url = typeof resource === 'string' ? resource : resource.url;

    // Check if demo mode is enabled
    const isDemoMode = sessionStorage.getItem('isDemoMode') === 'true';

    // Check if the URL is for our API
    if (isDemoMode && url.startsWith(config.API_URL)) {
        const path = url.replace(config.API_URL, '').split('?')[0];
        console.log(`[Demo Interceptor] Intercepting: ${url}, Path: ${path}`);

        // Small delay to simulate network
        await new Promise(resolve => setTimeout(resolve, 500));

        let responseData = { data: null };
        let status = 200;

        // Routing
        if (path === '/auth/login/siswa' || path === '/auth/register/siswa') {
            responseData = {
                data: {
                    token: "dummy-demo-token",
                    expiredAt: new Date(Date.now() + 86400000).toISOString()
                },
                message: "Login Berhasil (Demo)"
            };
        } else if (path === '/profile') {
            if (options?.method === 'PUT') {
                // Mock update profile
                const body = JSON.parse(options.body);
                mockData.profile.name = body.name || mockData.profile.name;
                mockData.profile.email = body.email || mockData.profile.email;
                responseData = { data: mockData.profile };
            } else {
                responseData = { data: mockData.profile };
            }
        } else if (path === '/profile/photo') {
            responseData = { data: mockData.profile, message: "Foto berhasil diubah" };
        } else if (path === '/extracurricular') {
            const search = new URL(url).searchParams.get('search');
            let filtered = mockData.extracurriculars;
            if (search) {
                filtered = filtered.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
            }
            responseData = { data: filtered };
        } else if (path.startsWith('/extracurricular/')) {
            const parts = path.split('/');
            const id = parseInt(parts[2]);
            if (parts[3] === 'join') {
                const ekskul = mockData.extracurriculars.find(e => e.id === id);
                if (ekskul) ekskul.isMember = true;
                responseData = { message: "Berhasil bergabung ke ekskul" };
            } else {
                const ekskul = mockData.extracurriculars.find(e => e.id === id);
                responseData = { data: ekskul };
            }
        } else if (path === '/schedule') {
            responseData = { data: mockData.schedules };
        } else if (path.startsWith('/schedule/')) {
            const parts = path.split('/');
            if (parts[2] === 'attendance') {
                const body = JSON.parse(options.body);
                const schedule = mockData.schedules.find(s => s.id === body.scheduleId);
                if (schedule) {
                    schedule.isAbsent = true;
                    schedule.absent = body.status;
                }
                responseData = { message: "Absen berhasil dicatat" };
            } else if (parts[2] === 'report') {
                const body = JSON.parse(options.body);
                const schedule = mockData.schedules.find(s => s.id === body.scheduleId);
                if (schedule) {
                    schedule.isReported = true;
                }
                responseData = { message: "Laporan berhasil dikirim" };
            } else {
                const id = parseInt(parts[2]);
                const schedule = mockData.schedules.find(s => s.id === id);
                responseData = { data: schedule };
            }
        } else if (path === '/certificate') {
            responseData = { data: mockData.certificates };
        } else if (path.startsWith('/certificate/download/')) {
            // For demo, just return a fake blob
            responseData = new Blob(["demo-file-content"], { type: "image/png" });
            return new Response(responseData, {
                status: 200,
                headers: { 'Content-Type': 'image/png' }
            });
        }

        // Fix image URLs to be absolute if they are relative asset paths
        const fixUrls = (obj) => {
            if (!obj || typeof obj !== 'object') return obj;
            for (let key in obj) {
                if (typeof obj[key] === 'string' && (obj[key].startsWith('/src/') || obj[key].startsWith('/@fs/') || obj[key].startsWith('data:'))) {
                    // don't mess with these
                } else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('image') || key.toLowerCase().includes('profile')) {
                    if (typeof obj[key] === 'string' && !obj[key].startsWith('http') && !obj[key].startsWith('data:')) {
                        // If it's a relative path from our mockData (which are imported assets),
                        // we make it absolute so the frontend doesn't prepend config.BASE_URL
                        if (obj[key].startsWith('/')) {
                            obj[key] = window.location.origin + obj[key];
                        }
                    }
                } else if (typeof obj[key] === 'object') {
                    fixUrls(obj[key]);
                }
            }
        };

        fixUrls(responseData);

        return new Response(JSON.stringify(responseData), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return originalFetch(resource, options);
};
