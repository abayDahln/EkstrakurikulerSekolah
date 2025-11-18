import { User, Mail, Phone, GraduationCap, Users, Calendar } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import dummyData from '../data/dummy.json';

export default function ProfilePage({ onNavigate }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">Silakan login terlebih dahulu</p>
          </Card>
        </div>
      </div>
    );
  }

  const myEkskul = dummyData.ekstrakurikuler.filter(e =>
    user.joinedEkskul.includes(e.id)
  );

  const mySchedules = dummyData.schedules.filter(s =>
    user.joinedEkskul.includes(s.ekskulId)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Profil Saya
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola informasi dan aktivitas ekstrakurikuler kamu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-6 text-center">
              <div className="mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-sky-100 dark:border-sky-900"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {user.name}
              </h2>
              <p className="text-sky-600 dark:text-sky-400 font-medium mb-4">
                {user.class}
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-3 text-sky-500" />
                  <span className="break-all">{user.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-3 text-sky-500" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <GraduationCap className="h-4 w-4 mr-3 text-sky-500" />
                  <span>Siswa Aktif</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Statistik
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-sky-500 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Ekskul Diikuti
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {myEkskul.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-sky-500 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Jadwal
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {mySchedules.length}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Ekstrakurikuler yang Diikuti
                </h3>
                <Button size="sm" variant="outline" onClick={() => onNavigate('ekskul')}>
                  Tambah
                </Button>
              </div>

              {myEkskul.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Belum bergabung dengan ekstrakurikuler
                  </p>
                  <Button onClick={() => onNavigate('ekskul')}>
                    Jelajahi Ekstrakurikuler
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myEkskul.map(ekskul => (
                    <div
                      key={ekskul.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => onNavigate('ekskul-detail', ekskul.id)}
                    >
                      <img
                        src={ekskul.image}
                        alt={ekskul.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {ekskul.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {ekskul.category}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{ekskul.jadwal}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Jadwal Mendatang
                </h3>
                <Button size="sm" variant="outline" onClick={() => onNavigate('schedule')}>
                  Lihat Semua
                </Button>
              </div>

              {mySchedules.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Tidak ada jadwal
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mySchedules.slice(0, 3).map(schedule => (
                    <div
                      key={schedule.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => onNavigate('schedule-detail', schedule.id)}
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {schedule.title}
                      </h4>
                      <p className="text-sm text-sky-600 dark:text-sky-400 mb-2">
                        {schedule.ekskulName}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {schedule.day}, {schedule.date}
                        </span>
                        <span>•</span>
                        <span>{schedule.startTime} - {schedule.endTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
