import { ArrowLeft, Calendar, Clock, MapPin, Users, Info } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import dummyData from '../data/dummy.json';

export default function ScheduleDetailPage({ scheduleId, onNavigate }) {
  const schedule = dummyData.schedules.find(s => s.id === scheduleId);
  const ekskul = schedule ? dummyData.ekstrakurikuler.find(e => e.id === schedule.ekskulId) : null;

  if (!schedule) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">Jadwal tidak ditemukan</p>
            <Button onClick={() => onNavigate('schedule')} className="mt-4">
              Kembali
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'regular':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400';
      case 'workshop':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400';
      case 'event':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'regular':
        return 'Latihan Rutin';
      case 'workshop':
        return 'Workshop';
      case 'event':
        return 'Event Khusus';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('schedule')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getTypeColor(schedule.type)}`}>
                    {getTypeLabel(schedule.type)}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {schedule.title}
                  </h1>
                  <button
                    onClick={() => onNavigate('ekskul-detail', schedule.ekskulId)}
                    className="text-sky-600 dark:text-sky-400 font-medium hover:underline"
                  >
                    {schedule.ekskulName}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5 mr-3 text-sky-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Tanggal</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(schedule.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="h-5 w-5 mr-3 text-sky-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Waktu</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {schedule.startTime} - {schedule.endTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 mr-3 text-sky-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Lokasi</p>
                    <p className="font-medium text-gray-900 dark:text-white">{schedule.location}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Info className="h-5 w-5 mr-3 text-sky-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Hari</p>
                    <p className="font-medium text-gray-900 dark:text-white">{schedule.day}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Deskripsi Kegiatan
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {schedule.description}
                </p>
              </div>

              {ekskul && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Tentang Ekstrakurikuler
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {ekskul.description}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('ekskul-detail', ekskul.id)}
                  >
                    Lihat Detail Ekskul
                  </Button>
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {ekskul && (
                <Card className="overflow-hidden">
                  <img
                    src={ekskul.image}
                    alt={ekskul.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {ekskul.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{ekskul.pembina}</span>
                    </div>
                  </div>
                </Card>
              )}

              <Card className="p-4 bg-sky-50 dark:bg-sky-900/20 border-2 border-sky-200 dark:border-sky-800">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Catatan Penting
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Harap datang 10 menit lebih awal</li>
                      <li>• Bawa perlengkapan yang diperlukan</li>
                      <li>• Hubungi pembina jika berhalangan</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
